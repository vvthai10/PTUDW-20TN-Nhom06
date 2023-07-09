"use strict";
const models = require("../models");
const slugify = require("slugify");
const controller = {};
const sequelize = require("sequelize");
const tagarticle = require("../models/tagarticle");
const Op = sequelize.Op;
const db = require("../models/index");
const { publicDecrypt } = require("crypto");

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

  let mainArticle = await models.Article.findOne({
    where: {
      status: "posted"
    },
    include: [
      {
        model: models.SubCategory,
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  let dataArticle = mainArticle.dataValues.updatedAt;
  // Tạo đối tượng Date từ chuỗi thời gian
  let date = new Date(dataArticle);
  // Lấy thông tin về ngày, tháng, năm và thứ
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dayOfWeek = daysOfWeek[date.getDay()];

  // Lấy thông tin về giờ, phút và thời gian
  let hour = date.getHours();
  let minute = date.getMinutes();

  // Tạo chuỗi kết quả
  let resultString = `${dayOfWeek} ${day}/${
    month < 10 ? "0" : ""
  }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
  
  mainArticle.dataValues.updatedAt = resultString;
  res.locals.mainArticle = mainArticle;

  let popularArticles = await models.Article.findAll({
    include: [
      {
        model: models.SubCategory,
        status: "posted"
      },
    ],
    order: [["nViewWeek", "DESC"]],
    limit: 4,
  });
  
  for (let index = 0; index < popularArticles.length; index++) {
    dataArticle = popularArticles[index].dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    date = new Date(dataArticle);
    // Lấy thông tin về ngày, tháng, năm và thứ
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy thông tin về giờ, phút và thời gian
    hour = date.getHours();
    minute = date.getMinutes();

    // Tạo chuỗi kết quả
    resultString = `${dayOfWeek} ${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
    
    popularArticles[index].dataValues.updatedAt = resultString;
  }

  res.locals.popularArticles = popularArticles;



  // bai viet co luot xem cao nhat tat ca chuyen muc
  let viewArticles = await models.Article.findAll({
    where: {
      status: "posted"
    },
    include: [
      {
        model: models.SubCategory,
      },
    ],
    order: [["nView", "DESC"]],
    limit: 10,
  });

  for (let index = 0; index < viewArticles.length; index++) {
    dataArticle = viewArticles[index].dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    date = new Date(dataArticle);
    // Lấy thông tin về ngày, tháng, năm và thứ
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy thông tin về giờ, phút và thời gian
    hour = date.getHours();
    minute = date.getMinutes();

    // Tạo chuỗi kết quả
    resultString = `${dayOfWeek} ${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
    
    viewArticles[index].dataValues.updatedAt = resultString;
  }

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
    } else {
      temp.push({
        _item: [
          viewArticles[(index * 3) % viewArticles.length],
          viewArticles[(index * 3 + 1) % viewArticles.length],
          viewArticles[(index * 3 + 2) % viewArticles.length],
        ],
      });
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
    where: {
      status: "posted"
    },
    include: [
      {
        model: models.SubCategory,
      },
    ],
    order: [["updatedAt", "DESC"]],
    limit: 10,
  });

  for (let index = 0; index < newArticles.length; index++) {
    dataArticle = newArticles[index].dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    date = new Date(dataArticle);
      // Lấy thông tin về ngày, tháng, năm và thứ
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy thông tin về giờ, phút và thời gian
   hour = date.getHours();
   minute = date.getMinutes();

    // Tạo chuỗi kết quả
   resultString = `${dayOfWeek} ${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
    
    newArticles[index].dataValues.updatedAt = resultString;
  }

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
    } else {
      temp.push({
        _item: [
          newArticles[(index * 3) % newArticles.length],
          newArticles[(index * 3 + 1) % newArticles.length],
          newArticles[(index * 3 + 2) % newArticles.length],
        ],
      });
    }
  }
  newArticles_news.push({ _items: temp });
  res.locals.newArticles = newArticles_news;

  // top 10 chuyen muc, moi chuyen muc 1 bai moi nhat
  let newCategoryArticle = await models.SubCategory.findAll({
    include: [
      {
        model: models.Article,
        where: {
          status: 'posted'
        }
      },
    ],
    order: [[models.Article, "updatedAt", "DESC"]],
  });

  for (let index = 0; index < newCategoryArticle.length; index++) {
   newCategoryArticle[index].Article = newCategoryArticle[index].Articles[0];

   dataArticle = newCategoryArticle[index].Article.dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
   date = new Date(dataArticle);
      // Lấy thông tin về ngày, tháng, năm và thứ
   day = date.getDate();
   month = date.getMonth() + 1;
   year = date.getFullYear();
   dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy thông tin về giờ, phút và thời gian
   hour = date.getHours();
   minute = date.getMinutes();

    // Tạo chuỗi kết quả
   resultString = `${dayOfWeek} ${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
    
    newCategoryArticle[index].Article.dataValues.updatedAt = resultString;
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
    where: {
      status: "posted"
    },
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
    order: [['premium', 'DESC']]
  });

  categoryArticleIds = categoryArticleIds.map((item) => item.id);

  const limit = 7;

  // get the list of article with tag
  let { rows, count } = await models.Article.findAndCountAll({
    where: {
      id: {
        [Op.or]: categoryArticleIds,
      },
      status: "posted"
    },
    include: [
      {
        model: models.Tag,
        attributes: ["id", "name"],
      },
      {
        model: models.SubCategory,
        attributes: ["id", "name"],
      },
    ],
    order: [['premium', 'DESC']],
    distinct: true,
    limit: limit,
    offset: limit * (page - 1),
  });

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

  for (let index = 0; index < rows.length; index++) {
    let dataArticle = rows[index].dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    const date = new Date(dataArticle);
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

    rows[index].dataValues.updatedAt = resultString;
  }

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
      status: "posted"
    },
    include: [
      {
        model: models.Tag,
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"], ['premium', 'DESC']],
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

  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  // add property 'category' into subCategoryArticles object
  for (let index = 0; index < rows.length; index++) {
    rows[index].category = category;

    let dataArticle = rows[index].dataValues.updatedAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    const date = new Date(dataArticle);
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
    
    rows[index].dataValues.updatedAt = resultString;
  }

  res.locals.subCategoryArticles = rows;
  res.render("readsubcategory");
};

controller.showArticle = async (req, res) => {
  let articleId = parseInt(req.query.articleId);

  let article = await models.Article.findOne({
    where: { 
      id: articleId,
      status: "posted"
     },
  });

  if (article.premium == true && res.locals.userInfo != null && res.locals.userInfo.role != 'default' || article.premium == false) {
    res.locals.isPermitted = true;

    // lay comment tuong ung voi articleId
  res.locals.articleId = articleId;


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

  // console.log(article);
  // console.log(subCategory);
  // console.log(category);
  // console.log(author.name);
  // TODO Lấy danh sách tag của bài viết
  let tagOfArticle = await models.TagArticle.findAll({
    where: { articleId: articleId },
  });
  // Lấy thông tin chi tiết của các tag
  let tagIds = tagOfArticle.map((tag) => tag.tagId);
  let detailTags = await models.Tag.findAll({
    where: {
      id: tagIds,
    },
  });
  res.locals.detailTags = detailTags;

  // console.log("CHECK HERE");
  // console.log(detailTags);

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
    attributes: ["id", "name", "imgCover", "approve"],
    where: {
      id: articleIds,
      status: "posted"
    },
    order: [["nView", "DESC"]],
    limit: 6,
  });

  for (let index = 0; index < articleDetailInCategories.length; index++) {
    const temp = articleDetailInCategories[index];
    let SubCategoriesIds = await models.CategoryArticle.findAll({
      attributes: ["subCategoryId"],
      where: {
        articleId: temp.id
      }
    });

    SubCategoriesIds = SubCategoriesIds.map(item => item.subCategoryId);

    // console.log(SubCategoriesIds);


    const SubCategories = await models.SubCategory.findAll({
      attributes: ["id", "name"],
      where: {
        id: {
          [Op.or]: SubCategoriesIds
        }
      }
    })

    // console.log("CHECK HERE");
    // console.log(SubCategories);

    articleDetailInCategories[index].SubCategories = SubCategories;
  }

  let viewArticle_same = [];
  let temp = [];
  for (let index = 0; index < articleDetailInCategories.length / 3; index++) {
    if (index == 0) {
      viewArticle_same.push({
        _main_item: [
          {
            _item: [
              articleDetailInCategories[
                (index * 3) % articleDetailInCategories.length
              ],
              articleDetailInCategories[
                (index * 3 + 1) % articleDetailInCategories.length
              ],
              articleDetailInCategories[
                (index * 3 + 2) % articleDetailInCategories.length
              ],
            ],
          },
        ],
      });
    } else {
      temp.push({
        _item: [
          articleDetailInCategories[
            (index * 3) % articleDetailInCategories.length
          ],
          articleDetailInCategories[
            (index * 3 + 1) % articleDetailInCategories.length
          ],
          articleDetailInCategories[
            (index * 3 + 2) % articleDetailInCategories.length
          ],
        ],
      });
    }
  }
  viewArticle_same.push({ _items: temp });

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

  // console.log(resultString);
  article.dataValues.approve = resultString;

  // truy van comment cua article
  let {rows, count} = await models.Comment.findAndCountAll({
    attributes: ["content", "updatedAt", "articleId", "createdAt"],
    where: {
      articleId: articleId,
    },
    include: [
      {
        model: models.User,
        attributes: ["id", "name", "avatar"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  // console.log(comments);
  // console.log(typeof(comments[0].User))

  for (let index = 0; index < rows.length; index++) {
    let dataArticle = rows[index].createdAt;
    // Tạo đối tượng Date từ chuỗi thời gian
    let date = new Date(dataArticle);
    // Lấy thông tin về ngày, tháng, năm và thứ
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayOfWeek = daysOfWeek[date.getDay()];

    // Lấy thông tin về giờ, phút và thời gian
    let hour = date.getHours();
    let minute = date.getMinutes();

    // Tạo chuỗi kết quả
    let resultString = `${dayOfWeek} ${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
    
    rows[index].createdAt = resultString;
  }
  // console.log(comments[0].User.matched)
  // console.log(comments[0]);
  // res.locals.Comments = comments;
  article.Comments = rows;

  // console.log(rows[0].User)

  article.commentInfo = {
    userInfo: res.locals.userInfo,
    articleId: articleId
  }

  article.nComments = parseInt(count);

  res.locals.category = category;
  res.locals.subCategory = subCategory;

  if (res.locals.userInfo != null && res.locals.userInfo.role == "premium") {
    article.premium = true;
  }
  else article.premium = false;

  res.locals.article = article;
  res.locals.article.author = author.name;

  res.locals.viewArticlesSame = viewArticle_same;



  }
  else {  
    res.locals.isPermitted = false;
  }

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
    where: {
      id: {
        [Op.or]: tagArticleIds,
      },
      status: "posted"
    },
    include: [
      {
        model: models.Tag,
        attributes: ["id", "name"],
      },
      {
        model: models.SubCategory,
        attributes: ["id", "name"],
      },
    ],
    order: [['premium', 'DESC']],
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
      attributes: [
        "id",
        "name",
        "description",
        "premium",
        "approve",
        "updatedAt",
        "imgCover",
        sequelize.literal(
          `ts_rank("vectorSearch", plainto_tsquery('english', '${keyword}')) AS "searchScore"`
        ),
      ],
      where: {
        status: "posted",
        vectorSearch: { [Op.match]: sequelize.fn("plainto_tsquery", keyword) },
      },
      include: [],
      order: [sequelize.literal('"searchScore" DESC')],
      raw: true,
      nested: true,
    };
    const result = await models.Article.findAll(options);
    console.log(result);
    let articleIds = result.map((item) => item.id);
    let page = isNaN(req.query.page)
      ? 1
      : Math.max(1, parseInt(req.query.page));
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
        },
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
  } else res.redirect("/");
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
        const daysOfWeek = [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ];
        let dataArticle = data.dataValues.createdAt;
        // Tạo đối tượng Date từ chuỗi thời gian
        const date = new Date(dataArticle);
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
        
        data.dataValues.createdAt = resultString;
        res.send({ message: "success", data: data, userName: user.name });
      })
      .catch((e) => {
        res.send({ message: e });
      });
  } else res.send({ message: "failed" });
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
        // truy van comment cua article
        let {rows, count} = await models.Comment.findAndCountAll({
          attributes: ["content", "updatedAt", "articleId", "createdAt"],
          where: {
            articleId: articleId,
          },
          include: [
            {
              model: models.User,
              attributes: ["id", "name", "avatar"],
            },
          ],
          order: [["createdAt", "DESC"]],
        });

        const daysOfWeek = [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ];

        for (let index = 0; index < rows.length; index++) {
          let dataArticle = rows[index].User.createdAt;
          // Tạo đối tượng Date từ chuỗi thời gian
          let date = new Date(dataArticle);
          // Lấy thông tin về ngày, tháng, năm và thứ
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          let dayOfWeek = daysOfWeek[date.getDay()];
      
          // Lấy thông tin về giờ, phút và thời gian
          let hour = date.getHours();
          let minute = date.getMinutes();
      
          // Tạo chuỗi kết quả
          let resultString = `${dayOfWeek} ${day}/${
            month < 10 ? "0" : ""
          }${month}/${year} ${hour < 10 ? "0" : ""}${hour}:${minute} (GMT+7)`;
          
          rows[index].User.createdAt = resultString;
        }
        res.send({ message: "deleted", data: rows });
      })
      .catch((e) => {
        res.send({ message: e });
      });
  } else res.send({ message: "failed" });
};

module.exports = controller;
