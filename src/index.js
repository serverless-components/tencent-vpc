const { Component } = require('@serverless/core')
const { Capi } = require('@tencent-sdk/capi')
const tencentAuth = require('serverless-tencent-auth-tool')
const utils = require('./utils')

const defaults = {
  region: 'ap-guangzhou',
  zone: 'ap-guangzhou-2',
  cidrBlock: '10.0.0.0/16'
}

class TencentDB extends Component {
  async initCredential(inputs, action) {
    // login
    const auth = new tencentAuth()
    this.context.credentials.tencent = await auth.doAuth(this.context.credentials.tencent, {
      client: 'tencent-vpc',
      remark: inputs.fromClientRemark,
      project: this.context.instance ? this.context.instance.id : undefined,
      action: action
    })
    if (this.context.credentials.tencent && this.context.credentials.tencent.token) {
      this.context.credentials.tencent.Token = this.context.credentials.tencent.token
    }
  }

  async default(inputs = {}) {
    const { context } = this
    await this.initCredential(inputs, 'default')
    context.status('Deploying')

    const {
      region,
      zone,
      vpcName,
      subnetName,
      cidrBlock = defaults.cidrBlock,
      enableMulticast,
      dnsServers,
      domainName,
      tags,
      subnetTags,
      enableSubnetBroadcast
    } = {
      ...defaults,
      ...inputs
    }

    const capi = new Capi({
      Region: region,
      AppId: context.credentials.tencent.AppId,
      SecretId: context.credentials.tencent.SecretId,
      SecretKey: context.credentials.tencent.SecretKey
    })

    const oldState = this.state

    const state = {
      region: region,
      zone: zone,
      vpcName: vpcName,
      subnetName: subnetName
    }

    let { vpcId, subnetId } = oldState

    const handleVpc = async () => {
      let existVpc = false
      if (vpcId) {
        const detail = await utils.getVpcDetail(context, capi, vpcId)
        if (detail) {
          existVpc = true
        }
      }
      const params = {
        VpcName: vpcName
      }
      if (enableMulticast) {
        params.EnableMulticast = enableMulticast
      }
      if (dnsServers) {
        params.DnsServers = dnsServers
      }
      if (domainName) {
        params.DomainName = domainName
      }
      if (existVpc) {
        this.context.debug(`Updating vpc ${vpcId}...`)
        params.VpcId = vpcId
        await utils.modifyVpc(context, capi, params)
        this.context.debug(`Update vpc ${vpcId} success`)
      } else {
        params.CidrBlock = cidrBlock
        if (tags) {
          params.Tags = tags
        }
        this.context.debug(`Creating vpc ${vpcName}...`)
        const res = await utils.createVpc(context, capi, params)
        this.context.debug(`Create vpc ${vpcName} success.`)
        vpcId = res.VpcId
      }
    }

    // check vpcId
    const handleSubnet = async () => {
      let existSubnet = false
      if (subnetId) {
        const detail = await utils.getSubnetDetail(context, capi, subnetId)
        if (detail) {
          existSubnet = true
        }
      }
      const params = {
        SubnetName: subnetName
      }
      if (existSubnet) {
        this.context.debug(`Updating subnet ${subnetId}...`)
        params.SubnetId = subnetId

        if (enableSubnetBroadcast !== undefined) {
          params.EnableBroadcast = enableSubnetBroadcast
        }
        await utils.modifySubnet(context, capi, params)
        this.context.debug(`Update subnet ${subnetId} success.`)
      } else {
        if (vpcId) {
          this.context.debug(`Creating subnet ${subnetName}...`)
          params.Zone = zone
          params.VpcId = vpcId
          params.CidrBlock = cidrBlock
          if (subnetTags) {
            params.Tags = subnetTags
          }

          const res = await utils.createSubnet(context, capi, params)
          subnetId = res.SubnetId

          if (enableSubnetBroadcast === true) {
            await utils.modifySubnet(context, capi, {
              SubnetId: subnetId,
              EnableBroadcast: enableSubnetBroadcast
            })
          }
          this.context.debug(`Create subnet ${subnetName} success.`)
        }
      }
      state.subnetId = subnetId
    }

    if (vpcName) {
      await handleVpc()
    }
    if (subnetName) {
      await handleSubnet()
    }

    state.vpcId = vpcId
    state.subnetId = subnetId
    this.state = state
    await this.save()

    const outputs = state

    return outputs
  }

  async remove(inputs = {}) {
    const { context } = this
    await this.initCredential(inputs, 'remove')

    const { state } = this
    const { region, vpcId, subnetId } = state
    context.status('Removing')

    const capi = new Capi({
      Region: region,
      AppId: context.credentials.tencent.AppId,
      SecretId: context.credentials.tencent.SecretId,
      SecretKey: context.credentials.tencent.SecretKey
    })

    if (subnetId) {
      this.context.debug(`Start removing subnet ${subnetId}`)
      await utils.deleteSubnet(this.context, capi, subnetId)
      this.context.debug(`Removed subnet ${subnetId}`)
    }
    if (vpcId) {
      this.context.debug(`Start removing vpc ${vpcId}`)
      await utils.deleteVpc(this.context, capi, vpcId)
      this.context.debug(`Removed vpc ${vpcId}`)
    }

    this.state = {}
    await this.save()
    return {}
  }
}

module.exports = TencentDB
