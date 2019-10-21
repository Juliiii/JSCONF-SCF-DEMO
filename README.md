## JSCONF-SCF-DEMO

结合腾讯云 SCF 和 AI 实现
根据上传的人脸图片，自动为人脸戴上圣诞帽

## How to run

1、将你的云 api 秘钥，填充至 server/wearChristmasHat/config.js 中

2、进到wearChristmasHat这个文件夹，npm run deploy:install 安装依赖

3、使用vscode插件，或者scf cli，部署 wearChristmasHat 到 scf，同时去腾讯云apigw控制台开启该函数的api网关触发器的 支持cors 的开关<br/>



scf cli使用文档：[https://cloud.tencent.com/document/product/583/33445](https://cloud.tencent.com/document/product/583/33445)<br/>

vscode插件使用文档：[https://cloud.tencent.com/document/product/583/38106](https://cloud.tencent.com/document/product/583/38106)


4、修改 web/index.js 的ajax请求的url 为你的 api 网关触发器的访问路径

5、web 部分的静态资源，html,css和js等，可以根据你的喜好，可以部署到 cos，或者本地打开也可。

6、访问html页面后，就可以选择一张人像图片，点击Generating a Christmas hat的按钮，戴上圣诞帽了。

