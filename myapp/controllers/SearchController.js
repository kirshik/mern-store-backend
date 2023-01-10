const Category = require("../models/Category");
const Products = require("../models/Product");

module.exports = {
  async searchCategories(req, res) {
    try {
      const request = req.params.request;
      const categories = await Category.find({
        name: {
          $regex: request,
          $options: "i"
        }
      })
      return categories;
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }

  },
  async searchProducts(req, res) {
    try {
      const request = req.params.request;
      const products = await Products.find({
        name: {
          $regex: request,
          $options: "i"
        }
      })
      return products;
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }

  },
  async search(req, res) {
    try {
      const resultCategory = this.searchCategories(req, res);
      const resultProducts = this.searchProducts(req, res);
      res.status(200).send({ categories: resultCategory, products: resultProducts });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  }
}