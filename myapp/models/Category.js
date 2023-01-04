const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING(50),
  description: DataTypes.STRING
}, {
  tableName: "category",
  freezeTableName: true,
  timestamps: false
});

module.exports = Category;