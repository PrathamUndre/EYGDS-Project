const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create a recipe (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, ingredients, method, image } = req.body;

    if (!name || !ingredients?.length || !method) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRecipe = new Recipe({
      name,
      ingredients,
      method,
      image,
      user: req.user.id, // Associate recipe with the logged-in user
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name");
    res.json(recipes);
  } catch (error) {
    console.error("❌ Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("❌ Error fetching recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Update a recipe (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, ingredients, method, image } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this recipe" });
    }

    // Update only provided fields
    Object.assign(recipe, { name, ingredients, method, image });

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    console.error("❌ Error updating recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Delete a recipe (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this recipe" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
