const Category = require("../models/Category");
const Products = require("../models/Product");
const { Op } = require("sequelize");

module.exports = {
  async searchCategories(req, res) {
    try {
      const request = req.params.request;
      const categories = await Category.findAll({
        where: {
          name: { [Op.like]: `${request}%` }
        }
      })
      return categories;
    } catch (e) {
      console.log(e);
      return e;
    }

  },
  async searchProducts(req, res) {
    try {
      const request = req.params.request;
      const products = await Products.findAll({
        where: {
          name: { [Op.like]: `%${request}%` }
        }
      })
      console.log("products", products)
      return products;
    } catch (e) {
      console.log(e);
      return e;
    }

  },
  async search(req, res) {
    try {
      const resultCategory = await this.searchCategories(req, res);
      const resultProducts = await this.searchProducts(req, res);
      res.status(200).send({ categories: resultCategory, products: resultProducts });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  }
}