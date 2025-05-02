const express = require('express');
const router = express.Router();
const db = require('../db'); // ✅ Your database connection
const authenticate = require('../middleware/authMiddleware'); // ✅ Import auth middleware

// Create a new order (POST /api/orders)
router.post('/', authenticate, (req, res) => { // ✅ Protected route
  const {
    address,
    pincode,
    paymentMethod,
    items,
    totalAmount
  } = req.body;

  const userId = req.userId; // ✅ Take userId from token (middleware attached it)

  if (!userId || !address || !pincode || !paymentMethod || !items || !totalAmount) {
    return res.status(400).json({ error: 'Please fill all required fields' });
  }

  const query = `
    INSERT INTO orders (user_id, address, pincode, payment_method, items, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;

  const values = [
    userId,
    address,
    pincode,
    paymentMethod,
    JSON.stringify(items.map(item => ({
      name: item.name,
      quantity: item.quantity
    }))),
    totalAmount
  ];
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      return res.status(500).json({ error: 'Order creation failed' });
    }
    res.status(201).json({ message: 'Order created', orderId: result.insertId });
  });
});

// ✅ (Optional) You can add another route to GET orders later if you want

module.exports = router;
