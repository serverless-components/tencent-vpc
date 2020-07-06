# 配置文档

## 完整配置

```yml
# serverless.yml

component: vpc # (必填) 组件名称，此处为 vpc
name: vpcDemo # (必填) 实例名称
org: orgDemo # (可选) 用于记录组织信息，默认值为您的腾讯云账户 appid
app: appDemo # (可选) 该应用名称
stage: dev # (可选) 用于区分环境信息，默认值为 dev

inputs:
  region: ap-guangzhou # 可选 ap-guangzhou, ap-shanghai, ap-beijing
  zone: ap-guangzhou-2 # 可选 ap-guangzhou-2, ap-shanghai-2, ap-beijing-3
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

## 配置说明

主要参数说明

| 参数                  | 必填/可选 | 类型   | 默认值        | 描述                                                                          |
| --------------------- | --------- | ------ | ------------- | ----------------------------------------------------------------------------- |
| region                | 必填      | String |               | VPC 的所属地区                                                                |
| zone                  | 必填      | String |               | VPC 所在地区的区域                                                            |
| vpcName               | 必填      | String |               | VPC 的名称                                                                    |
| subnetName            | 必填      | String |               | Subnet 的名称                                                                 |
| cidrBlock             | 可选      | String | `10.0.0.0/16` | VPC 和 Subnet 的 IPv4 CIDR，例如: 10.0.0.0/16，172.16.0.0/16，192.168.0.0/16. |
| enableMulticast       | 可选      | String | `FALSE`       | 是否启用 VPC 组播                                                             |
| dnsServers            | 可选      | Array  |               | VPC DNS 地址，最大数量为 4，第一个为 master                                   |
| domainName            | 可选      | String |               | VPC 域名相应的 cvm 域名后缀                                                   |
| tags                  | 可选      | Array  |               | VPC 绑定的标签键值对，例如: [{"Key": "city", "Value": "shanghai"}]            |
| subnetTags            | 可选      | Array  |               | Subnet 绑定的标签键值对，例如: [{"Key": "city", "Value": "shanghai"}]         |
| enableSubnetBroadcast | 可选      | String | `FALSE`       | 是否启用子网广播                                                              |
