"use client"

import { Scissors, Layers, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomActionBar() {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
      {/* Gray buttons */}
      <button
        className="flex items-center gap-1.5 rounded-lg border border-[#3f3f46] bg-[#141414] px-3 py-2 text-xs font-medium text-[#a1a1aa] transition-colors hover:border-[#52525b] hover:text-white"
      >
        <Scissors className="h-3.5 w-3.5" />
        Văn video
      </button>
      <button
        className="flex items-center gap-1.5 rounded-lg border border-[#3f3f46] bg-[#141414] px-3 py-2 text-xs font-medium text-[#a1a1aa] transition-colors hover:border-[#52525b] hover:text-white"
      >
        <Layers className="h-3.5 w-3.5" />
        Tạo hàng loạt
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3f3f46] bg-[#141414] text-[#71717a] transition-colors hover:border-[#52525b] hover:text-white">
        <FileText className="h-4 w-4" />
      </button>

      {/* Primary button */}
      <Button className="bg-gradient-to-r from-[#34d399] to-[#2eb88a] text-black font-bold text-sm h-10 px-6 rounded-xl shadow-lg shadow-[#34d399]/20 hover:from-[#2eb88a] hover:to-[#1ea07a]">
        Xuất video
      </Button>
    </div>
  )
}
