import axios from 'axios';

const createUrl = (id) => {
    return 'https://api.spotify.com/v1/artists/' + id + '/albums'
}

class AlbumController {
    static listarAlbums = async (req, res) => {
        // Faz uma requisição a um artista com um ID expecifico
        const idArtista = req.params.idArtista;
        const response = await axios.get(
            createUrl(idArtista), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + req.params.spotifyToken
                }
            })
            .then(function (res) {
                // manipula o sucesso da requisição
                console.log(`Albums do artista ${idArtista} obtidos com sucesso`)
                res.status(200).json(res.data)
            })
            .catch(function (error, res) {
                // manipula erros da requisição
                if(error.response.status==400){
                    res.status(400).json({message: error.response.status + ' - ' + error.response.statusText + ' - ID não encontrado'})
                }else if(error.response.status == 401){
                    res.status(401).json({message: error.response.status + ' - ' + error.response.statusText + ' - Token errado ou expirado'})
                }
            });
        return response;
    }
}
export default AlbumController;