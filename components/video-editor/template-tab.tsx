"use client"

const templates = [
  { id: "1", label: "Áo thun" },
  { id: "2", label: "Nam 2D" },
  { id: "3", label: "Nam AI" },
  { id: "4", label: "Giày" },
  { id: "5", label: "Nữ 3D" },
]

export function TemplateTab() {
  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      <p className="text-xs text-[#52525b]">Chọn mẫu video</p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {templates.map((t) => (
          <button
            key={t.id}
            className="group flex flex-col items-center gap-2 rounded-xl border border-[#262626] bg-[#141414] p-2 transition-all hover:border-[#34d399] hover:bg-[#1a1a1a] flex-shrink-0 w-24"
          >
            <div className="aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#1f1f1f]">
              <div className="flex h-full w-full items-center justify-center text-[10px] text-[#52525b]">
                {t.label}
              </div>
            </div>
            <span className="text-[10px] text-[#71717a] group-hover:text-[#a1a1aa]">
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
