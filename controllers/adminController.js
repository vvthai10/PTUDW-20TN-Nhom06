"use strict";

const controller = {};
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const bcrypt = require("bcrypt");

controller.showHomepage = async (req, res) => {
  res.locals.header_title = "Admin";
  res.locals.header_note = "ADMINISTRATOR";

  let queryKeys = Object.keys(req.query);
  let keyword = req.query.keyword || "";
  let type = [
    "category-manage-1",
    "category-manage-2",
    "tag-manage",
    "article-manage",
    "user-manage-1",
    "user-manage-2",
    "user-manage-3",
  ].includes(req.query.type)
    ? req.query.type
    : "category-manage-1";
  res.locals.originalUrl = req.originalUrl;
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

  if (type == "category-manage-1") {
    let options = {
      attributes: [
        "id",
        "name",
        [
          sequelize.fn(
            "COUNT",
            sequelize.fn("DISTINCT", sequelize.col("SubCategories.id"))
          ),
          "subcategoryCount",
        ],
      ],
      where: {},
      include: [
        {
          model: models.SubCategory,
          attributes: [
            [
              sequelize.fn(
                "COUNT",
                sequelize.col("SubCategories->Articles.id")
              ),
              "articleCountBySubCat",
            ],
            [
              sequelize.fn(
                "SUM",
                sequelize.col("SubCategories->Articles.nComment")
              ),
              "nCommentCountBySubCat",
            ],
            [
              sequelize.fn(
                "SUM",
                sequelize.col("SubCategories->Articles.nView")
              ),
              "nViewCountBySubCat",
            ],
          ],
          include: [
            {
              model: models.Article,
              attributes: [],
              through: { attributes: [] },
            },
          ],
          group: ["SubCategory.id"],
        },
      ],
      raw: true,
      nest: true,
      group: ["Category.id", "Category.name"],
      order: ["id"],
    };
    if (keyword.trim() != "") {
      options.where.name = { [Op.iLike]: `%${keyword}%` };
    }
    let categories = await models.Category.findAll(options);
    res.locals.categories = categories;
  } else if (type == "category-manage-2") {
    let options = {
      attributes: [
        "id",
        "name",
        [sequelize.fn("COUNT", sequelize.col("Articles.id")), "nArticle"],
        [
          sequelize.fn("SUM", sequelize.col("Articles.nComment")),
          "nCommentTotal",
        ],
        [sequelize.fn("SUM", sequelize.col("Articles.nView")), "nViewTotal"],
      ],
      where: {},
      include: [
        {
          model: models.Article,
          attributes: [],
          through: { attributes: [] },
        },
        {
          model: models.Category,
          attributes: ["name"],
        },
      ],
      raw: true,
      nest: true,
      group: ["SubCategory.id", "Category.name"],
      order: ["id"],
    };
    if (keyword.trim() != "") {
      options.where.name = { [Op.iLike]: `%${keyword}%` };
    }
    let subcategories = await models.SubCategory.findAll(options);
    res.locals.subcategories = subcategories;
  } else if (type == "tag-manage") {
    let options = {
      attributes: [
        "id",
        "name",
        [sequelize.fn("COUNT", sequelize.col("Articles.id")), "nArticle"],
        [
          sequelize.fn("SUM", sequelize.col("Articles.nComment")),
          "nCommentTotal",
        ],
        [sequelize.fn("SUM", sequelize.col("Articles.nView")), "nViewTotal"],
      ],
      where: {},
      include: [
        {
          model: models.Article,
          attributes: [],
          through: { attributes: [] },
        },
      ],
      raw: true,
      nest: true,
      group: ["Tag.id", "Tag.name"],
      order: ["id"],
    };
    if (keyword.trim() != "") {
      options.where.name = { [Op.iLike]: `%${keyword}%` };
    }
    let tags = await models.Tag.findAll(options);
    res.locals.tags = tags;
  } else if (type == "article-manage") {
    //let status = ['posted', 'approved'].includes(req.query.status) ? req.query.status : null;
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
        "approve",
      ],
      where: { status: { [Op.in]: ["posted", "approved", "pending"] } },
      include: [
        {
          model: models.User,
          as: "editor",
          attributes: ["name"],
        },
      ],
      order: ["status"],
    };
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
    res.locals.keyword = keyword;
    res.locals.originalUrl = removeParam("subcategory", req.originalUrl);
    if (Object.keys(req.query).length == 0) {
      res.locals.originalUrl = res.locals.originalUrl + "?";
    }
  } else if (type == "user-manage-1") {
    // let options = {
    //   attributes: ["id", "name", "email"],
    //   where: { role: "writer" },
    //   // include: [
    //   //   {
    //   //     model: models.SubCategory,
    //   //     attributes: ["name"],
    //   //     through: { attributes: [] },
    //   //   },
    //   // ],
    //   raw: true,
    //   nest: true,
    //   // group: ["User.id", "User.name", ],
    //   order: ["id"],
    // };
    // if (keyword.trim() != "") {
    //   options.where.name = { [Op.iLike]: `%${keyword}%` };
    // }
    // let writers = await models.User.findAll(options);
    // res.locals.writers = writers;
    // console.log(writers);

    let options = {
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("Article.id")), "articleCount"],
      ],
      include: [
        {
          model: models.User,
          as: "author",
          required: false,
          right: true,
          attributes: ["id", "name", "email", "role"],
          where: { role: "writer" }, // không áp dụng được, phải filter lại
          raw: true,
          nest: true,
          order: ["id"],
        },
      ],
      raw: true,
      nest: true,
      group: ["author.id", "author.name"],
      order: [[{ model: models.User, as: "author" }, "id", "ASC"]],
    };
    if (keyword.trim() != "") {
      options.include[0].where.name = { [Op.iLike]: `%${keyword}%` };
    }
    let writers = await models.Article.findAll(options);
    writers = writers.filter(
      (writer) => writer.author && writer.author.role === "writer"
    ); // filter lại role
    res.locals.writers = writers;
    console.log(writers);
  } else if (type == "user-manage-2") {
    // let options = {
    //   attributes: ["id", "name", "email"],
    //   where: { role: "editor" },
    //   include: [
    //     {
    //       model: models.SubCategory,
    //       attributes: ["id","name"],
    //       through: { attributes: [] },
    //       order: ["id"],
    //     },
    //   ],
    //   raw: true,
    //   nest: true,
    //   group: ["User.id", "User.name", "SubCategories.id", "SubCategories.name"],
    //   order: ["id"],
    // };
    // if (keyword.trim() != "") {
    //   options.where.name = { [Op.iLike]: `%${keyword}%` };
    // }
    // let editors = await models.User.findAll(options);
    // res.locals.editors = processEditorList(editors);
    // console.log(editors);

    let options = {
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("Article.id")), "articleCount"],
      ],
      include: [
        {
          model: models.User,
          as: "editor",
          attributes: ["id", "name", "email", "role"],
          where: { role: "editor" }, // không áp dụng được, phải filter lại
          required: false,
          right: true,
          include: [
            {
              model: models.SubCategory,
              attributes: ["id", "name"],
              through: { attributes: [] },
              order: ["id"],
              raw: true,
              nest: true,
            },
          ],
          raw: true,
          nest: true,
          group: [
            "User.id",
            "User.name",
            "SubCategories.id",
            "SubCategories.name",
          ],
          order: ["id"],
        },
      ],
      raw: true,
      nest: true,
      group: ["editor.id", "editor.name", "editor->SubCategories.id"],
      order: [[{ model: models.User, as: "editor" }, "id", "ASC"]],
    };
    if (keyword.trim() != "") {
      options.include[0].where.name = { [Op.iLike]: `%${keyword}%` };
    }
    let editors = await models.Article.findAll(options);
    editors = editors.filter(
      (editor) => editor.editor && editor.editor.role === "editor"
    ); // filter lại role
    res.locals.editors = processEditorList(editors);
    console.log(res.locals.editors);
  } else if (type == "user-manage-3") {
    let options = {
      attributes: [
        "id",
        "name",
        "email",
        "expiredAt",
        [
          sequelize.fn("COUNT", sequelize.col("Articles.Comment.articleId")),
          "commentCount",
        ],
      ],
      where: { role: { [Op.in]: ["default", "premium"] } },
      include: [
        {
          model: models.Article,
          attributes: [],
          through: { model: models.Comment, attributes: [] },
        },
      ],
      raw: true,
      nest: true,
      group: ["User.id", "User.name"],
      order: ["id"],
    };
    let options2 = {
      attributes: [
        "id",
        "name",
        "email",
        [
          sequelize.fn("COUNT", sequelize.col("Articles.Comment.articleId")),
          "likeCount",
        ],
      ],
      where: { role: { [Op.in]: ["default", "premium"] } },
      include: [
        {
          model: models.Article,
          attributes: [],
          through: { model: models.Reaction, attributes: [] },
        },
      ],
      raw: true,
      nest: true,
      group: ["User.id", "User.name"],
      order: ["id"],
    };
    if (keyword.trim() != "") {
      options.where.name = { [Op.iLike]: `%${keyword}%` };
      options2.where.name = { [Op.iLike]: `%${keyword}%` };
    }

    let readers = await models.User.findAll(options);
    let readers2 = await models.User.findAll(options2);
    for (let i = 0; i < readers.length; i++) {
      readers[i].likeCount = readers2[i].likeCount;      
      readers[i].numOfPremDay = calculateNumOfDay(readers[i].expiredAt);
    }
    res.locals.readers = readers;
    console.log(readers);
    console.log(typeof(readers[1].expiredAt));
  }
  res.locals.type = type;
  res.locals.keyword = keyword;
  // res.locals.originalUrl = req.originalUrl;
  // , { layout: "layout_simple.hbs" }
  res.render("admin");
};

controller.add = async (req, res, next) => {
  if (!req.user) res.redirect("/admin");
  console.log(req.body);
  try {
    switch (req.body.type) {
      case "Chuyên mục cấp 1":
        let newCat1 = await models.Category.create({
          name: req.body.name,
          icon: req.body.iconLink,
          iconDeleteHash: req.body.iconDeleteHash,
        });
        break;
      case "Chuyên mục cấp 2":
        let newCat2 = await models.SubCategory.create({
          name: req.body.name,
          categoryId: parseInt(req.body.category),
          // icon: '',
        });
        break;
      case "Nhãn":
        let newTag = await models.Tag.create({
          name: req.body.name,
        });
        break;
      case "tài khoản Phóng viên":
        let newWriter = await models.User.create({
          name: req.body.name,
          email: req.body.email,
          avatar: "default.jpg",
          role: "writer",
          password: bcrypt.hashSync("Demo@123", bcrypt.genSaltSync(8)),
        });
        let assigned1 = await models.SubCategory.findAll({
          where: { name: { [Op.in]: req.body.cat2.split(", ") } },
        });
        console.log(assigned1);
        if (assigned1) {
          try {
            await newWriter.addSubCategories(assigned1);
          } catch (e) {
            console.log(e);
          }
        }
        break;
      case "tài khoản Biên tập viên":
        let newEditor = await models.User.create({
          name: req.body.name,
          email: req.body.email,
          avatar: "default.jpg",
          role: "editor",
          password: bcrypt.hashSync("Demo@123", bcrypt.genSaltSync(8)),
        });
        let assigned2 = await models.SubCategory.findAll({
          where: { name: { [Op.in]: req.body.cat2.split(", ") } },
        });
        if (assigned2) {
          try {
            await newEditor.addSubCategories(assigned2);
          } catch (e) {
            console.log(e);
          }
        }
        break;
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(req.body.originalUrl);
  // Chưa có message
};

controller.delete = async (req, res, next) => {
  if (!req.user) res.redirect("/admin");
  console.log(req.body);
  try {
    switch (req.body.type) {
      case "Chuyên mục cấp 1":
        await models.Category.destroy({
          where: { name: req.body.name },
        });
        break;
      case "Chuyên mục cấp 2":
        await models.SubCategory.destroy({
          where: { name: req.body.name },
        });
        break;
      case "Nhãn":
        await models.Tag.destroy({
          where: { name: req.body.name },
        });
        break;
      case "tài khoản Phóng viên":
        await models.User.destroy({
          where: { name: req.body.name },
        });
        break;
      case "tài khoản Biên tập viên":
        await models.User.destroy({
          where: { name: req.body.name },
        });
        break;
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(req.body.originalUrl);
  // Chưa có message
};

controller.modify = async (req, res, next) => {
  if (!req.user) res.redirect("/admin");
  console.log(req.body);
  try {
    switch (req.body.type) {
      case "Bài viết":
        if (req.body.id) {
          let article = await models.Article.findOne({
            where: { id: parseInt(req.body.id) },
          });
          article.status = "posted";
          await article.save();
        }
        break;
      case "tài khoản Biên tập viên":
        if (req.body.id) {
          let editor = await models.User.findOne({
            where: { id: parseInt(req.body.id) },
          });
          let assigned = await models.SubCategory.findAll({
            where: { name: { [Op.in]: req.body.cat2.split(", ") } },
          });
          if (assigned) {
            await editor.setSubCategories(null);
            await editor.addSubCategories(assigned);
          }
        }
        break;
      case "tài khoản Độc giả":
        if (req.body.id) {
          let user = await models.User.findOne({
            where: { id: parseInt(req.body.id) },
          });
          user.role = "premium";

          // TODO Tăng thời gian premium cho user, hiện tại chưa thể add type 4 nên sử dụng tạm type = 3
          let registerDate = new Date();
          let expiredDate = new Date(registerDate);

          expiredDate.setDate(
            expiredDate.getDate() + parseInt(req.body.numOfPremDay)
          );
          // TODO Cập nhật trong bảng payment
          let premium = await models.Payment.create({
            userId: req.body.id,
            amount: 0,
            type: 3,
            registeredAt: registerDate,
            expiredAt: expiredDate,
          });
          // TODO Cập nhật trong bảng user
          var userExpiredAt = user.expiredAt;
          let addTime = null;
          if (userExpiredAt == null) {
            addTime = expiredDate;
          } else {
            let originTime = new Date(userExpiredAt);
            addTime = new Date(originTime);
            addTime.setDate(
              addTime.getDate() + parseInt(req.body.numOfPremDay)
            );
          }
          // await models.User.update(
          //   { expiredAt: addTime, role: "premium" },
          //   { where: { id: data.id } }
          // );
          user.expiredAt = addTime;
          await user.save();
        }
        break;
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(req.body.originalUrl);
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

function processEditorList(originalList) {
  let currentId = -1;
  let list = [];
  originalList.forEach((item) => {
    if (item.editor.id != currentId) {
      currentId = item.editor.id;
      item.editor.assigned = item.editor.SubCategories.name;
      list.push(item);
    } else {
      list.at(-1).editor.assigned = list
        .at(-1)
        .editor.assigned.concat(", ", item.editor.SubCategories.name);
    }
  });
  return list;
}

function calculateNumOfDay(expiredAt) {
  let expired = new Date(expiredAt); 
  let now = new Date();
  const milliseconds = expired - now;
  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Calculate the remaining hours and minutes
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;

  return  (expired - now) > 0 ? `${days} ngày, ${remainingHours} giờ, ${remainingMinutes} phút` : null;
}

module.exports = controller;
