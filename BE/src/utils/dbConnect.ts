import mongoose from "mongoose";

export const connectToDb = async (): Promise<void> => {
   try {
      await mongoose.connect(process.env.MONGODB_CONNECTION!);
      console.log("Connected to database!");
   } catch (error) {
      console.error("Error connecting to database:", error);
      throw error; // Re-throw to handle in the app startup
   }
};
