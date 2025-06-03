// src/infrastructure/mongoose/models/ProcesamientoIAModel.ts
import mongoose from "mongoose";

const ProcesamientoIASchema = new mongoose.Schema({
  capturaId: { type: String, required: true },
  resultado: { type: String, required: true },
  confianza: { type: Number, required: true },
  modeloUsado: { type: String, required: true },
  fechaProcesamiento: { type: Date, required: true }
});

export const ProcesamientoIAModel = mongoose.model("ProcesamientoIA", ProcesamientoIASchema);
