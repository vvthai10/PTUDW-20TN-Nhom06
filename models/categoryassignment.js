"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryAssignment.belongsTo(models.User, { foreignKey: "userId" });
      CategoryAssignment.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
      });
    }
  }
  CategoryAssignment.init(
    {},
    {
      sequelize,
      modelName: "CategoryAssignment",
    }
  );
  return CategoryAssignment;
};
