const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const categoryValidator = require('../validators/categoryValidator');
const router = express.Router();

// middleware
router.get('/:id', (req, res, next) => {
  categoryValidator.validateId(req, res, next);
  next();
});

router.get('/', (req, res) => {
  CategoriesController.getAllCategories(req, res);
});
router.get('/:id', (req, res) => {
  CategoriesController.getCategory(req, res);
});

module.exports = router;