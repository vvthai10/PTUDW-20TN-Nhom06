"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryArticle.belongsTo(models.Article, { foreignKey: "articleId" });
      CategoryArticle.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
      });
    }
  }
  CategoryArticle.init(
    {},
    {
      sequelize,
      modelName: "CategoryArticle",
    }
  );
  return CategoryArticle;
};
