import { Request, Response } from "express";
import { NotificacionService } from "../../application/services/NotificacionService";

export class NotificacionController {
  constructor(private notificacionService: NotificacionService) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const notificacion = await this.notificacionService.crearNotificacion(req.body);
      res.status(201).json(notificacion);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la notificación" });
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    try {
      const notificaciones = await this.notificacionService.listarNotificaciones();
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: "Error al listar notificaciones" });
    }
  }
}
