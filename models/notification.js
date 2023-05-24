"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Reaction, { foreignKey: "reactionId" });
    }
  }
  Notification.init(
    {
      status: {
        type: DataTypes.ENUM("read", "unread"),
        allowNull: false,
        defaultValue: "unread",
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
