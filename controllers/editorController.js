"use strict";

const controller = {};


controller.showHomepage = (req, res) => {
  res.locals.header_title = "Editor";
  res.locals.header_note = "EDITOR";
  res.render("editor", { layout: "layout_simple.hbs" });
};

controller.showCensorPage = (req, res) => {
  res.locals.header_title = "Editor";
  res.locals.header_note = "EDITOR";
  res.render("editor_censor", { layout: "layout_simple.hbs" });
};

module.exports = controller;
