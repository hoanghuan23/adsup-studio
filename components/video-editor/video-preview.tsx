"use client"

import { Play, Pause, Volume2, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AspectRatio } from "./studio-header"

interface VideoPreviewProps {
  isPlaying: boolean
  aspectRatio: AspectRatio
  onPlayPause: () => void
  currentTime: number
  duration: number
  onTimeChange: (time: number) => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

const aspectClasses: Record<AspectRatio, string> = {
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "16:9": "",
}

const sizeClasses: Record<AspectRatio, string> = {
  "9:16": "max-h-[calc(100vh-220px)]",
  "1:1": "max-h-[calc(100vh-220px)]",
  "16:9": "h-full w-full max-w-full",
}

export function VideoPreview({
  isPlaying,
  aspectRatio,
  onPlayPause,
  currentTime,
  duration,
  onTimeChange,
}: VideoPreviewProps) {
  const progress = (currentTime / duration) * 100

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 bg-[#0a0a0a] p-6">
      {/* Video Canvas */}
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl",
          sizeClasses[aspectRatio],
          aspectClasses[aspectRatio]
        )}
      >
        {/* Solid black background */}
        <div className="absolute inset-0 bg-black" />

        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl text-white/5">
          Preview
        </div>

        {/* Center play button */}
        {!isPlaying && (
          <div className="relative z-10 flex flex-col items-center gap-3">
            <button
              onClick={onPlayPause}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/40 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white/60"
            >
              <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </button>
            <span className="text-sm text-white/30">Xem trước video</span>
          </div>
        )}

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
              <span className="text-xs font-medium text-white/60">Đang phát</span>
            </div>
          </div>
        )}

        {/* Aspect ratio badge */}
        <div className="absolute right-3 top-3 z-10 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
          {aspectRatio}
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-3">
          {/* Progress bar */}
          <div
            className="mb-2 h-1 w-full cursor-pointer rounded-full bg-white/20"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const pct = Math.max(0, Math.min(1, x / rect.width))
              onTimeChange(pct * duration)
            }}
          >
            <div
              className="h-full rounded-full bg-[#34d399] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPlayPause}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5" />
              )}
            </button>

            <span className="text-xs tabular-nums text-white/60">
              {formatTime(currentTime)}/{formatTime(duration)}
            </span>

            <div className="flex-1" />

            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70">
              <Volume2 className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70">
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
