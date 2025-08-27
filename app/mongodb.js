// lib/mongodb.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://project:project123@cluster1.zw52n.mongodb.net/getmecoin?retryWrites=true&w=majority";

let isConnected = false; // global flag

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // optional
  }
};
