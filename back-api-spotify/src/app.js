import express from "express";
import routes from "./routes/index.js";
import cors from 'cors';
import dotenv from "dotenv-safe"
dotenv.config()
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-output.json' assert { type: "json" };

const app = express();
app.use(express.json());
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes(app);

export default app;