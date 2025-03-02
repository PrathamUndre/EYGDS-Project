const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a recipe (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("🔹 Create Recipe Request:", req.body);
    const { name, ingredients, method, image } = req.body;
    if (!name || !ingredients || !method) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const recipe = new Recipe({ name, ingredients, method, image, user: req.user.id });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    res.status(500).json({ message: "Error creating recipe" });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    console.log("🔹 Fetching all recipes...");
    const recipes = await Recipe.find().populate("user", "name");
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

module.exports = router;

