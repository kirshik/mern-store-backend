const express = require('express');
const UserController = require('../controllers/UserController');
const userValidator = require('../validators/userValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  userValidator.validateSignIn(req, res, next);
  next();
});

router.post('/', (req, res) => {
  UserController.signInUser(req, res);
});

module.exports = router;