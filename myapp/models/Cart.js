const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");
const CartDetails = require("./CartDetails.js");


const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: { type: DataTypes.INTEGER, foreignKey: true },
  total: DataTypes.DECIMAL(10, 2)
}, {
  tableName: "cart",
  freezeTableName: true,
  timestamps: false
});


module.exports = Cart;