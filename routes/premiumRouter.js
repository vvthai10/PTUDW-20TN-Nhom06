"use strict";

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
const models = require("../models");
const { type } = require("os");

router.get("/", (req, res) => {
  res.render("premium");
});

router.use(authController.isLoggedIn);
router.get("/register", (req, res) => {
  // TODO: Lấy thông tin gói + thông tin user đăng kí
  let type = parseInt(req.query.type);
  let orderInfo, amount;
  // Gói trải nghiệm
  if (type == 1) {
    orderInfo = "Đăng kí premium: Gói trải nghiệm";
    amount = "30000";
  }
  // Gói cơ bản
  else if (type == 2) {
    orderInfo = "Đăng kí premium: Gói cơ bản";
    amount = "100000";
  }
  // Gói cao cấp
  else if (type == 3) {
    orderInfo = "Đăng kí premium: Gói cao cấp";
    amount = "200000";
  }

  amount = "1000";

  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = `${protocol}://${host}`;

  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var redirectUrl = `${baseUrl}/premium/thanks`;
  var ipnUrl = `${baseUrl}/premium/thanks`;
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";

  var requestType = "captureWallet";

  // TODO: Cần thêm thông tin user để có thể trả về khi thanh toán xong thì xét đk cho user
  var user = req.user.dataValues;
  console.log(user);
  var jsonData = {
    id: user.id,
    name: user.name,
    type: type,
    date: new Date().getTime(),
  };
  var encode = Buffer.from(JSON.stringify(jsonData)).toString("base64");
  var extraData = encode; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
    userInfo: {
      name: "Nguyen Van A",
      phoneNumber: "0999888999",
      email: "email_add@domain.com",
    },
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const request = https.request(options, (respone) => {
    console.log(`Status: ${respone.statusCode}`);
    console.log(`Headers: ${JSON.stringify(respone.headers)}`);
    respone.setEncoding("utf8");
    respone.on("data", (body) => {
      console.log("Body: ");
      console.log(body);
      console.log("payUrl: ");
      console.log(JSON.parse(body).payUrl);
      res.redirect(JSON.parse(body).payUrl);
    });
    respone.on("end", () => {
      console.log("No more data in response.");
    });
  });

  request.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  request.write(requestBody);
  request.end();
});

router.get("/thanks", async (req, res) => {
  if (req.query.message == "Successful.") {
    let data = JSON.parse(
      Buffer.from(req.query.extraData, "base64").toString()
    );
    console.log(data);
    let date = new Date(data.date);

    let premium = await models.Payment.create({
      amount: req.query.amount,
      userId: parseInt(data.id),
      // type: parseInt(type),
      // registerDate: `${date}`,
    });

    console.log(premium);

    res.render("thanks");
  }
});

router.post("/thanks", async (req, res) => {
  if (req.query.message == "Successful.") {
    const ipnData = req.body;
    alert(ipnData);
    console.log(ipnData);
    res.set("Content-Type", "application/json");
    res.sendStatus(204);
  }
});

module.exports = router;