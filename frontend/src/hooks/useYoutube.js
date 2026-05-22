import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const YOUTUBE_CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID
const YOUTUBE_REDIRECT_URI = import.meta.env.VITE_YOUTUBE_REDIRECT_URI
const YOUTUBE_SCOPES = 'https://www.googleapis.com/auth/youtube'

export function useYoutube(lineup, playlist) {
  const [youtubeToken, setYoutubeToken] = useState(null)

  useEffect(() => {
    const channel = new BroadcastChannel('youtube_auth')
    channel.onmessage = (event) => {
      if (event.data?.type === 'YOUTUBE_TOKEN') {
        setYoutubeToken(event.data.access_token)
      }
    }
    return () => channel.close()
  }, [])

  const handleYoutubeLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUTUBE_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(YOUTUBE_REDIRECT_URI)}&scope=${encodeURIComponent(YOUTUBE_SCOPES)}&access_type=offline`
    window.open(url, 'youtube-login', 'width=500,height=700')
  }

  const handleExportYoutube = async (showToast) => {
    try {
      await axios.post(`${API_URL}/api/export/youtube`, {
        access_token: youtubeToken,
        playlist_name: lineup.festival_name,
        playlist: playlist.playlist
      })
      showToast('✅ YouTube Music 저장 완료!')
      setYoutubeToken(null)
    } catch (err) {
      console.error(err)
      showToast('❌ YouTube Music 저장 실패', 'error')
    }
  }

  return { youtubeToken, handleYoutubeLogin, handleExportYoutube }
}