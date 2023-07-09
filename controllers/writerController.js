"use strict";

const controller = {};
const models = require("../models");
const sequelize = require("sequelize");
const slugify = require("slugify");
const Op = sequelize.Op;

controller.showHomepage = async (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";

  let user = !req.user ? -1 : req.user.id;
  let status = ["posted", "approved", "pending", "rejected", "draft"].includes(
    req.query.status
  )
    ? req.query.status
    : null;
  let subcategory = req.query.subcategory;
  let keyword = req.query.keyword || "";
  let options = {
    attributes: [
      "id",
      "name",
      "updatedAt",
      "status",
      "editorId",
      "reviewComment",
    ],
    where: { authorId: user },
    include: [
      {
        model: models.User,
        as: "editor",
        attributes: ["name"],
      },
    ],
  };
  if (status) {
    options.where.status = status;
  }
  if (subcategory) {
    options.include.push({
      model: models.SubCategory,
      where: { id: subcategory },
    });
  }
  if (keyword.trim() != "") {
    options.where.name = {
      [Op.iLike]: `%${keyword}%`,
    };
  }

  let articles = await models.Article.findAll(options);
  res.locals.articles = articles;

  res.locals.status = status;
  res.locals.keyword = keyword;
  res.locals.originalUrl = removeParam("subcategory", req.originalUrl);
  if (Object.keys(req.query).length == 0) {
    res.locals.originalUrl = res.locals.originalUrl + "?";
  }

  res.render("writer", { layout: "layout_simple.hbs" });
};

controller.showComposePage = async (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";
  let cat1 = await models.Category.findAll({
    attributes: ["id", "name"],
    raw: true,
    nest: true,
  });
  res.locals.cat1 = cat1;
  let cat2 = await models.SubCategory.findAll({
    attributes: ["id", "name", "categoryId"],
    raw: true,
    nest: true,
  });
  res.locals.cat2 = cat2;
  let tags = await models.Tag.findAll({
    attributes: ["id", "name"],
    raw: true,
    nest: true,
  });
  res.locals.tags = tags;
  res.render("writer_compose", { layout: "layout_simple.hbs" });
};

controller.newArticle = async (req, res, next) => {
  let userId = !req.user ? null : req.user.id;
  try {
    let article = await models.Article.create({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true, strict: true }),
      status: req.body.status,
      imgCover: req.body.imgCover,
      description: req.body.description,
      content: req.body.content,
      authorId: userId,
      nLike: 0,
      nComment: 0,
      nView: 0,
      nViewWeek: 0,
      nViewMonth: 0,
    });

    let subcat = await models.SubCategory.findOne({
      where: { id: parseInt(req.body.subcategory) },
    });
    if (subcat) {
      try {
        await article.addSubCategory(subcat);
      } catch (e) {
        console.log(e);
      }
    }
    let tags = await models.Tag.findAll({
      where: { name: { [Op.in]: req.body.tags.split(", ") } },
    });
    if (tags) {
      try {
        await article.addTags(tags);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/writer");
  // Chưa có message
};

controller.showEditPage = async (req, res) => {
  res.locals.header_title = "Writer";
  res.locals.header_note = "WRITER";

  // Co user va article id
  let id = req.query.id;
  let user = !req.user ? null : req.user.id;
  if (!user) {
    return res.redirect("/");
  } else if (!id) {
    return res.redirect("/writer");
  }

  let article = await models.Article.findOne({
    where: { id },
    include: [
      {
        model: models.SubCategory,
        attributes: ["id", "name", "categoryId"],
        through: { attributes: [] },
      },
      {
        model: models.Tag,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
    raw: true,
    nest: true,
  });
  //console.log(article);
  let selectedTags = await models.Tag.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: models.Article,
        attributes: [],
        where: { id },
        through: { attributes: [] },
      },
    ],
    raw: true,
    nest: true,
  });
  res.locals.selectedTags = selectedTags;
  //console.log(selectedTags);

  // Article phai co id va status hop le
  if (
    article.authorId != user ||
    ["posted", "approved", "pending"].includes(article.status)
  ) {
    return res.redirect("/writer");
  } else {
    // Show edit page
    res.locals.article = article;
    let cat1 = await models.Category.findAll({
      attributes: ["id", "name"],
      raw: true,
      nest: true,
    });
    res.locals.cat1 = cat1;
    let cat2 = await models.SubCategory.findAll({
      attributes: ["id", "name", "categoryId"],
      raw: true,
      nest: true,
    });
    res.locals.cat2 = cat2;
    let tags = await models.Tag.findAll({
      attributes: ["id", "name"],
      raw: true,
      nest: true,
    });
    res.locals.tags = tags;
    res.render("writer_edit", { layout: "layout_simple.hbs" });
  }
};

controller.saveEdit = async (req, res) => {
  //console.log(req.body);
  let user = !req.user ? null : req.user.id;
  let article = await models.Article.findOne({
    where: { id: parseInt(req.body.id) },
  });
  //console.log(article);
  if (
    article.authorId != user ||
    ["posted", "approved", "pending"].includes(article.status)
  ) {
    return res.redirect("/writer");
  }
  try {
    article.name = req.body.name;
    article.slug = slugify(req.body.name, { lower: true, strict: true });
    article.status = req.body.status;
    article.imgCover = req.body.imgCover;
    article.description = req.body.description;
    article.content = req.body.content;
    await article.save();

    let subcat = await models.SubCategory.findOne({
      where: { id: parseInt(req.body.subcategory) },
    });
    //console.log(subcat);
    if (subcat) {
      try {
        await article.setSubCategories([subcat]);
      } catch (e) {
        console.log(e);
      }
    }
    let tags = await models.Tag.findAll({
      where: { name: { [Op.in]: req.body.tags.split(", ") } },
    });
    //console.log(tags);
    if (tags) {
      try {
        article.setTags(tags);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect("/writer");
  // Chưa có message
};

function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
    param,
    params_arr = [],
    queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
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
