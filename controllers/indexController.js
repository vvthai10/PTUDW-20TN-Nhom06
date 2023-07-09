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
  // console.log(res.locals.categories);
  next();
};

controller.showHomepage = async (req, res) => {
  let popularArticles = await models.Article.findAll({
    include: [
      {
        model: models.SubCategory
      }
    ],
    order: [['nViewWeek', 'DESC']],
    limit: 4
  });
  res.locals.popularArticles = popularArticles;

  // bai viet co luot xem cao nhat tat ca chuyen muc
  let viewArticles = await models.Article.findAll({
    include: [
      {
        model: models.SubCategory
      }
    ],
    order: [['nView', 'DESC']],
    limit: 10
  })

  let viewArticle_new = [];
  let temp = [];
  for (let index = 0; index < viewArticles.length / 3; index++) {
    if (index == 0) {
      viewArticle_new.push({
        _main_item: [
          {
            _item: [
              viewArticles[(index * 3) % viewArticles.length],
              viewArticles[(index * 3 + 1) % viewArticles.length],
              viewArticles[(index * 3 + 2) % viewArticles.length],
            ],
          },
        ],
      });
    }
    else {
      temp.push({_item: [viewArticles[index * 3 % viewArticles.length], viewArticles[(index * 3 + 1) % viewArticles.length], viewArticles[(index * 3 + 2) % viewArticles.length]]});
    }
  }
  viewArticle_new.push({ _items: temp });
  res.locals.viewArticles = viewArticle_new;

  // res.locals.latestArticles = rightArticles;
  // res.locals.popularArticles = popularArticles;
  let tags = await models.Tag.findAll();
  res.locals.tags = tags;

  // cac bai viet moi nhat moi chuyen muc
  let newArticles = await models.Article.findAll({
    include: [
      {
        model: models.SubCategory
      }
    ],
    order: [['updatedAt', 'DESC']],
    limit: 10
  })

  let newArticles_news = [];
  temp = [];
  for (let index = 0; index < newArticles.length / 3; index++) {
    if (index == 0) {
      newArticles_news.push({
        _main_item: [
          {
            _item: [
              newArticles[(index * 3) % newArticles.length],
              newArticles[(index * 3 + 1) % newArticles.length],
              newArticles[(index * 3 + 2) % newArticles.length],
            ],
          },
        ],
      });
    }
    else {
      temp.push({_item: [newArticles[index * 3 % newArticles.length], newArticles[(index * 3 + 1) % newArticles.length], newArticles[(index * 3 + 2) % newArticles.length]]});
    }
  }
  newArticles_news.push({ _items: temp });
  res.locals.newArticles = newArticles_news;

  const mainArticle = await models.Article.findOne({
    include: [
      {
        model: models.SubCategory
      }
    ],
    order: [['createdAt', 'DESC']]
  })
  res.locals.mainArticle = mainArticle;

  // top 10 chuyen muc, moi chuyen muc 1 bai moi nhat
  let newCategoryArticle = await models.SubCategory.findAll({
    include: [
      {
        model: models.Article
      }
    ],
    order: [
      [models.Article, 'updatedAt', 'DESC']
    ]
  });
  console.log(newCategoryArticle[3].Articles);
  for (let index = 0; index < newCategoryArticle.length; index++) {
    newCategoryArticle[index].Article = newCategoryArticle[index].Articles[0]
  }
  res.locals.newCategoryArticle = newCategoryArticle;
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
        attributes: ["id", "name"],
      },
      {
        model: models.SubCategory,
        attributes: ["id", "name"]
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
        attributes: ["id", "name"],
      }
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
    if (res.locals.userInfo != null && comments[index].User.id == res.locals.userInfo.id) {
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
    distinct: true
  });

  // console.log(tagArticleIds)

  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

  tagArticleIds = tagArticleIds.map((item) => item.articleId);

  let tagName = await models.Tag.findOne({
    attributes: ["name"],
    where: { id: tagId },
  });

  res.locals.tagName = tagName.name;

  const limit = 7;

  let { rows, count } = await models.Article.findAndCountAll({
    where: { id: {
      [Op.or]: tagArticleIds
    }},
    include: [
      {
        model: models.Tag,
        attributes: ["id", "name"],
      },
      {
        model: models.SubCategory,
        attributes: ["id", "name"]
      }
    ],
    distinct: true,
    limit: limit,
    offset: limit * (page - 1),
  });

  // console.log(count);

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
  let keyword = req.query.keyword || "";
  res.locals.keyword = req.query.keyword;
  if (keyword.trim()) {
    let options = {
      attributes: ['id', 'name', 'description', 'premium', 'approve', 'updatedAt', 'imgCover', sequelize.literal(`ts_rank("vectorSearch", plainto_tsquery('english', '${keyword}')) AS "searchScore"`)],
      where: {status: 'posted', vectorSearch: {[Op.match]: sequelize.fn('plainto_tsquery', keyword)},}, 
      include: [],
      order:[sequelize.literal('"searchScore" DESC')],
      raw: true,
      nested: true,
    };
    const result = await models.Article.findAll(options);
    console.log(result);
    let articleIds = result.map((item) => item.id);
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
    let limit = 7;

    // get the subCategoryId of categoryId
    let { rows, count } = await models.Article.findAndCountAll({
      where: {
        id: {
          [Op.in]: articleIds,
        },
      },
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
        },
        {
          model: models.SubCategory,
          attributes: ["name", "categoryId"],
        }
      ],
      distinct: true,
      limit: limit,
      offset: limit * (page - 1),
    });
    console.log(rows);

    // create pagination
    res.locals.pagination = {
      page: page,
      limit: limit,
      totalRows: count,
      queryParams: req.query,
    };


    res.locals.searchResults = rows;
    res.render("search");
  }
  else res.redirect('/');
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
