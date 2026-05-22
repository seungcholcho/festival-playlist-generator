import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function useLineup() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [lineup, setLineup] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setLineup(null)
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post(`${API_URL}/api/parse-lineup`, formData)
      setLineup(res.data)
    } catch (err) {
      console.error(err)
      alert('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { file, preview, lineup, loading, handleFileChange, handleSubmit }
}