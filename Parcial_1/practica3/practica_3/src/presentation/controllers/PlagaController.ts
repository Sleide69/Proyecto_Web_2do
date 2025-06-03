import { Request, Response } from "express";
import { PlagaService } from "../../application/services/PlagaService";

export class PlagaController {
  constructor(private plagaService: PlagaService) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const nuevaPlaga = await this.plagaService.crear(req.body);
      res.status(201).json(nuevaPlaga);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la plaga" });
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    try {
      const plagas = await this.plagaService.listar();
      res.status(200).json(plagas);
    } catch (error) {
      res.status(500).json({ error: "Error al listar plagas" });
    }
  }
}
