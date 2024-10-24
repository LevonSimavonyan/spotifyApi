import { useEffect, useState } from 'react';
import './App.css';
import SpotifyIcon from './Components/SpotifyIcon';

const clientId = '82e56cfb18554d66b36a4fd3fc2e6880';
const clientSecret = '05e0b823685147ee9ff3ed64e96cf668';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [value, setValue] = useState(''); 
  const [data, setData] = useState([]);
  const [artistID, setArtistID] = useState('');

//accses token
  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then((resp) => resp.json())
      .then((resp) => setAccessToken(resp.access_token));
  }, []);

//Searchi logika
  useEffect(() => {
    if (!accessToken || !value) return; //Ardyoq ka tenc value
    const artistParameters = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };  
    fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist`, artistParameters)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp.artists.items); 
      });
  }, [accessToken, value]); 

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />


{
        data.map((e) => (
          e.images.length > 0 && (
            <SpotifyIcon
              key={e.id}
              imageUrl={e.images[0].url}
              name={e.name}
              followers={e.followers.total}
            />
          )
        ))}
    </div>
  );
}

export default App;