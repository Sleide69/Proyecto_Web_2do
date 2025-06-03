import "reflect-metadata";
import { DataSource } from "typeorm";
import { PlagaEntity } from "../../infrastructure/orm-typeorm/entities/PlagaEntity.ts";
import { CapturaEntity } from "../../infrastructure/orm-typeorm/entities/CapturaEntity";
import { NotificacionEntity } from "../../infrastructure/orm-typeorm/entities/NotificacionEntity";
import { ProcesamientoIAEntity } from "../../infrastructure/orm-typeorm/entities/ProcesamientoIAEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // ⚠️ Solo para desarrollo
  logging: false,
  entities: [PlagaEntity, CapturaEntity, NotificacionEntity, ProcesamientoIAEntity],
  migrations: [],
  subscribers: [],
});

