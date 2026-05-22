import { useState } from 'react'
import { useLineup } from './hooks/useLineup'
import { usePlaylist } from './hooks/usePlaylist'
import { useSpotify } from './hooks/useSpotify'
import { useYoutube } from './hooks/useYoutube'
import { UploadSection } from './components/UploadSection'
import { LineupSection } from './components/LineupSection'
import { PlaylistSection } from './components/PlaylistSection'
import { ExportSection } from './components/ExportSection'

function App() {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const { preview, lineup, loading, handleFileChange, handleSubmit } = useLineup()
  const { playlist, playlistLoading, selectedDay, setSelectedDay, selectedArtists, toggleArtist, handleGeneratePlaylist } = usePlaylist()
  const { spotifyToken, handleSpotifyLogin, handleExportSpotify } = useSpotify(lineup, playlist, showToast)
  const { youtubeToken, handleYoutubeLogin, handleExportYoutube } = useYoutube(lineup, playlist)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <header className="px-4 pt-10 pb-6 text-center">
        <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
          🎵 Festival Playlist
        </h1>
        <p className="text-white/70 text-sm mt-1">라인업 사진으로 플레이리스트 만들기</p>
      </header>

      <main className="px-4 pb-16 max-w-lg mx-auto space-y-4">
        <UploadSection preview={preview} loading={loading} onFileChange={handleFileChange} onSubmit={handleSubmit} />
        {lineup && (
          <LineupSection
            lineup={lineup}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedArtists={selectedArtists}
            toggleArtist={toggleArtist}
            playlistLoading={playlistLoading}
            onGeneratePlaylist={handleGeneratePlaylist}
          />
        )}
        {playlist && <PlaylistSection playlist={playlist} />}
        {playlist && (
          <ExportSection
            spotifyToken={spotifyToken}
            onSpotifyLogin={handleSpotifyLogin}
            onExportSpotify={handleExportSpotify}
            youtubeToken={youtubeToken}
            onYoutubeLogin={handleYoutubeLogin}
            onExportYoutube={() => handleExportYoutube(showToast)}
          />
        )}
      </main>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-white shadow-lg
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default App