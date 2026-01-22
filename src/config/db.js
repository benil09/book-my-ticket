import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
   
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
