"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/writerController");

// routes
// nháp router writer
router.get("/", controller.showHomepage);
router.get("/compose", controller.showComposePage);
router.get("/edit", controller.showEditPage);

module.exports = router;
