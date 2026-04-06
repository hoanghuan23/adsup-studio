"use client"

import { useState } from "react"
import { ShoppingBag, User, LayoutTemplate, Megaphone, Play } from "lucide-react"
import { ProductTab } from "./product-tab"
import { CharacterTab } from "./character-tab"
import { TemplateTab } from "./template-tab"
import { CampaignTab } from "./campaign-tab"
import { cn } from "@/lib/utils"

export type LibraryTab = "products" | "characters" | "templates" | "campaigns"

interface LeftPanelProps {
  activeTab: LibraryTab
  onTabChange: (tab: LibraryTab) => void
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlayPause: () => void
}

// Stable waveform heights
const waveformHeights = Array.from({ length: 30 }, () => Math.random() * 10 + 4)

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

const tabs: { id: LibraryTab; label: string; icon: typeof ShoppingBag }[] = [
  { id: "products", label: "Sản phẩm", icon: ShoppingBag },
  { id: "characters", label: "Nhân vật", icon: User },
  { id: "templates", label: "Template", icon: LayoutTemplate },
  { id: "campaigns", label: "Chiến dịch", icon: Megaphone },
]

export function LeftPanel({
  activeTab,
  onTabChange,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
}: LeftPanelProps) {
  const [tabSection, setTabSection] = useState<"products" | "characters" | "templates" | "campaigns">("products")

  return (
    <aside className="hidden w-96 flex-shrink-0 flex-col border-r border-[#1a1a1a] bg-[#0f0f0f] lg:flex">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-[#1a1a1a] px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tabSection === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setTabSection(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-all",
                isActive
                  ? "bg-[#34d399]/10 text-[#34d399]"
                  : "text-[#52525b] hover:text-[#a1a1aa]"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {tabSection === "products" && <ProductTab />}
        {tabSection === "characters" && <CharacterTab />}
        {tabSection === "templates" && <TemplateTab />}
        {tabSection === "campaigns" && <CampaignTab />}
      </div>

      {/* Mini Player */}
      <div className="flex items-center gap-3 border-t border-[#1a1a1a] px-4 py-3">
        <button
          onClick={onPlayPause}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#34d399] text-black transition-colors hover:bg-[#2eb88a]"
        >
          <Play className={cn("h-3.5 w-3.5", isPlaying ? "" : "translate-x-0.5")} fill="currentColor" />
        </button>

        <span className="text-xs font-medium tabular-nums text-[#a1a1aa]">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>

        {/* Waveform */}
        <div className="flex flex-1 items-center gap-px overflow-hidden">
          {waveformHeights.map((h, i) => (
            <div
              key={i}
              className="w-0.5 flex-shrink-0 rounded-full bg-[#34d399]/40"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
