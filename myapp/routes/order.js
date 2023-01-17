const express = require('express');
const OrderController = require('../controllers/OrderController');
const cookieValidator = require('../validators/cookieValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  cookieValidator.validateCookie(req, res, next);
});

router.get('/', (req, res) => {
  OrderController.getOrderDetails(req, res);
  console.log("get order details");
});
router.post("/", (req, res) => {
  OrderController.createOrder(req, res);
});

module.exports = router;