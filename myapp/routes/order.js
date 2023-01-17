const express = require('express');
const cookieValidator = require('../validators/cookieValidator');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  cookieValidator.validateCookie(req, res, next);
});

router.get('/', (req, res) => {

});

module.exports = router;