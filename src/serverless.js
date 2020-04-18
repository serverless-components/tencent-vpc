const { Component } = require('@serverless/core')
const { Vpc } = require('tencent-component-toolkit')
const { prepareInputs } = require('./utils')

class ServerlessComponent extends Component {
  getCredentials() {
    const { tmpSecrets } = this.credentials.tencent

    if (!tmpSecrets || !tmpSecrets.TmpSecretId) {
      throw new Error(
        'Cannot get secretId/Key, your account could be sub-account or does not have access, please check if SLS_QcsRole role exists in your account, and visit https://console.cloud.tencent.com/cam to bind this role to your account.'
      )
    }

    return {
      SecretId: tmpSecrets.TmpSecretId,
      SecretKey: tmpSecrets.TmpSecretKey,
      Token: tmpSecrets.Token
    }
  }

  async deploy(inputs) {
    console.log(`Deploying Vpc...`)

    const credentials = this.getCredentials()

    // 对Inputs内容进行标准化
    const vpcInputs = await prepareInputs(inputs)
    const baas = new Vpc(credentials, vpcInputs.region)
    // 部署函数 + API网关
    const outputs = await baas.deploy(vpcInputs)

    // optimize outputs for one region
    this.state.region = vpcInputs.region
    this.state.zone = vpcInputs.zone
    this.state.vpcId = outputs.vpcId
    this.state.subnetId = outputs.subnetId

    return outputs
  }

  async remove() {
    console.log(`Removing Vpc...`)

    const { state } = this

    const credentials = this.getCredentials()

    const baas = new Vpc(credentials, state.region)

    await baas.remove({
      vpcId: state.vpcId,
      subnetId: state.subnetId
    })

    this.state = {}
  }
}

module.exports = ServerlessComponent