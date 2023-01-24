import express from "express";
import albums from "./albumsRoutes.js";
import jwt from "jsonwebtoken"


const routes = (app) => {
    app.route('/').get((req,res)=>{
        res.status(200).send({message: 'Seja bem vindo a API do spotify'})
    }),

    app.post('/login', (req, res, next) => {
        //esse teste abaixo deve ser feito no seu banco de dados
        if(req.body.user === 'filipe' && req.body.password === '123'){
          //auth ok
          const id = 1; //esse id viria do seu banco de dados
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          return res.json({ auth: true, token: token });
        }
        
        res.status(500).json({message: 'Login inválido!'});
    })

    app.post('/logout', function(req, res) {
        res.json({ auth: false, token: null });
    })

    app.use(
        express.json(), 
        albums
    )
}

export default routes;