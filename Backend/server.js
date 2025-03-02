
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  method: String,
  image: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/recipes", upload.single("image"), async (req, res) => {
  try {
    const { name, ingredients, method } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newRecipe = new Recipe({ name, ingredients: JSON.parse(ingredients), method, image });
    await newRecipe.save();
    res.json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/recipes/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, ingredients, method } = req.body;
    let updateData = { name, ingredients: JSON.parse(ingredients), method };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use auth routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
