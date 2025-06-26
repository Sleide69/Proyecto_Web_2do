import { DataSource } from "typeorm";
import { PlagaEntity } from "../infrastructure/orm-typeorm/entities/PlagaEntity.ts";
import { CapturaEntity } from "../infrastructure/orm-typeorm/entities/CapturaEntity";
import { NotificacionEntity } from "../infrastructure/orm-typeorm/entities/NotificacionEntity";
import { ProcesamientoIAEntity } from "../infrastructure/orm-typeorm/entities/ProcesamientoIAEntity";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [PlagaEntity, CapturaEntity, NotificacionEntity, ProcesamientoIAEntity],
});
