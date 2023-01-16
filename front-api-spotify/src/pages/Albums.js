import React, { useState } from 'react';
import axios from 'axios';
import './Albums.css';

const url = 'http://localhost:3000/albums/'
const albumsInit = {items:[], error: {}};

function Albums() {
    const [albums, setAlbums] = useState(albumsInit)
    const [error, setError] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = event.target.idArtista.value;
        // Make a request for a user with a given ID
        axios.get(url + id)
            .then(function (response) {
                // handle success
                setAlbums(response.data);
                console.log(albums);
            })
            .catch(function (error) {
                // handle error
                setError("Erro: " + error.response.data.message)
                setAlbums(albumsInit)
                console.log(error);
            })
    }

    return (
        <>
            <p>Para saber o id do artista, abra a página dele no Spotify Web Player e copie após "artist/", como no exemplo: https://open.spotify.com/artist/6d24kC5fxHFOSEAmjQPPhc</p>
            
            <p>Digite abaixo o ID do artista para ver sua discografia.</p>
            <form onSubmit={handleSubmit}>
                <input id="idArtista" name="idArtista" type="text"></input>
                <button type="submit">Buscar</button>
            </form>
            <div>
                {albums.items.map((album) => (
                    <div className='grid-container'>
                        <div className='album-cover'>
                            <img src={album.images[1].url} alt={album.name}></img>                   
                        </div>
                        <div className='album-info'>
                            <p>Nome: {album.name}</p>
                            <p>Data de Lançamento: {album.release_date}</p>
                            <p>Total de faixas: {album.total_tracks}</p>
                            <p>Tipo: {album.album_type}</p>
                            <p>URL: <a href={album.external_urls.spotify} className='App-link'>Link</a></p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {error}
            </div>
        </>
    )
}

export default Albums;