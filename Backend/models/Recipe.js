

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Recipe name is required"] },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
        },
        message: "Invalid image URL format",
      },
    },
    ingredients: {
      type: [{ type: String, required: true }],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one ingredient is required",
      },
      default: [],
    },
    method: { type: String, required: [true, "Recipe method is required"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures every recipe is linked to a user
      index: true, // Indexing for performance
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
