const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// ✅ Protected route - get user profile
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
