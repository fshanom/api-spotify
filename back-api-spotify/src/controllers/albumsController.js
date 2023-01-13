import axios from 'axios'

const data = {
    token: 'BQCr6Qx4Nl8nsDt_uv2faDA56Iq19hDypfCPltiNqg2MwsS2CvFTsnnENKsrEz1StXxlM2B1BKEBMyfpNlX6nqU94-DEJX-IcM9_T54GnAwnjgI9dpff7BZ9oKjTNIIAQ_CaWrMtitZ3cwz2mmQDdPSo0YIHN4RSLtQRKHsEJxcLhLl1uXwvHOjf8bNo3ZEznlg'
}

const createUrl = (id) => {
    return 'https://api.spotify.com/v1/artists/' + id + '/albums'
}

class AlbumController {

    static listarAlbums = (req, res) => {
        // Faz uma requisição a um artista com um ID expecifico
        const idArtista = req.params.idArtista;
        axios.get(
            createUrl(idArtista), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                }
            })
            .then(function (response) {
                // manipula o sucesso da requisição
                console.log(`Albums do artista ${idArtista} obtidos com sucesso`)
                res.status(200).json(response.data)
            })
            .catch(function (error) {
                // manipula erros da requisição
                if(error.response.status==400){
                    res.status(404).send({message: error.response.status + ' - ' + error.response.statusText + ' - ID não encontrado'})
                }else if(error.response.status == 401){
                    res.status(401).send({message: error.response.status + ' - ' + error.response.statusText + ' - Token errado ou expirado'})
                }
            });
    }
}
export default AlbumController;