const Products = require("../models/Product.js");

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await Products.findAll();
      res.status(201).send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getTopProducts(req, res) {
    const setLimit = Number(req.params.limit);
    try {
      const products = await Products.findAll({ limit: setLimit, order: [['rating', 'desc']] });
      res.status(201).send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getTopProductsOfCategory(req, res) {
    const id = req.params.id;
    const setLimit = Number(req.params.limit);
    try {
      const products = await Products.findAll({ limit: setLimit, where: { category_id: id }, order: [['rating', 'desc']] });
      res.status(201).send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getProduct(req, res) {
    const id = req.params.id;
    try {
      const product = await Products.findByPk(id);
      res.status(201).send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getProductsOfCategory(req, res) {
    const id = req.params.id;
    try {
      const products = await Products.findAll({ where: { category_id: id } });
      res.status(201).send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getAllProductsId(req, res) {
    try {
      const products = await Products.findAll({ attributes: ["id"] });
      const result = products.map((obj) => { return obj.id });
      res.status(201).send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
}