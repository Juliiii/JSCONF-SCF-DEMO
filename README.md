## JSCONF-SCF-DEMO

结合腾讯云 SCF 和 AI 实现
根据上传的人脸图片，自动为人脸戴上圣诞帽

## How to run

1、将你的云 api 秘钥，填充至 server/wearChristmasHat/config.js 中

2、部署 wearChristmasHat 到 scf，同时去该函数的网关触发器的控制台开启 cors 的开关

3、修改 web/index.js 的请求 url 为你的 api 网关触发器的访问路径

4、web 部分的静态资源，根据你的爱好部署到 cos，或者本地打开也可。
