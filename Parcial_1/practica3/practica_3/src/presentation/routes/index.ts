import { Router } from "express";
import plagaRoutes from "./plaga.routes";
import capturaRoutes from "./captura.routes";
import notificacionRoutes from "./notificacion.routes";
import procesamientoIARoutes from "./procesamientoIA.routes";

const router = Router();

router.use("/plagas", plagaRoutes);
router.use("/capturas", capturaRoutes);
router.use("/notificaciones", notificacionRoutes);
router.use("/procesamiento", procesamientoIARoutes);

export default router;
