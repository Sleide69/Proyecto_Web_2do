import express from "express";
import dotenv from "dotenv";
import plagaRoutes from "./presentation/routes/plaga.routes";
import "reflect-metadata";
import { AppDataSource } from "./shared/database/typeorm-datasource";

// ...

AppDataSource.initialize()
  .then(() => {
    console.log("📦 TypeORM conectado correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos TypeORM:", err);
  });

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/plagas", plagaRoutes);

export default app;
