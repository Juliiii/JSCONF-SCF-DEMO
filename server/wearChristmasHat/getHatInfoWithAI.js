const Capi = require("qcloudapi-sdk");
const config = require("./config");
const sharp = require("sharp");
const util = require("util");
const fs = require("fs");
const path = require("path");

module.exports = async function(image) {
  // new a Capi client
  const capi = new Capi({
    SecretId: config.secretId,
    SecretKey: config.secretKey,
    serviceType: "iai",
    baseHost: "tencentcloudapi.com",
    path: "/",
    signatureMethod: "sha256"
  });

  // promiseify capi.request, in order to use async await
  const capiRequestAsync = util.promisify(capi.request.bind(capi));

  // call DetectFace Tencentcloud Api, to get the face info of the image
  const faceInfo = await capiRequestAsync({
    Region: "ap-guangzhou",
    Action: "DetectFace",
    Version: "2018-03-01",
    Image: image,
    SignatureMethod: "TC2-HmacSHA256"
  });

  // if error, throw it
  if (faceInfo.Response.Error) throw faceInfo.Response.Error;

  // pick the first face info of the result
  const { X, Y, Width } = faceInfo.Response.FaceInfos[0];

  // according to the info of face, calculate the width, height of hat
  const hatImage = await sharp(
    fs.readFileSync(path.resolve(__dirname, "cat.png"))
  );
  const hatImageMetadata = await hatImage.metadata();
  const scale = (Width / hatImageMetadata.width) * 1.4;
  let resetHatImageHeight = Math.floor(hatImageMetadata.height * scale);
  let resetHatImageWidth = Math.floor(hatImageMetadata.width * scale);

  // if hatHeight is higher the Y of the face, zoom the hat
  if (resetHatImageHeight > Y) {
    resetHatImageWidth = Math.floor(
      resetHatImageWidth * (Y / resetHatImageHeight)
    );
    resetHatImageHeight = Y;
  }

  // return the width, height, top、 left position of hat
  return {
    hatWdith: resetHatImageWidth,
    hatHeight: resetHatImageHeight,
    left: Math.max(X - Math.floor((resetHatImageWidth - Width) / 2), 0),
    top: Math.max(Y - resetHatImageHeight, 0)
  };
};
