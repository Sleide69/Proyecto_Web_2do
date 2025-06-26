import { Router } from "express";
import { NotificacionController } from "../controllers/NotificacionController";
import { NotificacionService } from "../../application/services/NotificacionService";
import { NotificacionRepositoryTypeORM } from "../../infrastructure/orm-typeorm/repositories/TypeOrmNotificacionRepository";
import { NotificacionRepositoryMongoose } from "../../infrastructure/orm-mongoose/repositories/MongooseNotificacionRepository";

const router = Router();

const repo = process.env.DB_TYPE === "mongoose"
  ? new NotificacionRepositoryMongoose()
  : new NotificacionRepositoryTypeORM();

const controller = new NotificacionController(new NotificacionService(repo));

router.post("/", controller.crear);
router.get("/", controller.listar);

export default router;
