"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ActivityHistory.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  ActivityHistory.init(
    {
      type: {
        type: DataTypes.ENUM("comment", "like_comment", "like_article"),
        allowNull: false,
      },
      resourceLink: DataTypes.STRING,
      ownerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ActivityHistory",
    }
  );
  return ActivityHistory;
};
