import express from "express";
import albums from "./albumsRoutes.js";

const routes = (app) => {
    app.route('/').get((req,res)=>{
        res.status(200).send({message: 'Seja bem vindo a API do spotify'})
    })

    app.use(
        express.json(), 
        albums
    )
}

export default routes;