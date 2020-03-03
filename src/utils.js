const {
  DescribeVpcs,
  DescribeSubnets,
  CreateVpc,
  DeleteVpc,
  CreateSubnet,
  DeleteSubnet,
  ModifyVpcAttribute,
  ModifySubnetAttribute
} = require('./apis')

const utils = {
  /**
   *
   * @param {object} context serverless context
   * @param {object} capi capi instance
   * @param {string} vpcId
   */
  async getVpcDetail(context, capi, vpcId) {
    // get instance detail
    try {
      const res = await DescribeVpcs(capi, {
        VpcIds: [vpcId]
      })
      if (res.VpcSet) {
        const {
          VpcSet: [detail]
        } = res
        return detail
      }
      return null
    } catch (e) {
      context.debug(e)
      return null
    }
  },

  /**
   *
   * @param {object} context serverless context
   * @param {object} capi capi instance
   * @param {string} vpcId
   */
  async getSubnetDetail(context, capi, subnetId) {
    try {
      const res = await DescribeSubnets(capi, {
        SubnetIds: [subnetId]
      })
      if (res.SubnetSet) {
        const {
          SubnetSet: [detail]
        } = res
        return detail
      }
      return null
    } catch (e) {
      context.debug(e)
      return null
    }
  },

  async createVpc(context, capi, inputs) {
    const res = await CreateVpc(capi, inputs)
    if (res.Vpc && res.Vpc.VpcId) {
      const { Vpc } = res
      return Vpc
    }
  },

  async modifyVpc(context, capi, inputs) {
    await ModifyVpcAttribute(capi, inputs)
  },

  async deleteVpc(context, capi, vpcId) {
    await DeleteVpc(capi, {
      VpcId: vpcId
    })
  },

  async createSubnet(context, capi, inputs) {
    const res = await CreateSubnet(capi, inputs)
    if (res.Subnet && res.Subnet.SubnetId) {
      const { Subnet } = res
      return Subnet
    }
  },

  async modifySubnet(context, capi, inputs) {
    await ModifySubnetAttribute(capi, inputs)
  },

  async deleteSubnet(context, capi, subnetId) {
    await DeleteSubnet(capi, {
      SubnetId: subnetId
    })
  }
}

module.exports = utils
