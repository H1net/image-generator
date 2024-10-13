import { useState } from 'react'
import ImageDisplay from '../components/ImageDisplay'
import Loader from '../components/Loader'

export default function Home() {
  const [prompt, setPrompt] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setImageUrl(null)
    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }
      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Image Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description for the image"
          required
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Generate Image
        </button>
      </form>
      {loading ? <Loader /> : <ImageDisplay imageUrl={imageUrl} />}
    </div>
  )
}
