"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/writerController");

// routes
router.get("/", controller.showHomepage);
router.get("/compose", controller.showComposePage);
router.get("/edit", controller.showEditPage);

router.post("/compose", controller.newArticle);

module.exports = router;
