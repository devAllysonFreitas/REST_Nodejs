import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

// aceita dados em json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//permitir acesso em diversos computadores
app.use(cors());

// rotas feitas
app.use(router);

//conexão
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
})