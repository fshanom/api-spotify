import express from "express";
import routes from "./routes/index.js";
import cors from 'cors';
import authMiddleware from './middlewares/auth.js';
import dotenv from "dotenv-safe"
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
//app.use(authMiddleware)
routes(app);

export default app;