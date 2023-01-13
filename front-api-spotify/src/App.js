import './App.css';
import Albums from './pages/Albums.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="SpotifyLogo" class="App-logo"></img>
        <h1>
          Teste da API do Spotify
        </h1>
        <h2>Como utilizar?</h2>
        <p>Para usar, você precisará de um token válido. Você pode conseguir um <a class="App-link" href="https://developer.spotify.com/console/get-several-albums/">nesse site</a>, basta logar com a sua conta do Spotify!</p>
        <Albums/>
      </header>
    </div>
  );
}

export default App;
