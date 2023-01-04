const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");

const ShipmentInfo = sequelize.define("shipment_info", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  country: DataTypes.STRING(50),
  city: DataTypes.STRING(50),
  streer: DataTypes.STRING(50),
  appartment: DataTypes.STRING,
  zip_code: DataTypes.STRING(20),
  phone: DataTypes.STRING(10)
}, {
  tableName: "shipment_info",
  freezeTableName: true,
  timestamps: false
});

module.exports = ShipmentInfo;