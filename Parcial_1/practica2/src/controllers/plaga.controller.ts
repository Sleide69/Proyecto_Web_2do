import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { Plaga } from "../entities/Plaga";

const repo = appDataSource.getRepository(Plaga);

export const getPlagas = async (_req: Request, res: Response) => {
  const plagas = await repo.find();
  res.json(plagas);
};

export const createPlaga = async (req: Request, res: Response) => {
  const nueva = repo.create(req.body);
  await repo.save(nueva);
  res.status(201).json(nueva);
};

export const updatePlaga = async (req: Request, res: Response) => {
  const plaga = await repo.findOneBy({ id: Number(req.params.id) });
  if (!plaga) return res.status(404).json({ msg: "Plaga no encontrada" });
  repo.merge(plaga, req.body);
  await repo.save(plaga);
  res.json(plaga);
};

export const deletePlaga = async (req: Request, res: Response) => {
  const result = await repo.delete(req.params.id);
  res.json(result);
};
