"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Payment.init(
    {
      amount: DataTypes.FLOAT,
      type: {
        type: DataTypes.ENUM("1", "2", "3"),
        allowNull: false,
      },
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
