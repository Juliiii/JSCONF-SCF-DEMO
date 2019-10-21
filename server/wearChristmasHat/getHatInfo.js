const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

module.exports = async function(image) {
  const persionImage = await sharp(Buffer.from(image, "base64"));
  const hatImage = await sharp(
    fs.readFileSync(path.resolve(__dirname, "cat.png"))
  );

  const persionImageMetadata = await persionImage.metadata();
  const hatImageMetadata = await hatImage.metadata();

  const hatWdith = Math.floor(persionImageMetadata.width / 4);

  const hatHeight = Math.floor(
    (hatImageMetadata.height / hatImageMetadata.width) * hatWdith
  );

  const left = persionImageMetadata.width - hatWdith;

  const top = persionImageMetadata.height - hatHeight;

  return {
    hatWdith,
    hatHeight,
    left,
    top
  };
};
