"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/adminController");

// routes
router.get("/", controller.showHomepage);


module.exports = router;
