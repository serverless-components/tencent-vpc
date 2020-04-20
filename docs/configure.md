# Configure document

## Complete configuration

```yml
# serverless.yml

org: orgDemo # (optional) serverless dashboard org. default is the first org you created during signup.
app: appDemo # (optional) serverless dashboard app. default is the same as the name property.
stage: dev # (optional) serverless dashboard stage. default is dev.

component: vpc # (required) name of the component. In that case, it's vpc.
name: vpcDemo # (required) name of your vpc component instance.

inputs:
  region: ap-guangzhou
  zone: ap-guangzhou-2
  vpcName: serverless
  subnetName: serverless
  cidrBlock: 10.0.0.0/16
  enableMulticast: 'FALSE'
  enableSubnetBroadcast: 'FALSE'
  dnsServers:
    - 127.0.0.1
  domainName: demo
  tags:
    - Key: City
      Value: guangzhou
  subnetTags:
    - Key: City
      Value: guangzhou
```

## Configuration description

Main param description

| Param                 | Required/Optional | Type   | Default       | Description                                                                     |
| --------------------- | ----------------- | ------ | ------------- | ------------------------------------------------------------------------------- |
| region                | Required          | String |               | Vpc Region                                                                      |
| zone                  | Required          | String |               | Vpc Zone of Region                                                              |
| vpcName               | Required          | String |               | Vpc name                                                                        |
| subnetName            | Required          | String |               | Subnet name                                                                     |
| cidrBlock             | Optional          | String | `10.0.0.0/16` | Vpc and subnet cidr, Support value: 10.0.0.0/16，172.16.0.0/16，192.168.0.0/16. |
| enableMulticast       | Optional          | String | `FALSE`       | Whether enable vpc multi broadcast                                              |
| dnsServers            | Optional          | Array  |               | Vpc DNS address, max number is 4, the first is master                           |
| domainName            | Optional          | String |               | Vpc domain name for relative cvm domain suffix                                  |
| tags                  | Optional          | Array  |               | Bind tags for vpc, eg: [{"Key": "city", "Value": "shanghai"}]                   |
| subnetTags            | Optional          | Array  |               | Bind tags for subnet, eg: [{"Key": "city", "Value": "shanghai"}]                |
| enableSubnetBroadcast | Optional          | String | `FALSE`       | Wether enable subnet broadcast                                                  |
