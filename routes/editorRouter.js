"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/editorController");

// routes
router.get("/", controller.showHomepage);
router.get("/censor", controller.showCensorPage);

router.post("/censor", controller.censorArticle);


module.exports = router;
