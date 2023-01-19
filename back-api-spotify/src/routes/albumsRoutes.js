import express from "express";
import cors from 'cors';
import AlbumController from "../controllers/albumsController.js";

const router = express.Router();

router
    .get("/albums", cors(), AlbumController.listarAlbums)

export default router;