"use client"

import { useState } from "react"
import { LeftPanel, type LibraryTab } from "./left-panel"
import { RightMainArea } from "./right-main-area"
import { StudioHeader, type AspectRatio } from "./studio-header"

interface VideoEditorProps {
  onLogout?: () => void
  onSwitchModule?: () => void
}

export function VideoEditor({ onLogout, onSwitchModule }: VideoEditorProps) {
  const [activeRatio, setActiveRatio] = useState<AspectRatio>("1:1")
  const [activeTab, setActiveTab] = useState<LibraryTab>("products")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(2)
  const duration = 7

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleTimeChange = (time: number) => {
    setCurrentTime(time)
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#0f0f11] text-[#f0f0f5]">
      <StudioHeader
        aspectRatio={activeRatio}
        onAspectRatioChange={setActiveRatio}
        onSwitchModule={onSwitchModule}
        onLogout={onLogout}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <LeftPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
        />

        <RightMainArea
          aspectRatio={activeRatio}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onTimeChange={handleTimeChange}
        />
      </div>
    </div>
  )
}
