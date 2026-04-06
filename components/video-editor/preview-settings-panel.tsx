"use client"

import { useState } from "react"
import { Play, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const colorDots = [
  { color: "bg-[#ef4444]", name: "Đỏ" },
  { color: "bg-[#f59e0b]", name: "Vàng" },
  { color: "bg-[#22c55e]", name: "Xanh lá" },
  { color: "bg-[#3b82f6]", name: "Xanh dương" },
  { color: "bg-white", name: "Trắng" },
]

const fonts = ["Poppins", "Roboto", "Inter"]
const voices = [
  { id: "1", label: "Nam", playing: false },
  { id: "2", label: "Nữ AI", playing: false },
]

const recentProjects = [
  { id: "1", name: "Áo thun", time: "2 phút trước", done: true },
  { id: "2", name: "Giày thể thao", time: "5 phút trước", done: true },
  { id: "3", name: "Dịch vụ Spa", time: "Hôm qua", done: true },
]

export function PreviewSettingsPanel() {
  const [selectedFont, setSelectedFont] = useState("Poppins")
  const [fontSize, setFontSize] = useState("24")
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [align, setAlign] = useState("center")
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  return (
    <div className="flex h-full w-60 flex-shrink-0 flex-col overflow-y-auto border-l border-[#1a1a1a] bg-[#0f0f0f]">
      {/* Text Settings */}
      <div className="flex flex-col gap-3 p-3">
        <span className="text-sm font-semibold text-white">Văn bản</span>

        {/* Font dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">Font</label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="rounded-lg border border-[#262626] bg-[#141414] px-3 py-2 text-xs text-white outline-none focus:border-[#34d399]"
          >
            {fonts.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Size input */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">Kích cỡ</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="rounded-lg border border-[#262626] bg-[#141414] px-3 py-2 text-xs text-white outline-none focus:border-[#34d399]"
          />
        </div>

        {/* Format buttons */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">Định dạng</label>
          <div className="flex gap-1">
            <button
              onClick={() => setBold(!bold)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold transition-colors",
                bold ? "bg-[#34d399] text-black" : "bg-[#1f1f1f] text-[#71717a] hover:bg-[#262626] hover:text-white"
              )}
            >
              B
            </button>
            <button
              onClick={() => setItalic(!italic)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] italic transition-colors",
                italic ? "bg-[#34d399] text-black" : "bg-[#1f1f1f] text-[#71717a] hover:bg-[#262626] hover:text-white"
              )}
            >
              I
            </button>
            <button
              onClick={() => setUnderline(!underline)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-[13px] underline transition-colors",
                underline ? "bg-[#34d399] text-black" : "bg-[#1f1f1f] text-[#71717a] hover:bg-[#262626] hover:text-white"
              )}
            >
              U
            </button>
            <button
              onClick={() => setAlign(align === "center" ? "left" : "center")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f1f1f] text-[13px] text-[#71717a] hover:bg-[#262626] hover:text-white"
            >
              ≡
            </button>
          </div>
        </div>

        {/* Color picker */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">Màu chữ</label>
          <div className="flex items-center gap-1.5">
            {colorDots.map((dot) => (
              <button
                key={dot.name}
                title={dot.name}
                className={cn(
                  "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
                  dot.color === "bg-white" ? "border-[#404040]" : "border-transparent"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#1a1a1a]" />

      {/* Audio Settings */}
      <div className="flex flex-col gap-3 p-3">
        <span className="text-sm font-semibold text-white">Âm thanh</span>

        {/* Selected track */}
        <div className="flex items-center gap-2 rounded-lg border border-[#34d399] bg-[#1a1a1a] p-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#34d399]/20">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#34d399]" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-white">BeatVlog 01</p>
            <p className="text-[10px] text-[#52525b]">00:07</p>
          </div>
        </div>

        {/* Voice list */}
        <div className="flex flex-col gap-1">
          {voices.map((v) => (
            <button
              key={v.id}
              onClick={() => setPlayingVoice(playingVoice === v.id ? null : v.id)}
              className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#141414] px-2.5 py-2 text-left transition-all hover:border-[#3f3f46] hover:bg-[#1a1a1a]"
            >
              <span className="text-xs text-[#a1a1aa]">{v.label}</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#3f3f46] text-[#71717a]">
                <Play className="h-3 w-3 translate-x-0.5" fill="currentColor" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#1a1a1a]" />

      {/* History */}
      <div className="flex flex-col gap-3 p-3">
        <span className="text-sm font-semibold text-white">Lịch sử</span>

        <div className="flex flex-col gap-2">
          {recentProjects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 rounded-lg border border-[#262626] bg-[#141414] p-2"
            >
              {/* Thumbnail */}
              <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-[#1f1f1f]">
                <div className="flex h-full w-full items-center justify-center text-[10px] text-[#52525b]">
                  Ảnh
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-[#a1a1aa]">{p.name}</p>
                <p className="text-[10px] text-[#52525b]">{p.time}</p>
              </div>

              {/* Checkmark */}
              {p.done && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34d399]/20">
                  <Check className="h-3 w-3 text-[#34d399]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
