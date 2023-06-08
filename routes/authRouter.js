"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { body, getErrorMessage } = require("../controllers/validator");

router.get("/login", controller.showLogin);
router.post(
  "/login",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email address!"),
  body("password").trim().notEmpty().withMessage("Password is required!"),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render("login", { loginMessage: message });
    }
    next();
  },
  controller.login
);

router.get("/register", controller.showRegister);
router.post(
  "/register",
  body("name").trim().notEmpty().withMessage("Name is required!"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address"),
  body("password").trim().notEmpty().withMessage("Password is required!"),
  body("password")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    ),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword != req.body.password) {
      throw new Error("Password not match!");
    }
    return true;
  }),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render("register", { registerMessage: message });
    }
    next();
  },
  controller.register
);

router.get("/logout", controller.logout);

// TODO: Quên mật khẩu
router.get("/forgot", controller.showForgotPassword);
router.post(
  "/forgot",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address"),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render("forgot-password", { message });
    }
    next();
  },
  controller.forgotPassword
);

router.get("/reset", controller.showResetPassword);
router.post(
  "/reset",
  body("password").trim().notEmpty().withMessage("Password is required!"),
  body("password")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    ),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword != req.body.password) {
      throw new Error("Password not match!");
    }
    return true;
  }),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render("forgot-password", { message });
    }
    next();
  },
  controller.resetPassword
);

module.exports = router;
