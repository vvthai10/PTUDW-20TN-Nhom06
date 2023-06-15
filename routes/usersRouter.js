"use strict";

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.use(authController.isLoggedIn);

router.get("/account", (req, res) => {
  let view = req.query.view;
  console.log(res.locals.userInfo);
  if (view == "info") {
    res.locals.info = 1;
    res.render("account-info");
  } else if (view == "password") {
    res.locals.password = 1;
    res.render("account-password");
  } else if (view == "activities") {
    res.locals.activities = 1;
    res.render("account-activities");
  } else if (view == "payment") {
    res.locals.payment = 1;
    res.render("account-payment");
  }
});

module.exports = router;
