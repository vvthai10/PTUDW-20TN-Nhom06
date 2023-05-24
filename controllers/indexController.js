"use strict";

const controller = {};

controller.showHomepage = (req, res) => {
  res.render("index");
};

controller.showPage = (req, res) => {
  res.render(req.params.page);
};

module.exports = controller;
