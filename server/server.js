const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Added for frontend

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders'); // ✅ Added orders route

dotenv.config(); // ✅ Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ MySQL Connected!');
});

// Make db accessible to all routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Serve static frontend files (checkout.html, login.html, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // ✅ ADDED

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes); // ✅ Orders routes here

// ✅✅✅ CART API START ✅✅✅

// Add item to cart
app.post('/api/cart/add', (req, res) => {
    const { userId, itemName, quantity } = req.body;

    if (!userId || !itemName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO cart (user_id, item_name, quantity) VALUES (?, ?, ?)';
    db.query(sql, [userId, itemName, quantity || 1], (err, result) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            return res.status(500).json({ error: 'Error adding item to cart' });
        }
        res.status(201).json({ message: 'Item added to cart successfully' });
    });
});

// Get all cart items for a user
app.get('/api/cart/:userId', (req, res) => {
    const { userId } = req.params;

    const sql = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching cart items:', err);
            return res.status(500).json({ error: 'Error fetching cart items' });
        }
        res.status(200).json(results);
    });
});

// Update quantity of an item in cart
app.put('/api/cart/update', (req, res) => {
    const { cartId, quantity } = req.body;

    if (!cartId || quantity == null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
    db.query(sql, [quantity, cartId], (err, result) => {
        if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).json({ error: 'Error updating cart' });
        }
        res.status(200).json({ message: 'Cart item updated successfully' });
    });
});

// Remove an item from cart
app.delete('/api/cart/remove/:cartId', (req, res) => {
    const { cartId } = req.params;

    const sql = 'DELETE FROM cart WHERE id = ?';
    db.query(sql, [cartId], (err, result) => {
        if (err) {
            console.error('Error deleting cart item:', err);
            return res.status(500).json({ error: 'Error deleting cart item' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully' });
    });
});

// ✅✅✅ CART API END ✅✅✅

// Test route
app.get('/', (req, res) => {
    res.send('✅ Delicios Server Running!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Something broke:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// For SPA fallback (if using React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/intro.html'));
});
