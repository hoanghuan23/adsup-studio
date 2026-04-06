"use client"

import { useRef, useState, useCallback } from "react"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  currentTime: number
  duration: number
  isPlaying: boolean
  onPlayPause: () => void
  onTimeChange: (time: number) => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

// Stable waveform heights
const waveformHeights = Array.from({ length: 60 }, () => Math.random() * 12 + 6)

const rulerMarks = Array.from({ length: 7 }, (_, i) => formatTime((i / 6) * 7))

export function Timeline({
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onTimeChange,
}: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const progress = (currentTime / duration) * 100

  const calculateTimeFromPointer = useCallback(
    (clientX: number) => {
      if (!timelineRef.current) return currentTime
      const rect = timelineRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      return percentage * duration
    },
    [duration, currentTime]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
      const newTime = calculateTimeFromPointer(e.clientX)
      onTimeChange(newTime)
    },
    [calculateTimeFromPointer, onTimeChange]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const newTime = calculateTimeFromPointer(e.clientX)
      onTimeChange(newTime)
    },
    [isDragging, calculateTimeFromPointer, onTimeChange]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className="flex flex-col border-t border-[#1a1a1a] bg-[#0f0f0f]">
      {/* Controls bar */}
      <div className="flex items-center gap-3 px-4 py-2">
        {/* Play button */}
        <button
          onClick={onPlayPause}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#34d399] text-black transition-colors hover:bg-[#2eb88a]"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 translate-x-0.5" />
          )}
        </button>

        {/* Time */}
        <span className="text-xs tabular-nums text-[#71717a]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Tracks */}
      <div className="overflow-x-auto px-4 pb-4">
        <div className="min-w-[500px]">
          {/* Ruler */}
          <div className="mb-1 flex items-center text-[10px] text-[#52525b]">
            {rulerMarks.map((mark, i) => (
              <span
                key={i}
                className="flex-1 first:text-left last:text-right"
                style={{
                  textAlign: i === 0 ? "left" : i === rulerMarks.length - 1 ? "right" : "center",
                }}
              >
                {mark}
              </span>
            ))}
          </div>

          {/* Interactive area */}
          <div
            ref={timelineRef}
            className={cn(
              "relative cursor-pointer touch-none select-none",
              isDragging ? "cursor-grabbing" : ""
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* VIDEO track */}
            <div className="mb-1.5">
              <div className="mb-0.5 flex items-center gap-1 px-1">
                <span className="w-10 text-[9px] font-medium uppercase tracking-wider text-[#34d399]">
                  Video
                </span>
              </div>
              <div className="flex h-10 gap-0.5 overflow-hidden rounded-lg bg-[#141414]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="relative flex-1 overflow-hidden bg-[#34d399]/15"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#34d399]/10 to-transparent" />
                    <div className="absolute bottom-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded bg-[#34d399]/20 text-[9px] font-semibold text-[#34d399]">
                      {i}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AUDIO track */}
            <div className="mb-1.5">
              <div className="mb-0.5 flex items-center gap-1 px-1">
                <span className="w-10 text-[9px] font-medium uppercase tracking-wider text-[#5eead4]">
                  Audio
                </span>
                <span className="text-[9px] text-[#52525b]">BeatVlog 01</span>
              </div>
              <div className="flex h-8 items-center gap-1 rounded-lg bg-[#141414] px-3">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0 text-[#5eead4]" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                <div className="flex flex-1 items-center gap-px overflow-hidden">
                  {waveformHeights.map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 flex-shrink-0 rounded-full bg-[#5eead4]/60"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* TEXT track */}
            <div>
              <div className="mb-0.5 flex items-center gap-1 px-1">
                <span className="w-10 text-[9px] font-medium uppercase tracking-wider text-[#a78bfa]">
                  Text
                </span>
              </div>
              <div className="flex h-7 items-center gap-2 rounded-lg border border-dashed border-[#262626] bg-[#141414] px-3">
                <span className="text-[10px] text-[#52525b]">+ Thêm văn bản</span>
              </div>
            </div>

            {/* Playhead */}
            <div
              className="pointer-events-none absolute top-0 z-10 h-full w-0.5 bg-[#34d399] shadow-lg transition-[left] duration-75"
              style={{ left: `${progress}%` }}
            >
              <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-[#34d399]" />
              {isDragging && (
                <div className="absolute -left-0.5 top-0 h-full w-1.5 bg-[#34d399]/20 blur-sm" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
