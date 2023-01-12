const express = require('express');
const WishListController = require('../controllers/WishListController');
const cookieValidator = require('../validators/cookieValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  console.log(req.session)
  cookieValidator.validateCookie(req, res, next);
});

router.get('/', (req, res) => {
  WishListController.getWishList(req, res);
});
router.delete('/delete', (req, res) => {
  WishListController.removeFromWishList(req, res);
});
router.post('/add', (req, res) => {
  WishListController.addToWishList(req, res);
});


module.exports = router;