import { useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function YoutubeCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      axios.post(`${API_URL}/api/youtube/token`, { code })
        .then((res) => {
          const channel = new BroadcastChannel('youtube_auth')
          channel.postMessage({ type: 'YOUTUBE_TOKEN', access_token: res.data.access_token })
          channel.close()
          setTimeout(() => window.close(), 500)
        })
        .catch((err) => { console.error(err); window.close() })
    }
  }, [])
  return <div>YouTube Music 로그인 중...</div>
}