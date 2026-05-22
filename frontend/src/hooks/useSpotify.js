import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
const SPOTIFY_SCOPES = 'playlist-modify-public playlist-modify-private user-read-private user-read-email'

export function useSpotify(lineup, playlist, showToast) {
  const [spotifyToken, setSpotifyToken] = useState(null)

  useEffect(() => {
    const channel = new BroadcastChannel('spotify_auth')
    channel.onmessage = (event) => {
      if (event.data?.type === 'SPOTIFY_TOKEN') {
        setSpotifyToken(event.data.access_token)
      }
    }
    return () => channel.close()
  }, [])

  const handleSpotifyLogin = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}`
    window.open(url, 'spotify-login', 'width=500,height=700')
  }

  const handleExportSpotify = async () => {
    try {
      await axios.post(`${API_URL}/api/export/spotify`, {
        access_token: spotifyToken,
        playlist_name: lineup.festival_name,
        playlist: playlist.playlist
      })
      showToast('✅ Spotify 저장 완료!')
      setSpotifyToken(null)
    } catch (err) {
      console.error(err)
      showToast('❌ 저장 실패. 다시 시도해주세요.', 'error')
    }
  }

  return { spotifyToken, handleSpotifyLogin, handleExportSpotify }
}