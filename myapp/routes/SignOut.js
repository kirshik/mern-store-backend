const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get("/", (req, res) => {
  UserController.signOutUser(req, res);
});

module.exports = router;