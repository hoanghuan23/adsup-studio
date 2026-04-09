"use client"

import { Bot, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type AspectRatio = "9:16" | "1:1" | "16:9"

interface StudioHeaderProps {
  aspectRatio: AspectRatio
  onAspectRatioChange: (ratio: AspectRatio) => void
  onSwitchModule?: () => void
  onLogout?: () => void
}

const aspectRatios: { id: AspectRatio; label: string }[] = [
  { id: "9:16", label: "9:16" },
  { id: "1:1", label: "1:1" },
  { id: "16:9", label: "16:9" },
]

export function StudioHeader({
  aspectRatio,
  onAspectRatioChange,
  onSwitchModule,
  onLogout,
}: StudioHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[#1a1a1a] bg-[#0d0d0d] px-4">
      {/* Left: Logo */}
      <h1 className="text-lg font-bold text-white tracking-tight">AdSup</h1>

      {/* Center: Aspect ratio pills */}
      <div className="flex items-center gap-1 rounded-full border border-[#262626] bg-[#141414] p-1">
        {aspectRatios.map((r) => (
          <button
            key={r.id}
            onClick={() => onAspectRatioChange(r.id)}
            className={cn(
              "rounded-full px-4 py-1 text-xs font-medium transition-all",
              aspectRatio === r.id
                ? "bg-[#34d399] text-black"
                : "text-[#71717a] hover:text-white"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2">
        {/* Matrix Bot */}
        {onSwitchModule && (
          <button
            onClick={onSwitchModule}
            className="flex items-center gap-1.5 rounded-lg border border-[#3f3f46] bg-transparent px-3 py-1.5 text-sm font-medium text-[#a1a1aa] transition-colors hover:border-[#52525b] hover:text-white"
          >
            <Bot className="h-4 w-4" />
            Matrix Bot
          </button>
        )}

        {/* Export Button */}
        <Button className="bg-[#34d399] text-black hover:bg-[#2eb88a] font-semibold text-sm h-8 px-4">
          Xuất video
        </Button>

        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg border border-[#3f3f46] bg-transparent px-3 py-1.5 text-sm font-medium text-[#a1a1aa] transition-colors hover:border-[#52525b] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        )}
      </div>
    </header>
  )
}
