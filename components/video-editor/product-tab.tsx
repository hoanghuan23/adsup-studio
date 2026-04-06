"use client"

import { useState } from "react"
import { Search, Upload, Wand2 } from "lucide-react"

const products = [
  { id: "1", label: "Áo thun", thumb: "áo" },
  { id: "2", label: "Giày sneakers", thumb: "giày" },
  { id: "3", label: "Mỹ phẩm", thumb: "mỹ phẩm" },
  { id: "4", label: "Sữa", thumb: "sữa" },
]

const filters = ["Tất cả", "Áo thun", "Giày", "Mỹ phẩm"]

export function ProductTab() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Tất cả")

  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52525b]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full rounded-lg border border-[#262626] bg-[#141414] py-2 pl-9 pr-3 text-xs text-[#a1a1aa] placeholder:text-[#3f3f46] outline-none focus:border-[#34d399]"
        />
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-2 gap-2">
        {products.map((p) => (
          <button
            key={p.id}
            className="group flex flex-col items-center gap-2 rounded-xl border border-[#262626] bg-[#141414] p-2 transition-all hover:border-[#34d399] hover:bg-[#1a1a1a]"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#1f1f1f]">
              <div className="flex h-full w-full items-center justify-center text-xs text-[#52525b]">
                {p.thumb}
              </div>
            </div>
            <span className="text-[10px] text-[#71717a] group-hover:text-[#a1a1aa]">
              {p.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {}}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#262626] bg-[#141414] py-2 text-xs text-[#a1a1aa] transition-colors hover:border-[#34d399] hover:text-white"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload sản phẩm
        </button>
        <button
          onClick={() => {}}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#34d399] py-2 text-xs font-medium text-black transition-colors hover:bg-[#2eb88a]"
        >
          <Wand2 className="h-3.5 w-3.5" />
          Tự động xóa nền
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeFilter === f
                ? "bg-[#34d399] text-black"
                : "border border-[#3f3f46] bg-transparent text-[#71717a] hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}
