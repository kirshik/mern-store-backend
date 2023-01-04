const Category = require('../models/Category.js');

module.exports = {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(201).send(categories);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async getCategory(req, res) {
    const id = req.params.id;
    try {
      const category = await Category.findByPk(id);
      res.status(201).send(category);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
};
