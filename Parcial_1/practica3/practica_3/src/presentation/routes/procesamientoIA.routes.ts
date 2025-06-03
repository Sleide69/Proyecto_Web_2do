import { Router } from "express";
import { ProcesamientoIAController } from "../controllers/ProcesamientoIAController";
import { ProcesamientoIAService } from "../../application/services/ProcesamientoIAService";
import { ProcesamientoIARepositoryTypeORM } from "../../infrastructure/orm-typeorm/repositories/TypeOrmProcesamientoIARepository";
import { ProcesamientoIARepositoryMongoose } from "../../infrastructure/orm-mongoose/repositories/MongooseProcesamientoIARepository";

const router = Router();

const repo = process.env.DB_TYPE === "mongoose"
  ? new ProcesamientoIARepositoryMongoose()
  : new ProcesamientoIARepositoryTypeORM();

const controller = new ProcesamientoIAController(new ProcesamientoIAService(repo));

router.post("/", controller.crear);
router.get("/", controller.listar);

export default router;
