const express = require('express');
const cookieValidator = require('../validators/cookieValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  cookieValidator.validateCookie(req, res, next);
});

router.get('/', (req, res) => {
  res.status(200).send("User Data");
});

module.exports = router;