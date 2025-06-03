import { Schema, model } from "mongoose";

const PlagaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo: { type: String, required: true },
});

export const PlagaModel = model("Plaga", PlagaSchema);
