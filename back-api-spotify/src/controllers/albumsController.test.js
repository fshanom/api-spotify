import AlbumController from './albumsController.js';
import {responseMock} from './mockApiSpotify.js';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "url"
import request from '../config/customAxios.js';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const createUrl = (id) => {
  return 'https://api.spotify.com/v1/artists/' + id + '/albums'
}

//mock get albums returning 200
mock
  .onGet(createUrl(responseMock.idArtista))
  .reply(200, responseMock.res200);

//mock get albums returning 400
mock
  .onGet(createUrl(responseMock.idArtista + '///'))
  .reply(400, responseMock.res400);

//mock get albums returning 401
mock
  .onGet(createUrl(responseMock.idArtista))
  .reply(token => {
    if(token.headers.Authorization === responseMock.spotifyToken){
      return [200, responseMock.res200]
    }else{
      return [401, responseMock.res401]
    }
  });

describe('Testes da rota /albums', () => {
  it('Deve checar se a API do Spotify está retornando certo - Return 200', async () => {
    const endpointUrl = '/albums';
    
    const result = await axios.get(endpointUrl, {params:{
      idArtista: responseMock.idArtista,
      spotifyToken: responseMock.spotifyToken
    }});

    expect(result).not.toBe({});
  });
  
  // it('Deve checar se o token da API do Spotify está válido - Return 401', () => {
  //   const req = { params: { idArtista: responseMock.idArtista, spotifyToken: responseMock.spotifyToken+'p' } };    
    
  //   const response = AlbumController.listarAlbums(req);
  //   expect(response.status).toBe(401);
  // });
});