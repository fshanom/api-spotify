import axios from 'axios';

const createUrl = (id) => {
    return 'https://api.spotify.com/v1/artists/' + id + '/albums'
}

class AlbumController {
    static listarAlbums = async (req, res) => {
        // Faz uma requisição a um artista com um ID expecifico
        const idArtista = req.query.idArtista;
        const result = await axios.get(
            createUrl(idArtista), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + req.query.spotifyToken
                }
            })
            .catch(function (error) {
                return error;
            });
        
        // manipula o sucesso da requisição
        if(result.status == 200){
            console.log(`Albums do artista ${idArtista} obtidos com sucesso`)
            return res.status(200).json(result.data)                
        }else if(result.response.status==400){ // manipula erros de id
            return res.status(400).json({message: result.response.status + ' - ' + result.response.statusText + ' - ID não encontrado'})
        }else if(result.response.status==401){ // manipula erros de token
            return res.status(401).json({message: result.response.status + ' - ' + result.response.statusText + ' - Token errado ou expirado'})
        }
    }
}
export default AlbumController;