"use client"

import { ChevronDown } from "lucide-react"

const campaigns = [
  { id: "1", label: "Chiến dịch mùa hè 2026" },
  { id: "2", label: "Sản phẩm mới tháng 4" },
  { id: "3", label: "Flash Sale April" },
]

export function CampaignTab() {
  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <p className="text-xs text-[#52525b]">Chọn chiến dịch</p>
      <div className="flex flex-col gap-2">
        {campaigns.map((c) => (
          <button
            key={c.id}
            className="flex items-center justify-between rounded-lg border border-[#262626] bg-[#141414] px-3 py-2.5 text-xs text-[#a1a1aa] transition-all hover:border-[#34d399] hover:bg-[#1a1a1a] hover:text-white"
          >
            {c.label}
            <ChevronDown className="h-3.5 w-3.5 text-[#52525b]" />
          </button>
        ))}
      </div>
    </div>
  )
}
