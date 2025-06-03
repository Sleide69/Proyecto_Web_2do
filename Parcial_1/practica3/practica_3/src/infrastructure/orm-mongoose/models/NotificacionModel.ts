import mongoose from 'mongoose';

const NotificacionSchema = new mongoose.Schema({
  mensaje: String,
  usuarioEmail: String,
  fecha: Date,
});

export const NotificacionModel = mongoose.model('Notificacion', NotificacionSchema);
