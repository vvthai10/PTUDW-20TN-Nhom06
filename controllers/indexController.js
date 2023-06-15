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

controller.showHomepage = async (req, res) => {
  let tags = await models.Tag.findAll({
    attributes: ['name']
  });
  // let articles = await models.Article.findAll();
  // let popularArticles = [];
  // for (let index = 0; index < articles.length / 3; index++) {
  //   popularArticles.push([articles[index]['dataValues'], articles[index + 1]['dataValues'], articles[index + 2]['dataValues']]);
  // }
  // console.log(popularArticles);
  // console.log(articles[0]['dataValues'])
  let articles = await models.Article.findAll();
  let popularArticles = articles;
  let rightArticles = [];
  let temp = [];
  for (let index = 0; index < articles.length / 3; index++) {
    if (index == 0) {
      rightArticles.push({_main_item: [{_item: [articles[index * 3], articles[index * 3 + 1], articles[index * 3 + 2]]}]});
      // rightArticles.push({_item: []})
    }
    else {
      temp.push({_item: [articles[index * 3], articles[index * 3 + 1], articles[index * 3 + 2]]});
      // rightArticles[2].push([articles[index * 3], articles[index * 3 + 1], articles[index * 3 + 2]]);
    }
  }
  rightArticles.push({_items: temp});
  // console.log(rightArticles[1]._items)
  // console.log(rightArticles[0]._item.length)
  res.locals.latestArticles = rightArticles;
  res.locals.rightArticles = rightArticles;
  res.locals.popularArticles = popularArticles;
  res.locals.tags = tags;
  res.render("index");
};

controller.showPage = (req, res) => {
  // res.render(req.params.page, { layout: "layout_sample.hbs" });
  let tag = req.params.page;
  res.render(req.params.page), { loginMessage: req.flash("loginMessage") };
};

controller.search = async (req, res) => {
  let text_search = req.query.keyword || '';
  const si = require('search-index');
  const articles = await models.Article.findAll();
  // const ids = articles.map(item => item['id']);
  // const slugs = articles.map(item => item['slug']);
  // const array = [];
  // for (let index = 0; index < ids.length; index++) {
  //   array.push({_id: ids[index], _slug: slugs[index]});
  // }
  // console.log(array);
  const db = await si({ name: 'SEARCH' });
  await db.PUT(articles);

  let result = await db.QUERY({AND: [text_search]})
  console.log(result)
}

module.exports = controller;
