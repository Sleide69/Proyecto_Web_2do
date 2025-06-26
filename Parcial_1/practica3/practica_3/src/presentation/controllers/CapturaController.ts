import { Request, Response } from "express";
import { CapturaService } from "../../application/services/CapturaService";

export class CapturaController {
  constructor(private capturaService: CapturaService) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const captura = await this.capturaService.capturasPorPlaga(req.body);
      res.status(201).json(captura);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la captura" });
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    try {
      const capturas = await this.capturaService.listarCapturas();
      res.status(200).json(capturas);
    } catch (error) {
      res.status(500).json({ error: "Error al listar capturas" });
    }
  }
}
