const express = require('express');
const SearchController = require('../controllers/SearchController');
const router = express.Router();

// middleware
router.use((req, res, next) => {
  next();
});

router.get('/:request', (req, res) => {
  SearchController.search(req, res);
});
module.exports = router;