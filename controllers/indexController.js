"use strict";
const models = require("../models");
const slugify = require("slugify");
const controller = {};
const sequelize = require("sequelize");
const tagarticle = require("../models/tagarticle");
const Op = sequelize.Op;
const db = require("../models/index");

controller.getCategories = async (req, res, next) => {
  const categories = await models.Category.findAll({
    include: models.SubCategory,
  });
  // slugify(item.name, { lower: true, strict: true });
  res.locals.categories = categories.map((category) => category.toJSON());
  res.locals.categories.forEach((category) => {
    category.icon = category.icon.includes("imgur")
      ? category.icon
      : `/assets/images/icons/${category.icon}`;
  });
  console.log(res.locals.categories);
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
      rightArticles.push({
        _main_item: [
          {
            _item: [
              articles[index * 3],
              articles[index * 3 + 1],
              articles[index * 3 + 2],
            ],
          },
        ],
      });
      // rightArticles.push({_item: []})
    } else {
      temp.push({
        _item: [
          articles[index * 3],
          articles[index * 3 + 1],
          articles[index * 3 + 2],
        ],
      });
      // rightArticles[2].push([articles[index * 3], articles[index * 3 + 1], articles[index * 3 + 2]]);
    }
  }
  rightArticles.push({ _items: temp });
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
  // console.log(req.params.page);
  res.render(req.params.page), { loginMessage: req.flash("loginMessage") };
};

controller.showCategory = async (req, res) => {
  let categoryId = req.query.categoryId || 0;

  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

  // get the subCategoryId of categoryId
  let subCategoryIds = await models.SubCategory.findAll({
    include: [
      {
        model: models.Category,
        where: {
          id: categoryId,
        },
      },
    ],
  });
  subCategoryIds = subCategoryIds.map((item) => item.id);

  console.log(subCategoryIds);

  // get the ArticleId of categoryId
  let categoryArticleIds = await models.Article.findAll({
    attributes: ["id"],
    include: [
      {
        model: models.SubCategory,
        where: {
          id: {
            [Op.or]: subCategoryIds,
          },
        },
      },
    ],
  });

  categoryArticleIds = categoryArticleIds.map((item) => item.id);
  console.log("CHECK HERE");
  console.log(categoryArticleIds);

  const limit = 7;

  // get the list of article with tag
  let { rows, count } = await models.Article.findAndCountAll({
    where: {
      id: {
        [Op.or]: categoryArticleIds,
      },
    },
    include: [
      {
        model: models.Tag,
        attributes: ["name"],
      },
      {
        model: models.SubCategory,
        attributes: ["name"],
      },
    ],
    distinct: true,
    limit: limit,
    offset: limit * (page - 1),
  });

  res.locals.categoryArticles = rows;

  res.locals.pagination = {
    page: page,
    limit: limit,
    totalRows: count,
    queryParams: req.query,
  };

  // get the name of category
  let category = await models.Category.findByPk(categoryId);
  res.locals.categoryName = category.name;

  // get the name of subCategory
  let subCategory = await models.SubCategory.findAll({
    include: [
      {
        model: models.Category,
        where: {
          id: categoryId,
        },
      },
    ],
  });
  // subCategory = subCategory.map(item => item.name);
  res.locals.subCategory = subCategory;

  res.render("readcategory");
};

controller.showSubCategory = async (req, res) => {
  let subCategoryId = req.query.subCategoryId || 0;

  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

  let subCategory = await models.SubCategory.findByPk(subCategoryId);
  res.locals.subCategoryName = subCategory.name;

  let category = await models.Category.findOne({
    attributes: ["id", "name"],
    include: [
      {
        model: models.SubCategory,
        attributes: [],
        where: {
          id: subCategoryId,
        },
      },
    ],
  });

  let articleIds = await models.CategoryArticle.findAll({
    attributes: ["articleId"],
    where: {
      subCategoryId: subCategoryId,
    },
  });

  articleIds = articleIds.map((item) => item.articleId);

  let limit = 7;

  // get the subCategoryId of categoryId
  let { rows, count } = await models.Article.findAndCountAll({
    where: {
      id: {
        [Op.or]: articleIds,
      },
    },
    include: [
      {
        model: models.Tag,
        attributes: ["name"],
      },
    ],
    order: [["createdAt", "DESC"]],
    distinct: true,
    limit: limit,
    offset: limit * (page - 1),
  });

  // create pagination
  res.locals.pagination = {
    page: page,
    limit: limit,
    totalRows: count,
    queryParams: req.query,
  };

  // add property 'category' into subCategoryArticles object
  for (let index = 0; index < rows.length; index++) {
    rows[index].category = category;
  }

  res.locals.subCategoryArticles = rows;
  res.render("readsubcategory");
};

controller.showArticle = async (req, res) => {
  let articleId = parseInt(req.query.articleId);
  // console.log('hello world');
  // lay comment tuong ung voi articleId
  res.locals.articleId = articleId;
  res.locals.commentInfo = {
    userInfo: res.locals.userInfo,
    articleId: articleId,
  };

  let article = await models.Article.findOne({
    where: { id: articleId },
  });

  let subCategoryId = await models.CategoryArticle.findOne({
    where: { articleId: articleId },
  });

  let subCategory = await models.SubCategory.findOne({
    where: { id: subCategoryId.subCategoryId },
  });

  let category = await models.Category.findOne({
    where: { id: subCategory.categoryId },
  });

  let author = await models.User.findOne({
    where: { id: article.authorId },
  });

  console.log(article);
  console.log(subCategory);
  console.log(category);
  console.log(author.name);

  // TODO Lấy 5 bài viết cùng chuyên mục, sắp xếp theo tổng lượt view
  // Lấy các chuyên mục cấp 2 cùng chuyên mục cha với nó
  let allSubCategories = await models.SubCategory.findAll({
    where: { categoryId: category.id },
  });
  // Lấy các bài viết thuộc chuyên mục đó
  let subCategoryIds = allSubCategories.map((subCategory) => subCategory.id);
  let articleInCategories = await models.CategoryArticle.findAll({
    where: {
      subCategoryId: subCategoryIds,
    },
  });
  // Lấy các bài viết theo số lượng view, có thể là ưu tiên cùng sub category trước
  let articleIds = articleInCategories.map((article) => article.articleId);
  let articleDetailInCategories = await models.Article.findAll({
    where: {
      id: articleIds,
    },
  });
  console.log("CHECK HERE");
  console.log(articleDetailInCategories);

  let dateArticle = article.dataValues.approve;
  // Tạo đối tượng Date từ chuỗi thời gian
  const date = new Date(dateArticle);

  // Mảng tên các ngày trong tuần
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  // Lấy thông tin về ngày, tháng, năm và thứ
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Lấy thông tin về giờ, phút và thời gian
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Tạo chuỗi kết quả
  const resultString = `${dayOfWeek} ${day}/${
    month < 10 ? "0" : ""
  }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;

  console.log(resultString);
  article.dataValues.approve = resultString;

  res.locals.category = category;
  res.locals.subCategory = subCategory;
  res.locals.article = article;
  res.locals.article.author = author.name;
  if (res.locals.userInfo.role != "default") {
    res.locals.article.premium = "premium";
  }

  let comments = await models.Comment.findAll({
    attributes: ["content", "updatedAt", "articleId"],
    where: {
      articleId: articleId,
    },
    include: [
      {
        model: models.User,
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  // console.log(typeof(comments[0].User))
  for (let index = 0; index < comments.length; index++) {
    if (comments[index].User.id == res.locals.userInfo.id) {
      comments[index].User.matched = true;
    } else comments[index].User.matched = false;
  }
  // console.log(comments[0].User.matched)
  res.locals.Comments = comments;

  // // lay content cho article
  // let articles = await models.Article.findByPk(articleId, {
  //   include: [
  //     {
  //       model: models.User,
  //       attributes: ['name']
  //     },
  //     {
  //       model: models.SubCategory,
  //       attributes: ['name', 'categoryId']
  //     }
  //   ]
  // });

  // // lay tagIds theo articleIds
  // let tagIds = await models.TagArticle.findAll({
  //   // attributes: ['tagId'],
  //   where: {
  //     articleId: articleId
  //   }
  // });

  // tagIds = tagIds.map(item => item.tagId);

  // let articleTags = await models.Tag.findAll({
  //   attributes: ['name'],
  //   where: {
  //     id: tagIds
  //   }
  // });

  // // lay category cho article
  // let category = await models.Category.findOne({
  //   attributes: ['name'],
  //   where: {
  //     id: articles.SubCategories[0].categoryId
  //   }
  // });
  // category = category.name;
  // // console.log(article.SubCategories[0].Category);
  // // res.locals.article = article;
  // res.locals.
  // res.locals.userRole = res.locals.userInfo.role;

  //

  res.render("readnews");
};

controller.showTag = async (req, res) => {
  let tagId = req.query.tagId || 0;
  let tagArticleIds = await models.TagArticle.findAll({
    attributes: ["articleId"],
    where: { tagId: tagId },
  });

  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

  tagArticleIds = tagArticleIds.map((item) => item.articleId);

  let tagName = await models.Tag.findOne({
    attributes: ["name"],
    where: { id: tagId },
  });

  res.locals.tagName = tagName.name;

  const limit = 7;

  let { rows, count } = await models.TagArticle.findAndCountAll({
    attributes: ["tagId"],
    where: { articleId: tagArticleIds },
    include: [
      {
        model: models.Article,
        include: [
          {
            model: models.Tag,
            attributes: ["name"],
          },
        ],
      },
    ],
    distinct: true,
    limit: limit,
    offset: limit * (page - 1),
  });

  // console.log(rows.length);

  res.locals.tagArticles = rows;
  res.locals.pagination = {
    page: page,
    limit: limit,
    totalRows: count,
    queryParams: req.query,
  };

  res.render("tag");
};

controller.search = async (req, res) => {
  let text_search = req.query.keyword || "";
  // const si = require('search-index');
  // const articles = await models.Article.findAll();
  // const ids = articles.map(item => item['id']);
  // const slugs = articles.map(item => item['slug']);
  // const array = [];
  // for (let index = 0; index < ids.length; index++) {
  //   array.push({_id: ids[index], _slug: slugs[index]});
  // }
  // console.log(array);
  // const db = await si({ name: 'SEARCH' });
  // await db.PUT(articles);

  // let result = await db.QUERY({ AND: [text_search] })
  // console.log(result)

  // const result = await db.sequelize.query("SELECT name FROM Article", {
  //   type: sequelize.QueryTypes.SELECT
  // });
  // console.log(result);
  // await db.sequelize.query("SELECT * from Category", {tyep: sequelize.QueryTypes.SELECT}).then((data) => {
  //   console.log(data);
  // })
  const result = await models.Article.findAll({
    where: models.Sequelize.literal(),
    replacements: {
      name: "Alex",
    },
  });
  console.log(result);
  res.send("hello world");
};

controller.makeComment = async (req, res) => {
  let userId = req.body.userId;
  let comment = req.body.comment;
  let articleId = req.body.articleId;

  let userComment = await models.Comment.findOne({
    where: {
      userId: userId,
      articleId: articleId,
    },
  });

  if (!userComment) {
    await models.Comment.create({
      userId: userId,
      articleId: articleId,
      content: comment,
    })
      .then(async (data) => {
        let user = await models.User.findByPk(userId);
        res.send({ message: "success", data: data, userName: user.name });
      })
      .catch((e) => {
        res.send({ message: e });
      });
  } else res.send({ message: "failed" });
};

controller.changeComment = async (req, res) => {
  let userId = req.body.userId;
  let comment = req.body.comment;
  let articleId = req.body.artileId;

  await models.Comment.create({
    content: comment,
    userId: userId,
    articleId: articleId,
  }).then((data) => {
    res.send({ message: "updated" });
  });
};

controller.deleteComment = async (req, res) => {
  let userId = req.body.userId;
  let articleId = req.body.articleId;

  let userComment = await models.Comment.findOne({
    where: {
      userId: userId,
      articleId: articleId,
    },
  });

  if (userComment) {
    await models.Comment.destroy({
      where: {
        userId: userId,
        articleId: articleId,
      },
    })
      .then(async (data) => {
        let comments = await models.Comment.findAll({
          attributes: ["content", "updatedAt", "articleId"],
          where: {
            articleId: articleId,
          },
          include: [
            {
              model: models.User,
              attributes: ["id", "name"],
            },
          ],
          order: [["createdAt", "DESC"]],
        });

        res.send({ message: "deleted", data: comments });
      })
      .catch((e) => {
        res.send({ message: e });
      });
  } else res.send({ message: "failed" });
};

module.exports = controller;
