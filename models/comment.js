"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Article, { foreignKey: "articleId" });
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      // Comment.belongsToMany(models.User, {
      //   through: "Reaction",
      //   foreignKey: "commentId",
      //   otherKey: "userId",
      // });
      // Comment.belongsToMany(models.Article, {
      //   through: "Reaction",
      //   foreignKey: "commentId",
      //   otherKey: "articleId",
      // });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
