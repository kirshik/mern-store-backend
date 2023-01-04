const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const CartDetails = sequelize.define("cart_details", {
  cart_id: { type: DataTypes.INTEGER, foreignKey: true },
  product_id: { type: DataTypes.INTEGER, foreignKey: true },
  quantity: DataTypes.INTEGER,
  discount: DataTypes.DECIMAL(10, 2)
}, {
  tableName: "cart_details",
  freezeTableName: true,
  timestamps: false
});

module.exports = CartDetails;