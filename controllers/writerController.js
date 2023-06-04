"use strict";

const controller = {};


controller.showHomepage = (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";
  res.render("writer", { layout: "layout_simple.hbs" });
};

controller.showEditPage = (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";
  res.render("writer_edit", { layout: "layout_simple.hbs" });
};

controller.showComposePage = (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";
  res.render("writer_compose", { layout: "layout_simple.hbs" });
};

module.exports = controller;
