import { Request, Response } from "express";
import { appDataSource } from "../config/data-source";
import { ProcesamientoIA } from "../entities/ProcesamientoIA";

const repo = appDataSource.getRepository(ProcesamientoIA);

export const getProcesamientos = async (_req: Request, res: Response) => {
  const result = await repo.find({ relations: ["captura"] });
  res.json(result);
};
