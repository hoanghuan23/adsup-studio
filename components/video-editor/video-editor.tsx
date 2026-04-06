"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"

// ============== CONSTANTS ==============
type AspectRatio = "9:16" | "1:1" | "16:9"
const aspectRatios: AspectRatio[] = ["9:16", "1:1", "16:9"]

const products = [
  { id: "1", label: "Áo thun", thumb: "" },
  { id: "2", label: "Giày sneakers", thumb: "" },
  { id: "3", label: "Mỹ phẩm", thumb: "" },
  { id: "4", label: "Sửa việc...", thumb: "" },
]

const avatarCards = [
  { id: "1", label: "Áo thun", thumb: "", selected: true },
  { id: "2", label: "Nam 2D", thumb: "" },
  { id: "3", label: "Ảnh AI", thumb: "" },
  { id: "4", label: "Influencer", thumb: "" },
  { id: "5", label: "Trung niên", thumb: "" },
  { id: "6", label: "Giới t...", thumb: "" },
]

const templateCards = [
  { id: "1", label: "Áo thun", thumb: "", selected: true },
  { id: "2", label: "Nam 2D", thumb: "" },
  { id: "3", label: "Nam AI", thumb: "" },
  { id: "4", label: "Nam AI", thumb: "" },
]

const nvCards = [
  { id: "1", label: "Áo thun", thumb: "", badge: "AI", badgeClass: "ai" },
  { id: "2", label: "Nam 2D", thumb: "", badge: "Real", badgeClass: "real" },
  { id: "3", label: "Ảnh AI", thumb: "", badge: "AI", badgeClass: "ai" },
  { id: "4", label: "Influencer", thumb: "", badge: "KOL", badgeClass: "inf" },
  { id: "5", label: "Trung niên", thumb: "", badge: "Real", badgeClass: "real" },
  { id: "6", label: "Nữ trẻ", thumb: "", badge: "Real", badgeClass: "real" },
  { id: "7", label: "Nam AI Pro", thumb: "", badge: "AI", badgeClass: "ai" },
  { id: "8", label: "Gen Z", thumb: "", badge: "KOL", badgeClass: "inf" },
]

const nvCats = ["Tất cả", "Ảnh Real", "Ảnh AI", "Influencer", "Nam", "Nữ", "Trung niên"]

const nvBadgeColors: Record<string, React.CSSProperties> = {
  ai: { background: "rgba(0,229,180,0.18)", color: "#00e5b4", border: "1px solid rgba(0,229,180,0.3)" },
  real: { background: "rgba(74,158,255,0.18)", color: "#4a9eff", border: "1px solid rgba(74,158,255,0.3)" },
  inf: { background: "rgba(255,200,74,0.18)", color: "#ffc84a", border: "1px solid rgba(255,200,74,0.3)" },
}

const nvBgColors: Record<string, React.CSSProperties["background"]> = {
  ai: "linear-gradient(160deg,#1e2530,#0d1219)",
  real: "linear-gradient(160deg,#1e2520,#0d160f)",
  inf: "linear-gradient(160deg,#2a201e,#180f0d)",
}

const audioItems = [
  { id: "1", name: "BeatVlog 01", sub: "Aủl nlaoo", thumb: "" },
  { id: "2", name: "Nam", sub: "Kjn nhooed", thumb: "" },
  { id: "3", name: "Nữ AI", sub: "Kjn Bjajica", thumb: "" },
  { id: "4", name: "Nhạc nền Chill", sub: "Lo-fi beat", thumb: "" },
  { id: "5", name: "Pop Vui", sub: "Upbeat", thumb: "" },
  { id: "6", name: "Acoustic", sub: "Guitar", thumb: "" },
]

const historyItems = [
  { id: "1", name: "Video 1" },
  { id: "2", name: "Video 2" },
  { id: "3", name: "Video 3" },
  { id: "4", name: "Video 4" },
  { id: "5", name: "Video 5" },
  { id: "6", name: "Video 6" },
]

const waveformHeights = Array.from({ length: 80 }, () => Math.random() * 70 + 15)

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}



// ============== MAIN COMPONENT ==============
interface VideoEditorProps {
  onSwitchModule?: () => void
}

export function VideoEditor({ onSwitchModule }: VideoEditorProps) {
  const [activeRatio, setActiveRatio] = useState<AspectRatio>("1:1")
  const [activeNV, setActiveNV] = useState("Tất cả")
  const [selectedProduct, setSelectedProduct] = useState("1")
  const [selectedAvatar, setSelectedAvatar] = useState("1")
  const [selectedTemplate, setSelectedTemplate] = useState("1")
  const [selectedNV, setSelectedNV] = useState("1")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(2)
  const [duration] = useState(7)
  const [activeFormat, setActiveFormat] = useState<string[]>(["B"])
  const progress = (currentTime / duration) * 100

  const toggleFormat = (f: string) => {
    setActiveFormat((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    )
  }

  return (
    <div
      className="editor-font flex h-dvh flex-col overflow-hidden"
      style={{ background: "#0f0f11", color: "#f0f0f5", fontFamily: "var(--font-vi), 'DM Sans', system-ui, sans-serif" }}
    >
      {/* ============== TOPBAR ============== */}
      <div
        className="flex items-center px-[18px] gap-4 flex-shrink-0"
        style={{ height: 50, background: "#16161a", borderBottom: "1px solid #2e2e38" }}
      >
        {/* Logo */}
        <div
          className="font-bold text-[17px] tracking-[-0.3px]"
          style={{ fontFamily: "var(--font-vi), 'Space Grotesk', system-ui, sans-serif", marginRight: 12 }}
        >
          Ad<span style={{ color: "#00e5b4" }}>Sup</span>
        </div>

        {/* Ratio tabs */}
        <div
          className="flex items-center gap-1 px-1 py-1"
          style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 8 }}
        >
          {aspectRatios.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRatio(r)}
              className="px-3 py-1 text-[12px] font-medium transition-all"
              style={{
                borderRadius: 6,
                border: "none",
                background: activeRatio === r ? "#00e5b4" : "transparent",
                color: activeRatio === r ? "#0a0a0c" : "#9898b0",
                fontWeight: activeRatio === r ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Matrix Bot */}
        <button
          onClick={onSwitchModule}
          className="px-[14px] py-[7px] text-[12px] font-medium transition-all"
          style={{
            background: "#26262e",
            border: "1px solid #2e2e38",
            borderRadius: 6,
            color: "#9898b0",
            cursor: "pointer",
          }}
        >
          Matrix Bot
        </button>

        {/* User info */}
        <div className="flex items-center gap-[10px] px-[12px] py-[6px]" style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, cursor: "pointer" }}>
          <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full text-[10px] font-bold" style={{ background: "#00e5b4", color: "#0a0a0c" }}>
            K
          </div>
          <span className="text-[12px] font-medium" style={{ color: "#f0f0f5" }}>
            Khang
          </span>
        </div>
      </div>

      {/* ============== MAIN LAYOUT ============== */}
      <div className="flex flex-1" style={{ display: "grid", gridTemplateColumns: "580px 1fr 450px", minHeight: 0, overflow: "hidden" }}>

        {/* ============== LEFT PANEL ============== */}
        <div
          className="flex flex-col gap-5 overflow-y-auto editor-scroll flex-shrink-0"
          style={{ background: "#16161a", borderRight: "1px solid #2e2e38", padding: 16 }}
        >
          {/* Library section */}
          <div>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="text-[14px] font-bold" style={{ color: "#f0f0f5" }}>Thu viện</div>
            </div>

            {/* Tab pills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {[
                { label: "Sản phẩm" },
                { label: "Nhân vật" },
                { label: "Mẫu template" },
                { label: "Chiến dịch" },
              ].map((tab, i) => (
                <button
                  key={i}
                  className="flex items-center gap-[5px] px-[11px] py-[5px] text-[11.5px] font-medium transition-all"
                  style={{
                    borderRadius: 20,
                    background: i === 0 ? "rgba(0,229,180,0.12)" : "#1e1e24",
                    border: `1px solid ${i === 0 ? "#00e5b4" : "#2e2e38"}`,
                    color: i === 0 ? "#00e5b4" : "#9898b0",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <div className="grid gap-2 mb-[10px]" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className="flex flex-col transition-all"
                  style={{
                    background: "#1e1e24",
                    border: `1px solid ${selectedProduct === p.id ? "#00e5b4" : "#2e2e38"}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: selectedProduct === p.id ? "0 0 0 2px rgba(0,229,180,0.12)" : "none",
                  }}
                >
                  <div
                    className="flex items-center justify-center text-[36px]"
                    style={{ aspectRatio: "1", background: "#26262e" }}
                  >
                    {p.thumb}
                  </div>
                  <div
                    className="text-[11px] text-center px-2 py-[6px]"
                    style={{
                      color: "#9898b0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Action row */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button className="flex items-center gap-[6px] px-3 py-[7px] text-[11.5px] transition-all"
                style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#9898b0", cursor: "pointer" }}>
                Upload sản phẩm
              </button>
              <button className="flex items-center gap-[6px] px-3 py-[7px] text-[11.5px] transition-all"
                style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#9898b0", cursor: "pointer" }}>
                Tự động xóa nền
              </button>
              <div className="flex items-center gap-[6px] px-3 py-[7px] text-[11.5px] flex-1 min-w-0"
                style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#9898b0" }}>
                
                <input
                  type="text"
                  placeholder="Bắt đầu..."
                  className="bg-transparent border-none outline-none text-[11.5px] w-full"
                  style={{ color: "#f0f0f5", fontFamily: "var(--font-vi), 'DM Sans', system-ui, sans-serif" }}
                />
              </div>
              <button className="flex items-center justify-center"
                style={{ width: 32, height: 32, background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#9898b0", cursor: "pointer" }}>
                
              </button>
            </div>
          </div>

          {/* Avatar section */}
          <div>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-2">
                <span style={{ color: "#00e5b4", display: "flex", alignItems: "center" }}></span>
                <span className="text-[14px] font-bold" style={{ color: "#f0f0f5" }}>Chọn nhân vật video</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[11px]" style={{ color: "#5a5a72" }}>Patche merrat</span>
                <span style={{ color: "#5a5a72", fontSize: 14 }}></span>
              </div>
            </div>

            <div className="grid gap-2 mb-[10px]" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
              {avatarCards.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAvatar(a.id)}
                  className="flex flex-col transition-all"
                  style={{
                    background: "#1e1e24",
                    border: `1px solid ${selectedAvatar === a.id ? "#00e5b4" : "#2e2e38"}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: selectedAvatar === a.id ? "0 0 0 2px rgba(0,229,180,0.12)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center text-[24px]" style={{ aspectRatio: "3/4", background: "#26262e" }}>
                    {a.thumb}
                  </div>
                  <div className="text-[10px] text-center px-1 py-[4px]" style={{ color: "#9898b0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {a.label}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-[5px]">
              {["San piërs", "Ảnh Real", "Ảnh AI", "Influencer", "Trung niên", "Giới t..."].map((f, i) => (
                <button
                  key={i}
                  className="flex items-center gap-[4px] px-[9px] py-[3px] text-[10.5px] transition-all"
                  style={{
                    borderRadius: 20,
                    background: i === 1 ? "rgba(74,158,255,0.15)" : "#1e1e24",
                    border: `1px solid ${i === 1 ? "#4a9eff" : "#2e2e38"}`,
                    color: i === 1 ? "#4a9eff" : "#9898b0",
                    cursor: "pointer",
                  }}
                >

                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Template section */}
          <div>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-2">
                <span style={{ color: "#00e5b4", display: "flex", alignItems: "center" }}></span>
                <span className="text-[14px] font-bold" style={{ color: "#f0f0f5" }}>Chọn template video</span>
              </div>
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {templateCards.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className="flex flex-col transition-all"
                  style={{
                    background: "#1e1e24",
                    border: `1px solid ${selectedTemplate === t.id ? "#00e5b4" : "#2e2e38"}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center justify-center text-[28px] relative"
                    style={{ aspectRatio: "9/16", background: "#26262e" }}>
                    {t.thumb}
                  </div>
                  <div className="text-[10.5px] text-center px-1 py-[5px]" style={{ color: "#9898b0" }}>
                    {t.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nhân vật expanded section */}
          <div style={{ borderTop: "1px solid #2e2e38", paddingTop: 16 }}>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-2">
                <span style={{ color: "#00e5b4", display: "flex", alignItems: "center" }}></span>
                <span className="text-[14px] font-bold" style={{ color: "#f0f0f5" }}>Nhân vật</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-[6px] px-3 py-[5px]"
                  style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, width: 140 }}>
                  
                  <input type="text" placeholder="Tìm nhân vật..." className="bg-transparent border-none outline-none text-[11px] w-full"
                    style={{ color: "#f0f0f5", fontFamily: "var(--font-vi), 'DM Sans', system-ui, sans-serif" }} />
                </div>
                <button style={{ width: 28, height: 28, background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#9898b0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  
                </button>
              </div>
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-[5px] mb-[10px]">
              {nvCats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveNV(cat)}
                  className="flex items-center gap-[4px] px-[10px] py-[4px] text-[11px] font-medium transition-all"
                  style={{
                    borderRadius: 20,
                    background: activeNV === cat ? "rgba(0,229,180,0.12)" : "#1e1e24",
                    border: `1px solid ${activeNV === cat ? "#00e5b4" : "#2e2e38"}`,
                    color: activeNV === cat ? "#00e5b4" : "#9898b0",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Big avatar grid */}
            <div className="grid gap-2 mb-[10px]" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {nvCards.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedNV(c.id)}
                  className="flex flex-col transition-all relative"
                  style={{
                    background: "#1e1e24",
                    border: `1px solid ${selectedNV === c.id ? "#00e5b4" : "#2e2e38"}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: selectedNV === c.id ? "0 0 0 2px rgba(0,229,180,0.12)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center text-[32px]"
                    style={{ aspectRatio: "3/4", background: nvBgColors[c.badgeClass] || "#26262e" }}>
                    {c.thumb}
                  </div>
                  <div
                    className="absolute top-[6px] right-[6px] text-[9px] font-bold px-[6px] py-[2px]"
                    style={{ borderRadius: 4, ...nvBadgeColors[c.badgeClass] }}
                  >
                    {c.badge}
                  </div>
                  <div className="text-[10.5px] text-center px-1 py-[5px]" style={{ color: "#9898b0" }}>
                    {c.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Upload custom */}
            <button className="flex items-center justify-center gap-[7px] w-full px-[14px] py-[9px] text-[12px] font-medium transition-all"
              style={{ background: "#1e1e24", border: "1px dashed #2e2e38", borderRadius: 10, color: "#9898b0", cursor: "pointer" }}>
              Upload nhân vật của bạn
            </button>
          </div>
        </div>

        {/* ============== CENTER PANEL ============== */}
        <div className="flex flex-col" style={{ background: "#0f0f11", minHeight: 0 }}>
          {/* Preview header */}
          <div className="flex items-center justify-between px-[18px] py-[12px]"
            style={{ borderBottom: "1px solid #2e2e38" }}>
            <div className="flex items-center gap-2 text-[14px] font-bold">
              Video preview
              <button className="flex items-center justify-center"
                style={{
                  width: 16, height: 16,
                  background: "#1e1e24", border: "1px solid #2e2e38",
                  borderRadius: "50%", fontSize: 10, color: "#5a5a72", cursor: "pointer",
                }}>
                ?
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="relative flex items-center justify-center" style={{ flex: 1, minHeight: 0, padding: "16px" }}>
            <div
              className="relative w-full transition-all"
              style={{
                borderRadius: 12,
                background: "#000",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                maxWidth: 600,
                paddingBottom: "56.25%",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1a1a24 0%, #0d0d16 100%)" }}>
                <span className="text-[80px]"></span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.15)" }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <button className="flex items-center justify-center transition-all"
                  style={{ width: 56, height: 56, background: "#00e5b4", border: "medium", borderRadius: "50%", cursor: "pointer" }}>
                  {isPlaying
                    ? <Pause size={22} fill="#0a0a0c" />
                    : <Play size={22} fill="#0a0a0c" className="ml-[2px]" />
                  }
                </button>
              </div>
              <div className="absolute text-[11px]"
                style={{ top: 10, right: 10, padding: "3px 8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: 4, color: "#9898b0" }}>
                {activeRatio}
              </div>
            </div>
          </div>

          {/* Video controls */}
          <div className="flex items-center gap-2 px-4 pt-2 flex-shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center"
              style={{
                width: 28, height: 28,
                background: "#00e5b4",
                border: "none",
                borderRadius: "50%",
                color: "#0a0a0c",
                cursor: "pointer",
              }}
            >
              {isPlaying
                ? <Pause size={14} fill="#0a0a0c" />
                : <Play size={14} fill="#0a0a0c" />
              }
            </button>
            <span className="text-[12px]" style={{ color: "#9898b0", fontFamily: "var(--font-mono), monospace" }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <div
              className="flex-1 h-[4px] relative cursor-pointer"
              style={{ background: "#26262e", borderRadius: 2 }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const pct = Math.max(0, Math.min(1, x / rect.width))
                setCurrentTime(pct * duration)
              }}
            >
              <div
                className="h-full absolute left-0 top-0"
                style={{ width: `${progress}%`, background: "#00e5b4", borderRadius: 2 }}
              />
            </div>
            <span style={{ color: "#5a5a72", cursor: "pointer", fontSize: 16 }}></span>
            <span style={{ color: "#5a5a72", cursor: "pointer", fontSize: 16 }}></span>
          </div>

          {/* Tracks section */}
          <div className="flex flex-col gap-2 px-4 py-3 flex-shrink-0">
            {/* VIDEO track */}
            <div style={{ background: "#16161a", border: "1px solid #2e2e38", borderRadius: 10, overflow: "hidden" }}>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-wide" style={{ color: "#9898b0" }}>
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#00e5b4" }} />
                  VIDEO
                </div>
              </div>
              <div className="px-3 pb-3">
                <div className="flex items-center gap-[1.5px] h-[30px]" style={{ background: "#1e1e24", borderRadius: 5, overflow: "hidden", padding: "0 8px" }}>
                  {waveformHeights.map((h, i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-[1px] flex-shrink-0"
                      style={{ height: `${h}%`, background: "#00e5b4", opacity: 0.6 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* AUDIO track */}
            <div style={{ background: "#16161a", border: "1px solid #2e2e38", borderRadius: 10, overflow: "hidden" }}>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-wide" style={{ color: "#9898b0" }}>
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#4a9eff" }} />
                  AUDIO
                </div>
              </div>
              <div className="px-3 pb-3">
                <div className="flex items-center gap-[10px] py-[8px]" style={{ borderBottom: "1px solid #2e2e38" }}>
                  <div className="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center text-[14px]" style={{ background: "#26262e" }}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium" style={{ color: "#f0f0f5" }}>BeatVlog 01</div>
                    <div className="text-[10px]" style={{ color: "#5a5a72" }}>Aủl nlaoo</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div style={{ width: 60, height: 3, background: "#26262e", borderRadius: 2, position: "relative" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "70%", background: "#4a9eff", borderRadius: 2 }} />
                    </div>
                    <span className="text-[10px]" style={{ color: "#5a5a72" }}>50r/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT track */}
            <div style={{ background: "#16161a", border: "1px solid #2e2e38", borderRadius: 10, overflow: "hidden" }}>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-wide" style={{ color: "#9898b0" }}>
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#ffc84a" }} />
                  TEXT
                </div>
                <span className="text-[10px]" style={{ color: "#5a5a72" }}>≈ số 182 · 182:20%</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center gap-2 px-4 py-[10px] flex-shrink-0"
            style={{ borderTop: "1px solid #2e2e38", background: "#16161a" }}
          >
            {[
              { label: "AI Video" },
              { label: "Tạo hàng loạt" },
              { label: "Lưu bản nháp" },
            ].map((btn, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-[7px] px-[14px] py-[9px] text-[12px] font-semibold transition-all flex-1"
                style={{
                  background: "#1e1e24",
                  border: "1px solid #2e2e38",
                  borderRadius: 6,
                  color: "#9898b0",
                  cursor: "pointer",
                }}
              >
                {btn.label}
              </button>
            ))}
            <button
              className="px-4 py-[9px] text-[13px] font-bold flex-1 transition-all"
              style={{
                background: "#00e5b4",
                border: "none",
                borderRadius: 6,
                color: "#0a0a0c",
                cursor: "pointer",
                boxShadow: "0 0 18px rgba(0,229,180,0.3)",
              }}
            >
              XUẤT VIDEO
            </button>
          </div>
        </div>

        {/* ============== RIGHT PANEL ============== */}
        <div
          className="flex flex-col gap-4 overflow-y-auto editor-scroll flex-shrink-0"
          style={{ background: "#16161a", borderLeft: "1px solid #2e2e38", padding: 14 }}
        >
          {/* Text Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.7px] mb-[8px]" style={{ color: "#5a5a72" }}>
              Văn bản
            </div>
            {["Poppins", "Poppins"].map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-[10px] py-[8px] mb-[6px] text-[12px]"
                style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#f0f0f5", cursor: "pointer" }}
              >
                <span>{f}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            ))}
            <div className="px-[10px] py-[8px] mb-[6px] text-[11px]" style={{ background: "#26262e", border: "1px solid #2e2e38", borderRadius: 6, color: "#5a5a72" }}>
              Monescrat
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.5px] mb-[8px]" style={{ color: "#5a5a72" }}>
              KIIOT FNUDG
            </div>
            <div className="flex items-center gap-2 mb-[8px]">
              <div className="px-[10px] py-[4px] text-[13px] font-bold"
                style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 6, color: "#f0f0f5" }}>
                24
              </div>
              <div className="flex gap-1 flex-1">
                {[
                  { label: "B", active: activeFormat.includes("B"), onClick: () => toggleFormat("B") },
                  { label: "U", active: activeFormat.includes("U"), onClick: () => toggleFormat("U") },
                  { label: "I", active: activeFormat.includes("I"), onClick: () => toggleFormat("I") },
                  { label: "≡", active: activeFormat.includes("≡"), onClick: () => toggleFormat("≡") },
                  { label: "≣", active: false, onClick: () => {} },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.onClick}
                    className="flex-1 py-[5px] text-[12px] font-bold transition-all"
                    style={{
                      background: btn.active ? "rgba(0,229,180,0.12)" : "#1e1e24",
                      border: `1px solid ${btn.active ? "#00e5b4" : "#2e2e38"}`,
                      borderRadius: 6,
                      color: btn.active ? "#00e5b4" : "#9898b0",
                      cursor: "pointer",
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "#2e2e38" }} />

          {/* Audio Section */}
          <div style={{ minHeight: 290 }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.7px] mb-[8px]" style={{ color: "#5a5a72" }}>
              Âm thanh
            </div>
            {audioItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 py-[7px]"
                style={{ borderBottom: "1px solid #2e2e38" }}
              >
                <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center text-[14px] flex-shrink-0"
                  style={{ background: "#26262e" }}>
                  {item.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate" style={{ color: "#f0f0f5" }}>{item.name}</div>
                  <div className="text-[10px] truncate" style={{ color: "#5a5a72" }}>{item.sub}</div>
                </div>
                <div className="px-[6px] py-[2px] text-[10px] flex-shrink-0"
                  style={{ background: "#26262e", border: "1px solid #2e2e38", borderRadius: 4, color: "#5a5a72" }}>
                  {item.id === "1" ? "686." : "GBX"}
                </div>
                <button
                  className="w-[24px] h-[24px] rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: "#26262e", border: "1px solid #2e2e38", color: "#5a5a72", cursor: "pointer" }}
                >
                  
                </button>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "#2e2e38" }} />

          {/* History Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.7px] mb-[8px]" style={{ color: "#5a5a72" }}>
              Lịch sử
            </div>
            <div className="grid gap-[6px]" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[8px] overflow-hidden cursor-pointer transition-all flex flex-col"
                  style={{ background: "#1e1e24", border: "1px solid #2e2e38" }}
                >
                  <div
                    className="w-full flex items-center justify-center text-[32px] flex-shrink-0"
                    style={{ aspectRatio: "1", background: "#26262e" }}
                  >
                  </div>
                  <div className="flex items-center gap-[4px] px-[8px] py-[6px]">
                    <span className="text-[10px] truncate" style={{ color: "#9898b0" }}>
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
