import mongoose from "mongoose";
import { settings } from "@src/config/settings";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(settings.mongoUri as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;