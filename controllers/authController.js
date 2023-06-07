"use strict";

const passport = require("./passport");
const controller = {};

controller.show = (req, res) => {
  res.render("login", { loginMessage: req.flash("loginMessage") });
};

controller.login = (req, res, next) => {
  let keepSignedIn = req.body.keepSignedIn;
  passport.authenticate("local-login", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect("/users/login");
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      // Nếu không có lỗi thì xem thử nó thuộc role nào rổi trả về
      req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
      return res.redirect("/");
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

module.exports = controller;
