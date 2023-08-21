import { useState, useEffect } from 'react'
import Playlists from './components/Playlists'

function App() {
  const authEndpoint = "https://accounts.spotify.com/authorize"
  const clientID = 'd9b7108468c747c99a4b628d00f28873'
  // const clientSecret = 'c9810aaff96d4d86abd2b9d813f8cc5d'
  const redirectURI = 'http://localhost:5173/'

  const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read"
  ]

  const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

  // const getTokenFromURL = ()=>{
  //   return window.location.hash
  //     .substring(1)
  //     .split('&')
  //     .reduce((initial, item)=>{
  //       let parts = item.split("=");
  //       console.log(parts)
  //       initial[parts[0]] = decodeURIComponent(parts[1])

  //       return initial
  //     })
  // }

  const [spotifyToken, setSpotifyToken] = useState('');
  const [expiration, setExpiration] = useState('')

  useEffect(()=>{
    const _spotifyToken = new URLSearchParams(window.location.hash).get('#access_token');
    const _expiration = new URLSearchParams(window.location.hash).get('expires_in');
    

    if (_spotifyToken){
      setSpotifyToken(_spotifyToken);
    }
    if (_expiration){
      setExpiration(_expiration);
    }

    window.location.hash = "";
    console.log(spotifyToken, expiration)
  },[])

  return (
    <>
      {!spotifyToken? <a href={loginURL}>log in</a>:<><Playlists token={spotifyToken}/></> }
      
    </>
  )
}

export default App
