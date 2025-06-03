import { DataSource } from "typeorm";
import { TypeORMPlaga } from "../infrastructure/orm-typeorm/entities/PlagaEntity.ts.js";
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
  entities: [TypeORMPlaga],
});
