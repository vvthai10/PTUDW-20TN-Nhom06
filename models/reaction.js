"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.hasMany(models.Notification, { foreignKey: "reactionId" });
      Reaction.belongsTo(models.Article, { foreignKey: "articleId" });
      Reaction.belongsTo(models.User, { foreignKey: "userId" });
      // Reaction.belongsTo(models.Comment, { foreignKey: "commentId" });
    }
  }
  Reaction.init(
    {
      type: {
        type: DataTypes.ENUM("article", "comment"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reaction",
    }
  );
  return Reaction;
};
