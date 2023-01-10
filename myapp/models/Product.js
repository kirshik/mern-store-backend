const sequelize = require("../database/database.js");
const { DataTypes } = require("sequelize");
const CartDetails = require("./CartDetails.js");
const WishListDetails = require("./WishListDetails.js");

const Products = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING(100),
  price: DataTypes.DECIMAL(10, 2),
  description: DataTypes.STRING,
  additional_info: DataTypes.STRING,
  images_urls: DataTypes.STRING,
  is_in_storage: DataTypes.BOOLEAN,
  rating: DataTypes.INTEGER(1, 10),
  category_id: { type: DataTypes.INTEGER, foreignKey: true }
}, {
  tableName: "product",
  freezeTableName: true,
  timestamps: false
});
Products.belongsTo(CartDetails, { foreignKey: "id", targetKey: "product_id" });
Products.belongsTo(WishListDetails, { foreignKey: "id", targetKey: "product_id" });


module.exports = Products;