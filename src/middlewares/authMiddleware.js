const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi JWT token
const verifyToken = (req, res, next) => {
  // UNCOMMENT BLOCK INI KETIKA SUDAH INTEGRASI DENGAN LOGIN
  /*
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
  */

  // TEMPORARY: Skip authentication for now
  next();
};

// Middleware untuk verifikasi role (opsional)
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // UNCOMMENT BLOCK INI KETIKA SUDAH INTEGRASI DENGAN LOGIN
    /*
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
    */

    // TEMPORARY: Skip role checking for now
    next();
  };
};

module.exports = {
  verifyToken,
  checkRole
};

