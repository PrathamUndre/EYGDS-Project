const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Attach user ID to request (reduce unnecessary DB queries)
    // req.user = { id: decoded.id };

    // Optional: Verify user exists (uncomment if needed)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
