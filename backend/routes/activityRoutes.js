const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/watch', activityController.recordWatch);

module.exports = router;