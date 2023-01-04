const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const OrderData = sequelize.define("order_data", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: DataTypes.DATE,
  total: DataTypes.DECIMAL(10, 2),
  status: DataTypes.STRING(20),
  shipment_id: { type: DataTypes.INTEGER, foreignKey: true },
  user_id: { type: DataTypes.INTEGER, foreignKey: true }
}, {
  tableName: "order_data",
  freezeTableName: true,
  timestamps: false
});

module.exports = OrderData;