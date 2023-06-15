"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsToMany(models.Tag, {
        through: "TagArticle",
        foreignKey: "articleId",
        otherKey: "tagId",
      });
      Article.belongsToMany(models.SubCategory, {
        through: "CategoryArticle",
        foreignKey: "articleId",
        otherKey: "subCategoryId",
      });
      Article.belongsToMany(models.User, {
        through: "Reaction",
        foreignKey: "articleId",
        otherKey: "userId",
      });
      // Article.belongsToMany(models.Comment, {
      //   through: "Reaction",
      //   foreignKey: "articleId",
      //   otherKey: "commentId",
      // });
      Article.belongsToMany(models.User, {
        through: "Comment",
        foreignKey: "articleId",
        otherKey: "userId",
      });
      Article.belongsTo(models.User, {
        foreignKey: "authorId",
        constraints: true,
        as: "author",
        scope: {
          role: "writer",
        },
      });
      Article.belongsTo(models.User, {
        foreignKey: "editorId",
        constraints: true,
        as: "editor",
        scope: {
          role: "editor",
        },
      });
    }
  }
  Article.init(
    {
      name: DataTypes.TEXT,
      slug: DataTypes.TEXT,
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM(
          "draft",
          "pending",
          "rejected",
          "approved",
          "posted"
        ),
        allowNull: false,
        defaultValue: "draft",
      },
      imgCover: DataTypes.TEXT,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
      nLike: DataTypes.INTEGER,
      nComment: DataTypes.INTEGER,
      nView: DataTypes.INTEGER,
      nViewWeek: DataTypes.INTEGER,
      nViewMonth: DataTypes.INTEGER,
      approve: DataTypes.DATE,
      reviewComment: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
