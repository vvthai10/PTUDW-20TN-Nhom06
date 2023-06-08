"use strict";

const controller = {};


controller.showHomepage = (req, res) => {
  res.locals.header_title = "Admin";
  res.locals.header_note = "ADMINISTRATOR";
  res.render("admin", { layout: "layout_simple.hbs" });
};


module.exports = controller;
