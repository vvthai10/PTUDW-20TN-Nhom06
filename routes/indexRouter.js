"use strict";
const express = require("express");
const router = express.Router();

const controller = require("../controllers/indexController");

// TODO create table data
// router.get("/createTables", (req, res) => {
//   let models = require("../models");
//   models.sequelize.sync().then(() => {
//     res.send("Table created!");
//   });
// });

// Get Category
router.use(controller.getCategories);

// routes
router.get("/", controller.showHomepage);

router.get("/:page", controller.showPage);

module.exports = router;
