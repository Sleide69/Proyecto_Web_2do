import { Router } from "express";
import { CapturaController } from "../controllers/CapturaController";
import { CapturaService } from "../../application/services/CapturaService";
import { CapturaRepositoryTypeORM } from "../../infrastructure/orm-typeorm/repositories/TypeOrmCapturaRepository";
import { CapturaRepositoryMongoose } from "../../infrastructure/orm-mongoose/repositories/MongooseCapturaRepository";

const router = Router();

const repo = process.env.DB_TYPE === "mongoose"
  ? new CapturaRepositoryMongoose()
  : new CapturaRepositoryTypeORM();

const controller = new CapturaController(new CapturaService(repo));

router.post("/", controller.crear);
router.get("/", controller.listar);

export default router;
