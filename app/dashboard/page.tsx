"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronUp, ChevronDown, Play, Clock, Users, Plus } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  thumbnail: string
  duration: string
  votes: number
  submittedBy: string
  youtubeId: string
}

export default function SongVotingApp() {
  const [currentSong] = useState<Song>({
    id: "current",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
    duration: "5:55",
    votes: 0,
    submittedBy: "StreamerBot",
    youtubeId: "fJ9rUzIMcZQ",
  })

  const [queue, setQueue] = useState<Song[]>([
    {
      id: "1",
      title: "Don't Stop Believin'",
      artist: "Journey",
      thumbnail: "https://img.youtube.com/vi/1k8craCGpgs/maxresdefault.jpg",
      duration: "4:11",
      votes: 15,
      submittedBy: "MusicLover42",
      youtubeId: "1k8craCGpgs",
    },
    {
      id: "2",
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      thumbnail: "https://img.youtube.com/vi/1w7OgIMMRc4/maxresdefault.jpg",
      duration: "5:03",
      votes: 12,
      submittedBy: "RockFan88",
      youtubeId: "1w7OgIMMRc4",
    },
    {
      id: "3",
      title: "Hotel California",
      artist: "Eagles",
      thumbnail: "https://img.youtube.com/vi/BciS5krYL80/maxresdefault.jpg",
      duration: "6:30",
      votes: 8,
      submittedBy: "ClassicRock",
      youtubeId: "BciS5krYL80",
    },
    {
      id: "4",
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      thumbnail: "https://img.youtube.com/vi/QkF3oxziUI4/maxresdefault.jpg",
      duration: "8:02",
      votes: 6,
      submittedBy: "ZeppelinFan",
      youtubeId: "QkF3oxziUI4",
    },
  ])

  const [newSongUrl, setNewSongUrl] = useState("")
  const [previewSong, setPreviewSong] = useState<Song | null>(null)

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const fetchVideoInfo = async (videoId: string): Promise<Song | null> => {
    // In a real app, you'd use YouTube API to fetch video details
    // For demo purposes, we'll simulate the response
    return {
      id: Date.now().toString(),
      title: "New Song Title",
      artist: "Artist Name",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: "3:45",
      votes: 0,
      submittedBy: "You",
      youtubeId: videoId,
    }
  }

  const handleUrlChange = async (url: string) => {
    setNewSongUrl(url)
    const videoId = extractYouTubeId(url)

    if (videoId) {
      const songInfo = await fetchVideoInfo(videoId)
      setPreviewSong(songInfo)
    } else {
      setPreviewSong(null)
    }
  }

  const addToQueue = () => {
    if (previewSong) {
      setQueue((prev) => [...prev, previewSong].sort((a, b) => b.votes - a.votes))
      setNewSongUrl("")
      setPreviewSong(null)
    }
  }

  const vote = (songId: string, increment: number) => {
    setQueue((prev) =>
      prev
        .map((song) => (song.id === songId ? { ...song, votes: Math.max(0, song.votes + increment) } : song))
        .sort((a, b) => b.votes - a.votes),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">🎵 Stream Song Voting</h1>
          <p className="text-purple-200">Vote for the next song or submit your own!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Song Player */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-400" />
                  Now Playing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="aspect-video rounded-lg overflow-hidden max-h-[300px]">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1`}
                    className="w-full h-full"
                    allowFullScreen
                    title={currentSong.title}
                  />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="font-semibold text-lg">{currentSong.title}</h3>
                    <p className="text-purple-200">{currentSong.artist}</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-600/50 text-white">
                    {currentSong.duration}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Add New Song */}
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  Submit a Song
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Paste YouTube URL here..."
                    value={newSongUrl}
                    onChange={(e)  => handleUrlChange(e.target.value)}
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-200"
                  />
                  <Button onClick={addToQueue} disabled={!previewSong} className="bg-purple-600 hover:bg-purple-700">
                    Add to Queue
                  </Button>
                </div>

                {previewSong && (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                    <img
                      src={previewSong.thumbnail || "/placeholder.svg"}
                      alt={previewSong.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 text-white">
                      <p className="font-medium">{previewSong.title}</p>
                      <p className="text-sm text-purple-200">{previewSong.artist}</p>
                    </div>
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      {previewSong.duration}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Queue */}
          <div className="space-y-4">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Up Next ({queue.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {queue.map((song, index) => (
                  <div key={song.id} className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20 hover:bg-white/10 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => vote(song.id, 1)}
                          className="h-6 w-6 p-0 text-green-400 hover:text-green-300 hover:bg-green-400/20"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <span className="text-white font-semibold text-sm min-w-[2rem] text-center">{song.votes}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => vote(song.id, -1)}
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/20"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>

                      <img
                        src={song.thumbnail || "/placeholder.svg"}
                        alt={song.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-white text-sm line-clamp-1">{song.title}</h4>
                            <p className="text-purple-200 text-xs line-clamp-1">{song.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="border-purple-400 text-purple-200 text-xs">
                                {song.duration}
                              </Badge>
                              <span className="text-purple-300 text-xs flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {song.submittedBy}
                              </span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-purple-600/50 text-white text-xs flex-shrink-0">
                            #{index + 1}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {index < queue.length - 1 && <Separator className="bg-purple-500/20" />}
                  </div>
                ))}

                {queue.length === 0 && (
                  <div className="text-center py-8 text-purple-200">
                    <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No songs in queue</p>
                    <p className="text-sm">Submit the first song!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
