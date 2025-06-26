import dotenv from "dotenv";
dotenv.config(); // ✅ Debe ir antes que cualquier uso de process.env

import express from "express";
import "reflect-metadata";
import plagaRoutes from "./presentation/routes/plaga.routes";
import { AppDataSource } from "./shared/database/typeorm-datasource";

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares y rutas
app.use(express.json());

// ✅ Ruta raíz para evitar error "Cannot GET /"
app.get("/", (req, res) => {
  res.send("API de detección de plagas funcionando correctamente 🌿");
});

app.use("/api/plagas", plagaRoutes);

// Inicializar TypeORM y arrancar servidor
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

export default app;
