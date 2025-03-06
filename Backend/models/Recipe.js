const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Recipe name is required"], 
      trim: true 
    },

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
      type: [String], // Simplified array definition
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one ingredient is required",
      },
    },

    method: { 
      type: String, 
      required: [true, "Recipe method is required"], 
      trim: true 
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Indexed for better query performance
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
