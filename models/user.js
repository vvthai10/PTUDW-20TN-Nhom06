"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Payment, { foreignKey: "userId" });
      User.hasMany(models.ActivityHistory, { foreignKey: "userId" });
      User.hasMany(models.Article, { foreignKey: "authorId", as: "author" });
      User.hasMany(models.Article, { foreignKey: "editorId", as: "editor" });
      User.belongsToMany(models.Article, {
        through: "Reaction",
        foreignKey: "userId",
        otherKey: "articleId",
      });
      // User.belongsToMany(models.Comment, {
      //   through: "Reaction",
      //   foreignKey: "userId",
      //   otherKey: "commentId",
      // });
      User.belongsToMany(models.Article, {
        through: "Comment",
        foreignKey: "userId",
        otherKey: "articleId",
      });
      User.belongsToMany(models.SubCategory, {
        through: "CategoryAssignment",
        foreignKey: "userId",
        otherKey: "subCategoryId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      birth: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "default.jpg",
      },
      role: {
        type: DataTypes.ENUM("default", "premium", "writer", "editor", "admin"),
        allowNull: false,
        defaultValue: "default",
      },
      sex: {
        type: DataTypes.ENUM("male", "female", "diff"),
      },
      password: DataTypes.STRING,
      passwordChangeAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      activate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      googleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
