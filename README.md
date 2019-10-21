## JSCONF-SCF-DEMO

结合腾讯云 SCF 和 AI 实现
根据上传的人脸图片，自动为人脸戴上圣诞帽

## How to run

1、将你的云 api 秘钥，填充至 server/wearChristmasHat/config.js 中

2、进到wearChristmasHat的文件夹，npm run deploy:install 安装依赖

3、使用vscode插件，或者scf cli，或者通过腾讯云scf控制台，部署 wearChristmasHat 到 scf，同时去该函数的网关触发器的控制台开启 cors 的开关

4、修改 web/index.js 的请求 url 为你的 api 网关触发器的访问路径

5、web 部分的静态资源，根据你的爱好，可以部署到 cos，或者本地打开也可。
