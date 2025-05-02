const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');
require('dotenv').config();

const authenticate = require('../middleware/authmiddleware');

// Signup
router.post('/signup', async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const checkQuery = 'SELECT * FROM users WHERE phone = ?';
  db.query(checkQuery, [phone], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (name, phone, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, phone, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating user' });
        return res.status(201).json({ message: 'Account created successfully' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password required' });
  }

  const loginQuery = 'SELECT * FROM users WHERE phone = ?';
  db.query(loginQuery, [phone], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Phone number not registered' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

// Profile (Protected Route)
router.get('/profile', authenticate, (req, res) => {
  const userId = req.userId;
  res.json({ message: 'Your user id is', userId });
});

module.exports = router;
