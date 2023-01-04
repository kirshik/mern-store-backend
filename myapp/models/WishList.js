const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const WishList = sequelize.define("wish_list", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: { type: DataTypes.INTEGER, foreignKey: true }
}, {
  tableName: "wish_list",
  freezeTableName: true,
  timestamps: false
});

module.exports = WishList;