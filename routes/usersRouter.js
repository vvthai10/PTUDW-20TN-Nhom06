"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const models = require("../models");

router.use(authController.isLoggedIn);

router.get("/account", async (req, res) => {
  let view = req.query.view;
  if (view == "info") {
    res.locals.info = 1;
    console.log("TT USER");
    console.log(res.locals.userInfo);
    res.render("account-info");
  } else if (view == "password") {
    // Kiểm tra tài khoản người dùng có mật khẩu hay chưa khi họ đăng kí bằng Gmail
    if (res.locals.userInfo.googleId != null) {
      // Khi người dùng đăng nhập bằng gmail thì sẽ có trường ggid
      // Tiến hành lấy password của người dùng
      let user = await models.User.findOne({
        where: { id: res.locals.userInfo.id },
      });
      if (user.password == null) {
        // Tạo lệnh nhắc nhở đề người dùng tạo mật khẩu
        res.locals.noteCreatePassword = true;
      }
    }

    res.locals.password = 1;
    res.render("account-password");
  } else if (view == "activities") {
    res.locals.activities = 1;
    res.render("account-activities");
  } else if (view == "payment") {
    let expremiumData = await models.Payment.findAll({
      attributes: ["id", "type", "createdAt", "expiredAt"],
      where: {
        userId: res.locals.userInfo.id,
      },
      order: [["createdAt", "ASC"]],
    });
    let expremiums = expremiumData.map((category) => category.toJSON());
    expremiums.forEach((item) => {
      // item.createdAt = item.createdAt.toISOString();
      const dateObj = new Date(item.createdAt);

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // Vì phương thức getMonth() trả về giá trị từ 0 đến 11
      const day = dateObj.getDate();
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();

      const dateString = `${day}/${month}/${year}`;
      const timeString = `${hours}:${minutes}`;

      item.createdAt = `${timeString}, ${dateString}`;
    });

    res.locals.expremiums = expremiums;
    res.locals.payment = 1;
    res.render("account-payment");
  }
});

router.post("/account/update", async (req, res, next) => {
  let view = req.query.view;
  if (view == "info") {
    // Kiểm tra có thông tin nào bị thay đổi thì sẽ cập nhật
    let user = res.locals.userInfo;
    let dataUpdate = {};
    if (user.name != req.body.name) {
      dataUpdate.name = req.body.name;
    }
    // TODO Chưa có thông tin phone ở trong db
    // if (user.phone != req.body.phone) {
    //   dataUpdate.phone = req.body.phone;
    // }
    if (user.birth != req.body.birth) {
      dataUpdate.birth = req.body.birth;
    }
    if (user.sex != req.body.sex) {
      dataUpdate.sex = req.body.sex;
    }
    user = await models.User.update(dataUpdate, { where: { id: user.id } });
    req.user.dataValues = { ...req.user.dataValues, ...dataUpdate };
    res.locals.userInfo = req.user.dataValues;

    let infoShow = {
      hasAlert: 1,
      typeAlert: "success",
      messageAlert: "Cập nhật thông tin thành công",
    };

    res.locals.info = 1;
    res.render("account-info", infoShow);
  } else if (view == "password") {
    let infoShow;
    if (req.body.check == 1) {
      let newPassword = bcrypt.hashSync(
        req.body.newPassword,
        bcrypt.genSaltSync(8)
      );
      await models.User.update(
        { password: newPassword },
        { where: { id: res.locals.userInfo.id } }
      ); // $2b$08$ukGBPsgEFHOZquEHu9rFk.PwQ41.ACLu2pcOJoAWmQlqQbzwKrgpe

      infoShow = {
        hasAlert: 1,
        typeAlert: "success",
        messageAlert: "Cập nhật mật khẩu thành công",
      };
    } else {
      // Kiểm tra mật khẩu có trùng với mật khẩu không
      let password = req.body.curPassword;
      let user = await models.User.findOne({
        where: { id: res.locals.userInfo.id },
      });

      if (!bcrypt.compareSync(password, user.password)) {
        infoShow = {
          hasAlert: 1,
          typeAlert: "error",
          messageAlert: "Mật khẩu hiện tại không đúng",
        };
      } else {
        // Nếu mật khẩu hiện tại đã đúng, cập nhật mật khẩu mới
        let newPassword = bcrypt.hashSync(
          req.body.newPassword,
          bcrypt.genSaltSync(8)
        );
        await models.User.update(
          { password: newPassword },
          { where: { id: user.id } }
        ); // $2b$08$ukGBPsgEFHOZquEHu9rFk.PwQ41.ACLu2pcOJoAWmQlqQbzwKrgpe

        infoShow = {
          hasAlert: 1,
          typeAlert: "success",
          messageAlert: "Cập nhật mật khẩu thành công",
        };
      }
    }

    res.locals.password = 1;
    res.render("account-password", infoShow);
  }
});

module.exports = router;
