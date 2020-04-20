const ensureString = require('type/string/ensure')
const ensureArray = require('type/array/ensure')
const CONFIGS = require('./config')

const prepareInputs = (instance, inputs) => {
  inputs.vpcId = instance.state.vpcId
  inputs.subnetId = instance.state.subnetId
  inputs.region = ensureString(inputs.region, { default: CONFIGS.region })
  inputs.zone = ensureString(inputs.zone, { default: CONFIGS.zone })
  inputs.vpcName = ensureString(inputs.vpcName, {
    isOptional: false,
    errorMessage: 'vpcName is required'
  })
  inputs.subnetName = ensureString(inputs.subnetName, {
    isOptional: false,
    errorMessage: 'subnetName is required'
  })
  inputs.cidrBlock = ensureString(inputs.cidrBlock, { default: CONFIGS.cidrBlock })
  if (inputs.domainName) {
    inputs.domainName = ensureString(inputs.domainName, { default: CONFIGS.cidrBlock })
  }
  if (inputs.dnsServers) {
    inputs.dnsServers = ensureArray(inputs.dnsServers, { default: [] })
  }
  if (inputs.tags) {
    inputs.tags = ensureArray(inputs.tags, { default: [] })
  }
  if (inputs.subnetTags) {
    inputs.subnetTags = ensureArray(inputs.subnetTags, { default: [] })
  }
  inputs.enableMulticast = inputs.enableMulticast === true ? 'TRUE' : CONFIGS.enableMulticast
  inputs.enableSubnetBroadcast =
    inputs.enableSubnetBroadcast === true ? 'TRUE' : CONFIGS.enableSubnetBroadcast

  return inputs
}

module.exports = {
  prepareInputs
}
