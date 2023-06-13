"use strict";

const passport = require("./passport");
const models = require("../models");
const controller = {};

controller.showLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("login", {
    loginMessage: req.flash("loginMessage"),
    reqUrl: req.query.reqUrl,
  });
};

controller.login = (req, res, next) => {
  let keepSignedIn = req.body.keepSignedIn;
  let reqUrl = req.body.reqUrl ? req.body.reqUrl : "/";
  passport.authenticate("local-login", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect(`/users/login?reqUrl=${reqUrl}`);
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      // Nếu không có lỗi thì xem thử nó thuộc role nào rổi trả về
      req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
      return res.redirect(reqUrl);
    });
  })(req, res, next);
};

controller.logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
};

controller.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/users/login?reqUrl=${req.originalUrl}`);
};

controller.showRegister = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("register", {
    registerMessage: req.flash("registerMessage"),
    reqUrl: req.query.reqUrl,
  });
};

controller.register = (req, res, next) => {
  let reqUrl = req.body.reqUrl ? req.body.reqUrl : "/";
  passport.authenticate("local-register", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect(`/users/register?reqUrl=${reqUrl}`);
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      // Đăng kí thành công
      res.redirect(reqUrl);
    });
  })(req, res, next);
};

// TODO: Chức năng quên mật khẩu
controller.showForgotPassword = (req, res) => {
  res.render("forgot-password");
};

controller.forgotPassword = async (req, res) => {
  let email = req.body.email;

  let user = await models.User.findOne({ where: { email } });
  if (user) {
    // Tạo link -> Gửi email -> Thông báo thành công
    const { sign } = require("./jwt");
    const host = req.header("host");
    const resetLink = `${req.protocol}://${host}/users/reset?token=${sign(
      email
    )}&email=${email}`;
    console.log(resetLink);
    const { sendForgotPasswordMail } = require("./mail");
    sendForgotPasswordMail(user, host, resetLink)
      .then((result) => {
        return res.render("forgot-password", { done: true });
      })
      .catch((error) => {
        // console.log(error.statusCode);
        return res.render("forgot-password", {
          message:
            "An error has occured when sending to your email. Please check your email address!",
        });
      });
    // return res.render("forgot-password", { done: true });
  } else {
    return res.render("forgot-password", { message: "Email does not exist!" });
  }
};

controller.showResetPassword = (req, res) => {
  let email = req.query.email;
  let token = req.query.token;
  let { verify } = require("./jwt");
  if (!token || !verify(token)) {
    return res.render("reset-password", { expired: true });
  } else {
    return res.render("reset-password", { email, token });
  }
};
controller.resetPassword = async (req, res) => {
  let email = req.body.email;
  let token = req.body.token;
  let bcrypt = require("bcrypt");
  let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

  await models.User.update({ password }, { where: { email } });
  res.render("reset-password", { done: true });
};

controller.loginByGoogle = async (req, res, next) => {
  passport.authenticate("google");
};

module.exports = controller;
