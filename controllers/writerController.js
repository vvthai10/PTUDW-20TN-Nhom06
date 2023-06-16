"use strict";

const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
const slugify = require("slugify");
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

controller.showComposePage = async (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";
  let cat1 = await models.Category.findAll({
    attributes: ['id', 'name'],
    raw: true,
    nest: true,
  });
  res.locals.cat1 = cat1;
  let cat2 = await models.SubCategory.findAll({
    attributes: ['id', 'name', 'categoryId'],
    raw: true,
    nest: true,
  });
  res.locals.cat2 = cat2;
  let tags = await models.Tag.findAll({
    attributes: ['id', 'name'],
    raw: true,
    nest: true,
  });
  res.locals.tags = tags;
  console.log(cat1);
  console.log(cat2);
  console.log(tags);
  res.render("writer_compose", { layout: "layout_simple.hbs" });
};

controller.newArticle = async (req, res, next) => {
  let userId = (!req.user) ? null : req.user.id;
  try {
    let article = await models.Article.create({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true, strict: true }),
      status: req.body.status,
      imgCover: req.body.imgCover,
      description: req.body.description,
      content: req.body.content,
      authorId: userId,
      nLike: 0, nComment: 0, nView: 0, nViewWeek: 0, nViewMonth: 0,
    });

    let subcat = await models.SubCategory.findOne({ where: {id: parseInt(req.body.subcategory)}});
    if (subcat) {
      try {await article.addSubCategory(subcat);} 
      catch(e) {console.log(e);}
    }
    let tags = await models.Tag.findAll({ where: {name: { [Op.in]: req.body.tags.split(", ") } }});
    if (tags) {
      try {await article.addTags(tags);} 
      catch(e) {console.log(e);}
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/writer");
  // Chưa có message
}

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
