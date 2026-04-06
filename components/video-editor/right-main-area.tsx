"use client"

import { VideoPreview } from "./video-preview"
import { Timeline } from "./timeline"
import { PreviewSettingsPanel } from "./preview-settings-panel"
import { BottomActionBar } from "./bottom-action-bar"
import type { AspectRatio } from "./studio-header"

interface RightMainAreaProps {
  aspectRatio: AspectRatio
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlayPause: () => void
  onTimeChange: (time: number) => void
}

export function RightMainArea({
  aspectRatio,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onTimeChange,
}: RightMainAreaProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Top row: Preview + Settings */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* C1: Video Preview + Timeline */}
        <div className="flex flex-1 flex-col">
          {/* Video Preview */}
          <VideoPreview
            isPlaying={isPlaying}
            aspectRatio={aspectRatio}
            onPlayPause={onPlayPause}
            currentTime={currentTime}
            duration={duration}
            onTimeChange={onTimeChange}
          />
        </div>

        {/* C2: Settings Panel */}
        <PreviewSettingsPanel />

        {/* C3: Bottom Action Bar (overlaid) */}
        <BottomActionBar />
      </div>

      {/* Timeline */}
      <Timeline
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onTimeChange={onTimeChange}
      />
    </div>
  )
}
