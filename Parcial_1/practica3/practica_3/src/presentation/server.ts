import express from "express";
import dotenv from "dotenv";
import router from "./presentation/routes";
import { connectMongoose } from "./shared/database/mongoose-connection";
import { AppDataSource } from "./shared/database/typeorm-datasource";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

(async () => {
  if (process.env.DB_TYPE === "mongoose") {
    await connectMongoose();
  } else {
    await AppDataSource.initialize();
  }

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();
