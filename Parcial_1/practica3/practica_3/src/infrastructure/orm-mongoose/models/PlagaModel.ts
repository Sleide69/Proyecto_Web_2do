import mongoose from 'mongoose';

const PlagaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
});

export const PlagaModel = mongoose.model('Plaga', PlagaSchema);
