import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
})