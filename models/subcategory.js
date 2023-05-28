"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.belongsTo(models.Category, { foreignKey: "categoryId" });
      SubCategory.belongsToMany(models.Article, {
        through: "CategoryArticle",
        foreignKey: "subCategoryId",
        otherKey: "articleId",
      });
      SubCategory.belongsToMany(models.User, {
        through: "CategoryAssignment",
        foreignKey: "subCategoryId",
        otherKey: "userId",
      });
    }
  }
  SubCategory.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
