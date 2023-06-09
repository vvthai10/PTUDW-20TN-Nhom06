"use strict";

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.use(authController.isLoggedIn);

router.get("/account", (req, res) => {
  res.render("account", { layout: "layout_simple.hbs" });
});

module.exports = router;
