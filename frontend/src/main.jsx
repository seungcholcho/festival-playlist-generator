import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { SpotifyCallback } from './pages/SpotifyCallback.jsx'
import { YoutubeCallback } from './pages/YoutubeCallback.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callback" element={<SpotifyCallback />} />
      <Route path="/callback/youtube" element={<YoutubeCallback />} />
    </Routes>
  </BrowserRouter>
)