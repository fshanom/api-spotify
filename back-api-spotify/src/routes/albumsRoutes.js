import express from "express";
import cors from 'cors';
import AlbumController from "../controllers/albumsController.js";

const router = express.Router();

router
    .get("/albums/:idArtista&:spotifyToken", cors(), AlbumController.listarAlbums)

export default router;