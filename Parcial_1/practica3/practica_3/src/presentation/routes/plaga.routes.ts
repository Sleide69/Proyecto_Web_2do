import { Router } from "express";
import { PlagaController } from "../controllers/PlagaController";
import { PlagaService } from "../../application/services/PlagaService";
import { PlagaTypeOrmRepository } from "../../infrastructure/orm-typeorm/repositories/PlagaTypeOrmRepository";
import { PlagaRepositoryMongoose } from "../../infrastructure/orm-mongoose/repositories/PlagaMongooseRepository";

const router = Router();

// Detectar qué ORM usar desde env
const repo = process.env.DB_TYPE === "mongoose"
  ? new PlagaRepositoryMongoose()
  : new PlagaTypeOrmRepository();

const controller = new PlagaController(new PlagaService(repo));

router.post("/", controller.crear);
router.get("/", controller.listar);

export default router;
