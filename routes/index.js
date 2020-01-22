const express = require('express');
// Controllers
const butlerCtrl = require('../controllers/butler');

const router = express.Router();

/**
 * Routes
 */
router.post('/job-allocation', butlerCtrl.allocateAndReport)

module.exports = router;
