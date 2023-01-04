const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const WishListDetails = sequelize.define("wish_list_details", {
  wish_list_id: { type: DataTypes.INTEGER, foreignKey: true },
  product_id: { type: DataTypes.INTEGER, foreignKey: true }
}, {
  tableName: "wish_list_details",
  freezeTableName: true,
  timestamps: false
});

module.exports = WishListDetails;
