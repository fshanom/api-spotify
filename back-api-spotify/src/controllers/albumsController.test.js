import { responseMock } from './mockApiSpotify.js';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import request from 'supertest'
import app from '../app.js';
// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const createUrl = (id) => {
  return 'https://api.spotify.com/v1/artists/' + id + '/albums'
}

//mock get albums returning 401
mock
  .onGet(createUrl(responseMock.idArtista))
  .reply(token => {
    if(token.headers.Authorization === 'Bearer ' + responseMock.spotifyToken){
      return [200, responseMock.res200]
    }else{
      return [401, responseMock.res401]
    }
  });

//mock get albums returning 400
mock
  .onGet(createUrl(responseMock.idArtista + 'ASHUASHUASHUA'))
  .reply(400, responseMock.res400);


describe('Testes da rota /albums', () => {
  const endpointUrl = '/albums';

  it('Deve checar se a API do Spotify está retornando certo - Return 200', async () => {
    const result = await request(app).get(endpointUrl).query({
      idArtista: responseMock.idArtista,
      spotifyToken: responseMock.spotifyToken
    })
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
  });

  it('Deve checar se o token da API do Spotify está válido - Return 401', async () => {
    const result = await request(app).get(endpointUrl).query({
      idArtista: responseMock.idArtista,
      spotifyToken: responseMock.spotifyToken + 'ASHUASHUASHUA'
    })
    expect(result.statusCode).toBe(401);
  });

  it('Deve checar se o id do artista enviado à API do Spotify está válido - Return 400', async () => {
    const result = await request(app).get(endpointUrl).query({
      idArtista: responseMock.idArtista + 'ASHUASHUASHUA',
      spotifyToken: responseMock.spotifyToken
    })
    expect(result.statusCode).toBe(400);
  });
});