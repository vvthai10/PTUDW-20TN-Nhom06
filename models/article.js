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
      Article.belongsToMany(models.User, {
        through: "Comment",
        foreignKey: "articleId",
        otherKey: "userId",
      });
    }
  }
  Article.init(
    {
      name: DataTypes.STRING,
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
      imgCover: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      nLike: DataTypes.INTEGER,
      nComment: DataTypes.INTEGER,
      nView: DataTypes.INTEGER,
      nViewWeek: DataTypes.INTEGER,
      nViewMonth: DataTypes.INTEGER,
      approve: DataTypes.DATE,
      reviewComment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
