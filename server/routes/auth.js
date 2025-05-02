const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ✅ SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const checkQuery = 'SELECT * FROM users WHERE phone = ?';
    req.db.query(checkQuery, [phone], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length > 0) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (name, phone, password) VALUES (?, ?, ?)';
      req.db.query(insertQuery, [name, phone, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: 'Error creating user' });
        return res.status(201).json({ message: 'User created successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup error', error });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  const query = 'SELECT * FROM users WHERE phone = ?';
  req.db.query(query, [phone], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid phone or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ RETURN TOKEN AND userId TO FRONTEND
    return res.status(200).json({
      message: 'Login successful',
      token,
      userId: user.id
    });
  });
});

module.exports = router;
