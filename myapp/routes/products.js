const express = require('express');
const ProductController = require('../controllers/ProductController');
var router = express.Router();

// middleware 
router.use((req, res, next) => {
  //validations
  console.log(req.originalUrl);
  next();
});

// routes
router.get('/', (req, res) => {
  ProductController.getAllProducts(req, res);
});
router.get('/ids', (req, res) => {
  ProductController.getAllProductsId(req, res);
});
router.get('/:id', (req, res) => {
  ProductController.getProduct(req, res);
});
router.get('/categories/:id', (req, res) => {
  ProductController.getProductsOfCategory(req, res);
});


// top route
router.get('/top/:limit', (req, res) => {
  ProductController.getTopProducts(req, res);
});
router.get('/top/:limit/:id', (req, res) => {
  ProductController.getTopProductsOfCategory(req, res);
});

module.exports = router;