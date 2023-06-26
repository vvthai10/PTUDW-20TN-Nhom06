"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/adminController");

// routes
router.get("/", controller.showHomepage);

router.post("/add", controller.add);
router.post("/delete", controller.delete);
router.post("/modify", controller.modify);

module.exports = router;
