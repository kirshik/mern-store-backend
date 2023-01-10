const express = require('express');
const WishListController = require('../controllers/WishListController');
const cookieValidator = require('../validators/cookieValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  cookieValidator.validateCookie(req, res, next);
});

router.get('/', (req, res) => {
  CartController.getCart(req, res);
});
router.delete('/delete', (req, res) => {
  CartController.removeFromCart(req, res);
});
router.post('/add', (req, res) => {
  CartController.addToCart(req, res);
});


module.exports = router;