"use strict";
const models = require("../models");
const slugify = require("slugify");
const controller = {};

controller.getCategories = async (req, res, next) => {
  const categories = await models.Category.findAll({
    include: models.SubCategory,
  });
  // slugify(item.name, { lower: true, strict: true });
  res.locals.categories = categories.map((category) => category.toJSON());

  next();
};

controller.showHomepage = (req, res) => {
  res.render("index");
};

controller.showPage = (req, res) => {
  // res.render(req.params.page, { layout: "layout_sample.hbs" });
  res.render(req.params.page), { loginMessage: req.flash("loginMessage") };
};

module.exports = controller;
