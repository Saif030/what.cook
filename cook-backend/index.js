import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import aiCookController from "./src/controllers/ai.controller.js";
import { Authenticate } from "./src/middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", Authenticate, aiCookController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});