"use strict";

const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;


controller.showHomepage = async (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";

  let user = (!req.user) ? -1 : req.user.id;
  let status = ['posted', 'approved', 'pending', 'rejected', 'draft'].includes(req.query.status) ? req.query.status : null;
  let subcategory = req.query.subcategory;
  let keyword = req.query.keyword || '';
  let options = {
    attributes: ['id', 'name', 'updatedAt', 'status', 'editorId', 'reviewComment'],
    where: { authorId: user},
    include: [{
      model: models.User,
      as: 'editor',
      attributes: ['name']
    }]
  };
  if (status) {
    options.where.status = status;
  }
  if (subcategory) {
    options.include.push({
      model: models.SubCategory,
      where: {id: subcategory}
    })
  }
  if (keyword.trim() != '') {
    options.where.name = {
      [Op.iLike]: `%${keyword}%`
    }
  }

  let articles = await models.Article.findAll(options);
  res.locals.articles = articles;

  res.locals.status = status;
  res.locals.keyword = keyword;
  res.locals.originalUrl = removeParam('subcategory', req.originalUrl);
  if (Object.keys(req.query).length == 0) {
    res.locals.originalUrl =  res.locals.originalUrl + '?';
  }

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

function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
      param,
      params_arr = [],
      queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
          param = params_arr[i].split("=")[0];
          if (param === key) {
              params_arr.splice(i, 1);
          }
      }
      if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}

module.exports = controller;
