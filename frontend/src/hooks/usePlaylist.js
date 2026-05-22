import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function usePlaylist() {
  const [playlist, setPlaylist] = useState(null)
  const [playlistLoading, setPlaylistLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedArtists, setSelectedArtists] = useState([])

  const toggleArtist = (artist) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.filter((a) => a !== artist)
        : [...prev, artist]
    )
  }

  const handleGeneratePlaylist = async () => {
    if (selectedArtists.length === 0) return
    setPlaylistLoading(true)
    try {
      const res = await axios.post(`${API_URL}/api/generate-playlist`, {
        artists: selectedArtists
      })
      setPlaylist(res.data)
    } catch (err) {
      console.error(err)
      alert('플레이리스트 생성 중 오류가 발생했습니다.')
    } finally {
      setPlaylistLoading(false)
    }
  }

  return { playlist, playlistLoading, selectedDay, setSelectedDay, selectedArtists, toggleArtist, handleGeneratePlaylist }
}