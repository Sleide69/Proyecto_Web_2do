import { Schema, model } from "mongoose";

const NotificacionSchema = new Schema({
  mensaje: { type: String, required: true },
  fecha: { type: Date, required: true },
  destinatario: { type: String, required: true },
  enviada: { type: Boolean, default: false },
  capturaId: { type: String, required: true },
});

export const NotificacionModel = model("Notificacion", NotificacionSchema);
