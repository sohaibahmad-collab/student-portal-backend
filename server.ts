/// <reference path="./src/types/express/index.d.ts" />
import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import errorMiddleware from "@src/middleware/errorMiddleware";
import connectDB from "@src/config/db";
import routes from "@src/routes";
import { settings } from "@src/config/settings";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);
const PORT = settings.port;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
