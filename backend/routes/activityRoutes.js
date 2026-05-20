const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/watch', authenticateToken, activityController.recordWatch);
router.get('/diary', authenticateToken, activityController.getDiary);

module.exports = router;