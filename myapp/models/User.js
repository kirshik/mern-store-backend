const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: DataTypes.STRING(60),
  first_name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  password: DataTypes.STRING,
  birth_date: DataTypes.DATE
}, {
  tableName: "user",
  freezeTableName: true,
  timestamps: false
});

module.exports = User;