## JSCONF-SCF-DEMO

结合腾讯云 SCF 和 AI 实现的一个 h5 应用
根据上传的人脸图片，自动为人脸戴上圣诞帽

## 环境

nodejs 10.6.3

## Live Demo

[demo](https://jsconfdemo-1253970226.cos.ap-guangzhou.myqcloud.com/index.html)

手机打开使用效果更佳

## How to run

#### 1、下载项目

```
git clone git@github.com:Juliiii/JSCONF-SCF-DEMO.git
```

#### 2、将云 api 秘钥填写进课程代码的配置文件

将申请好的云 api 秘钥，填写进课程的项目中的`/server/wearChristmasHat/config.js`

```js
module.exports = {
  secretId: "your secret id",
  secretKey: "your secret key"
};
```

#### 3、使用 serverless framwork 一键部署项目

进入`/server/wearChristmasHat`，然后执行`npm run deploy:install`

进入到根目录，新建`serverless.yml`

填入下面的配置：

```
name: wearChristmasHat

web:
  component: "@serverless/tencent-website"
  inputs:
    code:
      src: ./web
      index: index.html
      error: index.html
      envPath: ./web
    env:
      apiUrl: ${func.APIGateway}

func:
  component: "@serverless/tencent-scf"
  inputs:
    name: wearChristmasHat
    codeUri: ./server/wearChristmasHat
    handler: index.main_handler
    runtime: Nodejs8.9
    timeout: 30
    events:
      - apigw:
          name: apiUrl
          parameters:
            environment: release
            endpoints:
              - path: /
                method: POST
                enableCORS: TRUE
                function:
                  isIntegratedResponse: TRUE
                  functionQualifier: $LATEST

```

然后在命令行键入：`sls --debug`，扫码一键登录，稍等下即可一句命令部署整个项目的前后端

![image](https://user-images.githubusercontent.com/23744602/76506951-f2324f00-6486-11ea-8cf5-a43551bebf64.png)

访问图中的 web 端地址即可查看项目的使用效果。

#### 4、修改 serverless.yml 文件，避免重复创建 api 网关的服务资源。

在`serverless.yml`的这处配置新增一行`serviceId: service-xxxx`，指定部署到某一 serviceId

![image](https://user-images.githubusercontent.com/23744602/76505842-1725c280-6485-11ea-82a2-27d851c0d27c.png)

值为上次部署成功的 apigw 的请求地址中的 service-xxx 的字符串，如下图红框处所示

![image](https://user-images.githubusercontent.com/23744602/76507094-260d7480-6487-11ea-85ae-42f22a1a9e6c.png)

再次`sls --debug`即可不重复创建网关的服务资源，创建在同一个网关下的服务下，避免多次部署，超出网关的可创建服务的限制。
