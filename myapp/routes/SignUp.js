const express = require('express');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  // validatons
  next();
});

router.post('/', (req, res) => {
  UserController.addUser(req, res);
});

module.exports = router;