const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  // validatons
  next();
});

router.post('/', (req, res) => {
  UserController.signInUser(req, res);
});

module.exports = router;