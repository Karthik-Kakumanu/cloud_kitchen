const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Get all users (Admin dashboard)
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ totalUsers: results.length, users: results });
  });
});

// ✅ Get user details by ID (for checkout auto-fill)
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT id, name, phone FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user by ID:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
