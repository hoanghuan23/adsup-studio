"use client"

import { useState } from "react"
import { ExternalLink, Trash2 } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { ActionButton } from "@/components/shared/action-button"
import { FormInput } from "@/components/shared/form-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ParamTab = "vid-intro" | "vid-content" | "chu-intro" | "chu-content" | "assets"

const paramTabs: { id: ParamTab; label: string }[] = [
  { id: "vid-intro", label: "Vid Intro" },
  { id: "vid-content", label: "Vid Content" },
  { id: "chu-intro", label: "Chữ Intro" },
  { id: "chu-content", label: "Chữ Content" },
  { id: "assets", label: "Assets" },
]

interface Channel {
  id: string
  url: string
  limit: number
}

const initialChannels: Channel[] = [
  { id: "1", url: "https://www.tiktok.com/@vietnamhealthnews", limit: 3 },
  { id: "2", url: "https://www.tiktok.com/@blogtamsu.nghenghiep", limit: 3 },
]

const accounts = ["24h.vui.v8", "gbn.car.24h", "showbiz124h", "taichinh24444h"]

export function ChannelsView() {
  const [selectedAccount, setSelectedAccount] = useState("24h.vui.v8")
  const [sourceLink, setSourceLink] = useState("")
  const [videoLimit, setVideoLimit] = useState("3")
  const [activeTab, setActiveTab] = useState<ParamTab>("vid-intro")
  const [channels, setChannels] = useState<Channel[]>(initialChannels)

  const [params, setParams] = useState({
    start: "2.0",
    end: "5.0",
    zoom: "1.0",
    xOffset: "0",
    yOffset: "100",
  })

  const handleAddChannel = () => {
    if (sourceLink) {
      setChannels([...channels, { id: Date.now().toString(), url: sourceLink, limit: parseInt(videoLimit) || 3 }])
      setSourceLink("")
    }
  }

  const handleDeleteChannel = (id: string) => {
    setChannels(channels.filter((ch) => ch.id !== id))
  }

  const totalVideos = channels.reduce((sum, ch) => sum + ch.limit, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Quản lý Kênh</h1>

      {/* Account Selector */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-foreground">Chọn Tài khoản:</span>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((acc) => (
              <SelectItem key={acc} value={acc}>
                {acc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-destructive">Giới hạn tối đa/lần chạy: 3</span>
      </div>

      {/* Main Form */}
      <SectionCard>
        <div className="p-4 space-y-4">
          {/* Source Link */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <ExternalLink className="h-4 w-4" /> Link Nguồn:
            </span>
            <FormInput
              type="text"
              value={sourceLink}
              onChange={(e) => setSourceLink(e.target.value)}
              placeholder="https://www.tiktok.com/@username"
              className="flex-1 min-w-[300px]"
            />
            <span className="text-sm text-foreground">Số video lấy từ kênh này:</span>
            <FormInput
              type="number"
              value={videoLimit}
              onChange={(e) => setVideoLimit(e.target.value)}
              className="w-20"
            />
          </div>

          {/* Param Tabs */}
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            {paramTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Param Grid */}
          <div className="grid grid-cols-5 gap-4 rounded-lg bg-muted/30 p-4">
            <FormInput
              label="Start (s):"
              type="text"
              value={params.start}
              onChange={(e) => setParams({ ...params, start: e.target.value })}
            />
            <FormInput
              label="End (s):"
              type="text"
              value={params.end}
              onChange={(e) => setParams({ ...params, end: e.target.value })}
            />
            <FormInput
              label="Zoom:"
              type="text"
              value={params.zoom}
              onChange={(e) => setParams({ ...params, zoom: e.target.value })}
            />
            <FormInput
              label="X Offset:"
              type="text"
              value={params.xOffset}
              onChange={(e) => setParams({ ...params, xOffset: e.target.value })}
            />
            <FormInput
              label="Y Offset:"
              type="text"
              value={params.yOffset}
              onChange={(e) => setParams({ ...params, yOffset: e.target.value })}
            />
          </div>

          {/* Add Button */}
          <div className="flex justify-center">
            <ActionButton
              variant="primary"
              onClick={handleAddChannel}
              icon={<ExternalLink className="h-4 w-4" />}
            >
              THÊM KÊNH MỚI
            </ActionButton>
          </div>
        </div>
      </SectionCard>

      {/* Tracked Channels */}
      <SectionCard
        title="Danh sách Kênh đang theo dõi:"
        actions={
          <span className="text-sm font-medium text-green-500">
            Tổng video dự kiến: {totalVideos}
          </span>
        }
      >
        <div className="divide-y divide-border">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-foreground">{channel.url}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Limit: {channel.limit}</span>
                <div className="flex items-center gap-2">
                  <button className="rounded-md bg-primary p-1.5 text-primary-foreground hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteChannel(channel.id)}
                    className="rounded-md bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
