import express from "express";
import cors from 'cors';
import AlbumController from "../controllers/albumsController.js";
import authMiddleware from "../middlewares/auth.js"

const router = express.Router();

router
    .get("/albums", authMiddleware, AlbumController.listarAlbums)

export default router;