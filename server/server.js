const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
    return;
  }
  console.log('✅ MySQL Connected!');
});

// Make DB available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Cart API
app.post('/api/cart/add', (req, res) => {
  const { userId, itemName, quantity } = req.body;
  if (!userId || !itemName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO cart (user_id, item_name, quantity) VALUES (?, ?, ?)';
  db.query(sql, [userId, itemName, quantity || 1], (err) => {
    if (err) return res.status(500).json({ error: 'Error adding item to cart' });
    res.status(200).json({ message: 'Item added to cart' });
  });
});

app.get('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching cart' });
    res.json(results);
  });
});

app.put('/api/cart/update', (req, res) => {
  const { cartId, quantity } = req.body;
  if (!cartId || quantity == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId], (err) => {
    if (err) return res.status(500).json({ error: 'Error updating cart' });
    res.json({ message: 'Cart updated' });
  });
});

app.delete('/api/cart/remove/:cartId', (req, res) => {
  const { cartId } = req.params;
  db.query('DELETE FROM cart WHERE id = ?', [cartId], (err) => {
    if (err) return res.status(500).json({ error: 'Error deleting cart item' });
    res.json({ message: 'Item removed from cart' });
  });
});

// Fallback route (for non-API frontend requests only)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
