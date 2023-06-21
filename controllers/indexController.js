"use strict";
const models = require("../models");
const slugify = require("slugify");
const controller = {};
const sequelize = require('sequelize');
const tagarticle = require("../models/tagarticle");
const Op = sequelize.Op;

controller.getCategories = async (req, res, next) => {
  const categories = await models.Category.findAll({
    include: models.SubCategory,
  });
  // slugify(item.name, { lower: true, strict: true });
  res.locals.categories = categories.map((category) => category.toJSON());

  next();
};

controller.showHomepage = async (req, res) => {
  let tags = await models.Tag.findAll();
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
  console.log(req.params.page);
  res.render(req.params.page), { loginMessage: req.flash("loginMessage") };
};

controller.showCategory = async (req, res) => {
  let categoryId = req.query.categoryId || 0;

  // get the subCategoryId of categoryId
  let subCategoryIds = await models.SubCategory.findAll({
    include: [{
      model: models.Category,
      where: {
        id: categoryId
      }
    }]
  });
  subCategoryIds = subCategoryIds.map(item => item.id);

  // get the ArticleId of categoryId
  let categoryArticleIds = await models.Article.findAll({
    attributes: ['id'],
    include: [
      {
        model: models.SubCategory,
        where: {
          id: {
            [Op.or]: subCategoryIds
          }
        }
      }
    ]
  });

  categoryArticleIds = categoryArticleIds.map(item => item.id);
  
  // get the list of article with tag
  let categoryArticles = await models.Article.findAll({
    where: {
      id: {
        [Op.or]: categoryArticleIds
      }
    },
    include: [
      {
        model: models.Tag,
        attributes: ['name']
      }
    ]
  });

  res.locals.categoryArticles = categoryArticles;

  // get the hot news
  let hotArticles = await models.Article.findAll({
    where: {
      id: {
        [Op.or]: categoryArticleIds
      }
    },
    include: [
      {
        model: models.Tag,
        attributes: ['name']
      }
    ],
    order: [
      ['nView', 'DESC']
    ],
    limit: 3
  });
  for (let index = 0; index < hotArticles.length; index++) {
    const element = hotArticles[index];
    console.log(element.nView);
  }
  res.locals.hotArticles = hotArticles;

  // get the name of category
  let category = await models.Category.findByPk(categoryId);
  res.locals.categoryName = category.name;

  // get the name of subCategory
  let subCategory = await models.SubCategory.findAll({
    include: [
      {
        model: models.Category,
        where: {
          id: categoryId
        }
      }
    ]
  });
  subCategory = subCategory.map(item => item.name);
  res.locals.subCategory = subCategory;

  res.render('readCategory');
}

controller.showArticle = async (req, res) => {
  let articleId = parseInt(req.query.articleId);
  console.log('hello world');
  console.log(articleId);
  res.render('readnews');
}

controller.showTag = async (req, res) => {
  let tagId = req.query.tagId || 0;
  let tagArticleIds = await models.TagArticle.findAll({
    attributes: ['articleId'],
    where: {tagId: tagId}
  });

  tagArticleIds = tagArticleIds.map(item => item.articleId);
  // let tagArticles = await models.Article.findAll({
  //   where: {
  //     id : {
  //       [Op.or]: tagArticleIds
  //     }
  //   }
  // });
  // let tagId = 1;
  let tagArticles = await models.TagArticle.findAll({
    attributes: ['tagId'],
    where: {articleId: tagArticleIds},
    include: [
      {
        model: models.Article,
        include: [
          {
            model: models.Tag,
            attributes: ['name']
          }
        ]
      }
    ]
  });

  // console.log(tagArticles[0].Article.Tags[0].name);

  
  res.locals.tagArticles = tagArticles;
  // console.log(tagArticles);
  let tagName = await models.Tag.findOne({
    attributes: ['name'],
    where: {id: tagId}
  })
  res.locals.tagName = tagName.name;
  res.render('tag');
}

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
