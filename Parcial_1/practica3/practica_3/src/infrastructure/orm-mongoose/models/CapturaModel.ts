import { Schema, model } from "mongoose";

const CapturaSchema = new Schema({
  fecha: { type: Date, required: true },
  urlImagen: { type: String, required: true },
  ubicacion: { type: String, required: true },
  plagaId: { type: Number, required: true },
});

export const CapturaModel = model("Captura", CapturaSchema);
