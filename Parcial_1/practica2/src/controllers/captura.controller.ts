import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { Captura } from "../entities/Captura";
import { detectarPlaga } from "../services/detector";
import { ProcesamientoIA } from "../entities/ProcesamientoIA";
import { Notificacion } from "../entities/Notificacion";

const capturaRepo = appDataSource.getRepository(Captura);
const iaRepo = appDataSource.getRepository(ProcesamientoIA);
const notiRepo = appDataSource.getRepository(Notificacion);

export const crearCaptura = async (req: Request, res: Response) => {
  const { imagen, fecha } = req.body;
  const captura = capturaRepo.create({ imagen, fecha: new Date(fecha) });
  await capturaRepo.save(captura);

  // Procesar con IA
  const resultado = detectarPlaga(imagen);
  const ia = iaRepo.create({
    captura,
    ...resultado,
    procesado_en: new Date()
  });
  await iaRepo.save(ia);

  // Notificación
  const mensaje = `Se detectó ${ia.plaga_detectada} con ${ia.confianza}% de certeza. Solución: ${ia.solucion}`;
  const noti = notiRepo.create({
    ia,
    mensaje,
    leido: false,
    enviada_en: new Date()
  });
  await notiRepo.save(noti);

  res.status(201).json({ captura, ia, notificacion: noti });
};
