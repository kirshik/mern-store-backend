const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const OrderDetails = sequelize.define("order_details", {
  order_id: { type: DataTypes.INTEGER, foreignKey: true },
  product_id: { type: DataTypes.INTEGER, foreignKey: true },
  quantity: DataTypes.INTEGER
}, {
  tableName: "order_details",
  freezeTableName: true,
  timestamps: false
});
module.exports = OrderDetails;