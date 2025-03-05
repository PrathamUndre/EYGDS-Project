const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/recipeDB";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected:", mongoose.connection.host);
    
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true); // Logs queries in dev mode
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
