"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const characters = [
  { id: "1", label: "Áo thun", thumb: "👤" },
  { id: "2", label: "Nam 2D", thumb: "🎨" },
  { id: "3", label: "Ảnh AI", thumb: "🤖" },
  { id: "4", label: "Influencer", thumb: "⭐" },
  { id: "5", label: "Trung niên", thumb: "👨" },
  { id: "6", label: "Giới trẻ", thumb: "👦" },
]

const filterChips = ["Ảnh Real", "Ảnh AI", "Influencer"]

export function CharacterTab() {
  const [activeFilter, setActiveFilter] = useState("Ảnh Real")

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      {/* Dropdown */}
      <div className="relative">
        <button className="flex w-full items-center justify-between rounded-lg border border-[#262626] bg-[#141414] px-3 py-2 text-xs text-[#a1a1aa] hover:border-[#3f3f46]">
          Chọn nhân vật
          <ChevronDown className="h-3.5 w-3.5 text-[#52525b]" />
        </button>
      </div>

      {/* Horizontal scroll cards */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {characters.map((c) => (
          <button
            key={c.id}
            className="group flex flex-col items-center gap-1.5 rounded-xl border border-[#262626] bg-[#141414] p-2 transition-all hover:border-[#34d399] hover:bg-[#1a1a1a] flex-shrink-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1f1f] text-xl">
              {c.thumb}
            </div>
            <span className="text-[10px] text-[#71717a] group-hover:text-[#a1a1aa]">
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeFilter === chip
                ? "bg-[#34d399] text-black"
                : "border border-[#3f3f46] bg-transparent text-[#71717a] hover:text-white"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
