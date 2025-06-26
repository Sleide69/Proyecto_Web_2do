import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { Notificacion } from "../entities/Notificacion";

const repo = appDataSource.getRepository(Notificacion);

export const getNotificaciones = async (_req: Request, res: Response) => {
  const notis = await repo.find({ relations: ["ia"] });
  res.json(notis);
};

export const marcarComoLeida = async (req: Request, res: Response) => {
  const noti = await repo.findOneBy({ id: Number(req.params.id) });
  if (!noti) return res.status(404).json({ msg: "No encontrada" });
  noti.leido = true;
  await repo.save(noti);
  res.json(noti);
};
