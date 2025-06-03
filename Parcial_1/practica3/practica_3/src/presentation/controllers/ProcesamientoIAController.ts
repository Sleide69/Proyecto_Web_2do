import { Request, Response } from "express";
import { ProcesamientoIAService } from "../../application/services/ProcesamientoIAService";

export class ProcesamientoIAController {
  constructor(private iaService: ProcesamientoIAService) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const procesado = await this.iaService.obtenerPorCaptura(req.body);
      res.status(201).json(procesado);
    } catch (error) {
      res.status(500).json({ error: "Error al crear procesamiento IA" });
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    try {
      const resultados = await this.iaService.listarProcesamientos();
      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({ error: "Error al listar procesamiento IA" });
    }
  }
}
