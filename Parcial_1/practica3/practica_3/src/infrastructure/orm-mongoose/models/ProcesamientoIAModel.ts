import mongoose from 'mongoose';

const ProcesamientoIASchema = new mongoose.Schema({
  capturaId: Number,
  resultado: String,
  modeloUsado: String,
  fecha: Date,
});

export const ProcesamientoIAModel = mongoose.model('ProcesamientoIA', ProcesamientoIASchema);
