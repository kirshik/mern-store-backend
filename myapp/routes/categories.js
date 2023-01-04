const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  // validatons
  next();
});

router.get('/', (req, res) => {
  CategoriesController.getAllCategories(req, res);
});
router.get('/:id', (req, res) => {
  CategoriesController.getCategory(req, res);
});

module.exports = router;