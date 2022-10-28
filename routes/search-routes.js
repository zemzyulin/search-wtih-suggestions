const express = require('express');
const router = express.Router();

const { validateQuery } = require('../utils/utils');
const { find, findAll } = require('../controllers/search-controller');

router.get('/suggestions', validateQuery, find);
router.get('/', validateQuery, findAll);

module.exports = router;