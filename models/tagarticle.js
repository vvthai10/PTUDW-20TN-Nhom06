"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TagArticle.belongsTo(models.Article, { foreignKey: "articleId" });
      TagArticle.belongsTo(models.Tag, { foreignKey: "tagId" });
    }
  }
  TagArticle.init(
    {},
    {
      sequelize,
      modelName: "TagArticle",
    }
  );
  return TagArticle;
};
