import "reflect-metadata";
import { DataSource } from "typeorm";
import { PlagaEntity } from "../../infrastructure/orm-typeorm/entities/PlagaEntity";
import { CapturaEntity } from "../../infrastructure/orm-typeorm/entities/CapturaEntity";
import { NotificacionEntity } from "../../infrastructure/orm-typeorm/entities/NotificacionEntity";
import { ProcesamientoIAEntity } from "../../infrastructure/orm-typeorm/entities/ProcesamientoIAEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // ⚠️ Solo para desarrollo
  logging: false,
  entities: [PlagaEntity, CapturaEntity, NotificacionEntity, ProcesamientoIAEntity],
  migrations: [],
  subscribers: [],
});
