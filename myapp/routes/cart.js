const express = require('express');
const CartController = require('../controllers/CartController');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  CartController.getCart(req, res);
});

module.exports = router;