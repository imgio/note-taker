const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Fetch only the username field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
