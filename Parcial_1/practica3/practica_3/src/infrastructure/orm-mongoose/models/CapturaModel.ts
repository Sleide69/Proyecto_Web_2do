import mongoose from 'mongoose';

const CapturaSchema = new mongoose.Schema({
  imagenUrl: String,
  fecha: Date,
  plagaId: Number,
});

export const CapturaModel = mongoose.model('Captura', CapturaSchema);
