const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.uid; // Token stored in cookies

  if (!token) {
    // Send JSON response for unauthorized access
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, "Sanika$123@$");
    req.userId = decoded._id; // Attach user ID to the request object
    next();
  } catch (error) {
    // If token verification fails, send JSON response
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authenticateUser;
