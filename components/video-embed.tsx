"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Youtube } from "lucide-react"

export default function VideoEmbed() {
  const [url, setUrl] = useState("")
  const [embedUrl, setEmbedUrl] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      // Handle YouTube URLs
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let videoId = ""

        if (url.includes("youtube.com/watch")) {
          const urlParams = new URLSearchParams(new URL(url).search)
          videoId = urlParams.get("v")
        } else if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0]
        }

        if (videoId) {
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}`)
          setError("")
        } else {
          setError("Invalid YouTube URL")
        }
      }
      // Handle Vimeo URLs
      else if (url.includes("vimeo.com")) {
        const vimeoId = url.split("vimeo.com/")[1]
        if (vimeoId) {
          setEmbedUrl(`https://player.vimeo.com/video/${vimeoId}`)
          setError("")
        } else {
          setError("Invalid Vimeo URL")
        }
      }
      // Handle other URLs
      else {
        setEmbedUrl(url)
        setError("")
      }
    } catch (err) {
      setError("Invalid URL format")
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Embed</Button>
      </form>

      {error && <p className="text-sm text-rose-500 mb-2">{error}</p>}

      {embedUrl ? (
        <div className="aspect-video w-full bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="aspect-video w-full bg-white/30 dark:bg-slate-800/30 rounded-xl flex items-center justify-center">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <Youtube className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Enter a video URL to embed study content</p>
          </div>
        </div>
      )}
    </div>
  )
}
