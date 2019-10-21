"use strict";
const serverless = require("serverless-http");
const Koa = require("koa");
const sharp = require("sharp");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const getHatInfoWithAI = require("./getHatInfoWithAI");
const getHatInfo = require("./getHatInfo");
const fs = require("fs");
const path = require("path");
const app = new Koa();

app.use(cors());
app.use(bodyParser({ formLimit: "20mb" }));

app.use(async ctx => {
  const { image } = ctx.request.body;

  if (!image) throw "No Image";

  const persionImage = await sharp(Buffer.from(image, "base64"));
  const hatImage = await sharp(
    fs.readFileSync(path.resolve(__dirname, "cat.png"))
  );
  // use ai
  const { hatHeight, hatWdith, left, top } = await getHatInfoWithAI(image);

  // not use ai
  // const { hatHeight, hatWdith, left, top } = await getHatInfo(image);

  // use the height, width, top, left of the hat, to draw it
  const persionImageWithHat = await persionImage
    .composite([
      {
        input: await hatImage.resize(hatWdith, hatHeight).toBuffer(),
        top,
        left
      }
    ])
    .toBuffer();

  ctx.body = { code: 0, image: persionImageWithHat.toString("base64") };
});

exports.main_handler = serverless(app);
