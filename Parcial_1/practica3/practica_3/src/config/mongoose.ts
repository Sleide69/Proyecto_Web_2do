import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error en Mongo:", err);
  }
}
