// Upgraded menu.js ✅
const express = require('express');
const router = express.Router();

// Add new menu item (Admin side)
router.post('/add', (req, res) => {
  const { name, description, price, category, image, isVeg } = req.body;

  if (!name || !description || !price || !category || typeof isVeg === 'undefined') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertQuery = 'INSERT INTO menu (name, description, price, category, image, isVeg) VALUES (?, ?, ?, ?, ?, ?)';

  req.db.query(insertQuery, [name.trim(), description.trim(), price, category.trim(), image?.trim() || '', isVeg], (err, result) => {
    if (err) {
      console.error('[Menu Add Error]:', err);
      return res.status(500).json({ message: 'Internal server error while adding menu item.' });
    }
    res.status(201).json({ message: 'Menu item added successfully!', menuItemId: result.insertId });
  });
});

// Get all menu items (Frontend side)
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM menu ORDER BY id DESC';

  req.db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('[Menu Fetch Error]:', err);
      return res.status(500).json({ message: 'Failed to fetch menu items.' });
    }
    res.status(200).json(results);
  });
});

// Delete menu item by ID (Admin side)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Menu item ID is required for deletion.' });
  }

  const deleteQuery = 'DELETE FROM menu WHERE id = ?';

  req.db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('[Menu Delete Error]:', err);
      return res.status(500).json({ message: 'Server error while deleting menu item.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully!' });
  });
});

module.exports = router;
