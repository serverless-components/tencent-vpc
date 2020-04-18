# Configure document

## Complete configuration

```yml
# serverless.yml

MyVpc:
  component: '@serverless/tencent-vpc'
  inputs:
    region: ap-guangzhou
    zone: ap-guangzhou-2
    vpcName: serverless
    subnetName: serverless
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
