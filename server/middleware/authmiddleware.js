const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Save the user's ID inside request
    next(); // move to next middleware/route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;
