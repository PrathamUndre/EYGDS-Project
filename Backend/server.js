require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const connectDB = require("./config/db"); // Import DB connection
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes"); // Import recipe routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "https://eygds-project.onrender.com", // ✅ Update with your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes); // Use recipe routes

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
