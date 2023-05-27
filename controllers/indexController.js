"use strict";

const controller = {};

controller.showHomepage = (req, res) => {
  res.render("index");
};

controller.showPage = (req, res) => {
  res.render(req.params.page, { layout: "layout_sample.hbs" });
};

module.exports = controller;
