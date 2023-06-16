"use strict";

const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;


controller.showHomepage = async (req, res) => {
  res.locals.header_title = "Admin";
  res.locals.header_note = "ADMINISTRATOR";

  let queryKeys = Object.keys(req.query);
  let keyword = req.query.keyword || '';
  let type = ['category-manage-1', 'category-manage-2', 'tag-manage', 'article-manage', 'user-manage-1', 'user-manage-2', 'user-manage-3'].includes(req.query.type) ? req.query.type : 'category-manage-1';
  res.locals.originalUrl = req.originalUrl;

  if (type  == 'category-manage-1') 
  {
    let options = {
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('SubCategories.id'))), 'subcategoryCount']],
      where: {},
      include: [{
        model: models.SubCategory,
        attributes: [[sequelize.fn('COUNT', sequelize.col('SubCategories->Articles.id')), 'articleCountBySubCat'], [sequelize.fn('SUM', sequelize.col('SubCategories->Articles.nComment')), 'nCommentCountBySubCat'], [sequelize.fn('SUM', sequelize.col('SubCategories->Articles.nView')), 'nViewCountBySubCat']],
        include: [{
          model: models.Article,
          attributes: [],
          through: { attributes: [] },
        }],
        group: ['SubCategory.id'],
      }],
      raw: true,
      nest: true,
      group: ['Category.id', 'Category.name'],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let categories = await models.Category.findAll(options);
    res.locals.categories = categories;
  }
  else if (type == 'category-manage-2') 
  {
    let options = {
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Articles.id')), 'nArticle'], [sequelize.fn('SUM', sequelize.col('Articles.nComment')), 'nCommentTotal'], [sequelize.fn('SUM', sequelize.col('Articles.nView')), 'nViewTotal']],
      where: {},
      include: [{
        model: models.Article,
        attributes: [],
        through: { attributes: [] },
      }, {
        model: models.Category,
        attributes: ['name'],
      }],
      raw: true,
      nest: true,
      group: ['SubCategory.id', "Category.name"],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let subcategories = await models.SubCategory.findAll(options);
    res.locals.subcategories = subcategories;
  } 
  else if (type == 'tag-manage') 
  {
    let options = {
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Articles.id')), 'nArticle'], [sequelize.fn('SUM', sequelize.col('Articles.nComment')), 'nCommentTotal'], [sequelize.fn('SUM', sequelize.col('Articles.nView')), 'nViewTotal']],
      where: {},
      include: [{
        model: models.Article,
        attributes: [],
        through: { attributes: [] },
      }],
      raw: true,
      nest: true,
      group: ['Tag.id', "Tag.name"],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let tags = await models.Tag.findAll(options);
    res.locals.tags = tags;
  } 
  else if (type == 'article-manage') 
  {
    //let status = ['posted', 'approved'].includes(req.query.status) ? req.query.status : null;
    let subcategory = req.query.subcategory;
    let keyword = req.query.keyword || '';
    let options = {
      attributes: ['id', 'name', 'updatedAt', 'status', 'editorId', 'reviewComment'],
      where: { status: { [Op.in]: ['posted', 'approved'] } },
      include: [{
        model: models.User,
        as: 'editor',
        attributes: ['name']
      }],
      order: ['status'],
    };
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
    res.locals.keyword = keyword;
    res.locals.originalUrl = removeParam('subcategory', req.originalUrl);
    if (Object.keys(req.query).length == 0) {
      res.locals.originalUrl =  res.locals.originalUrl + '?';
    }
  } 
  else if (type == 'user-manage-1') 
  {
    let options = {
      attributes: ['id', 'name', 'email'],
      where: { role: 'writer'},
      include: [{
        model: models.SubCategory,
        attributes: ['name'],
        through: { attributes: [] },
      }],
      raw: true,
      nest: true,
      group: ['User.id', "User.name", 'SubCategories.name', ],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let writers = await models.User.findAll(options);
    res.locals.writers = writers;
    console.log(writers);
  } 
  else if (type == 'user-manage-2') 
  {
    let options = {
      attributes: ['id', 'name', 'email'],
      where: { role: 'editor'},
      include: [{
        model: models.SubCategory,
        attributes: ['name'],
        through: { attributes: [] },
      }],
      raw: true,
      nest: true,
      group: ['User.id', "User.name", 'SubCategories.name', ],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let editors = await models.User.findAll(options);
    res.locals.editors = editors;
    console.log(editors);
  } 
  
  else if (type == 'user-manage-3') 
  {
    let options = {
      attributes: ['id', 'name', 'email'],
      //, [sequelize.fn('COUNT', sequelize.col('Articles.Comment.articleId')), 'commentCount'], [sequelize.fn('COUNT', sequelize.col('Articles.Reaction.userId')), 'likeCount']
      where: { role: { [Op.in]: ['default', 'premium'] }},
      include: [{
        model: models.Article,
        attributes: [],
        through: { attributes: [] },
      }, ],
      raw: true,
      nest: true,
      group: ['User.id', "User.name",  ],
      order: ['id'],
    };
    if (keyword.trim() != '') {
      options.where.name = { [Op.iLike]: `%${keyword}%` }
    }
    let readers = await models.User.findAll(options);
    res.locals.readers = readers;
    console.log(readers);
  }
  res.locals.type = type;
  res.locals.keyword = keyword;
  // res.locals.originalUrl = req.originalUrl;
  res.render("admin", { layout: "layout_simple.hbs" });
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
