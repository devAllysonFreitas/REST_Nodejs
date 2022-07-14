import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handle.middleware";
import { routerToken } from "./routes/token.routes";
import { routerUsers } from "./routes/users.routes";
import jwtAthenticationMiddleware from "./middlewares/jwt-authentication";

const app = express();

// aceita dados em json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//permitir acesso em diversos computadores
app.use(cors());


// rotas token
app.use(routerToken);

// middlewares tokens
app.use(jwtAthenticationMiddleware)

// rotas users
app.use(routerUsers);

// configuracao de errors
app.use(errorHandler);

//conexão
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
})