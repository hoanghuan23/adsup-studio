"use client"

import { useState } from "react"
import { Plus, X, Play, Square } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { ActionButton } from "@/components/shared/action-button"
import { FormInput } from "@/components/shared/form-input"

interface Account {
  id: string
  tiktokId: string
  email: string
  maxVideo: number
  enabled: boolean
}

const initialAccounts: Account[] = [
  { id: "1", tiktokId: "24h.vui.v8", email: "abc", maxVideo: 3, enabled: false },
  { id: "2", tiktokId: "gbn.car.24h", email: "car123@gmail.com", maxVideo: 3, enabled: true },
  { id: "3", tiktokId: "showbiz124h", email: "showbiz124h@gmail.com", maxVideo: 3, enabled: false },
  { id: "4", tiktokId: "taichinh24444h", email: "muhammadfariqmuhsin...", maxVideo: 3, enabled: false },
  { id: "5", tiktokId: "tintucthammy24h", email: "tintucthammy24h", maxVideo: 3, enabled: false },
  { id: "6", tiktokId: "phongmokechuyen01", email: "phongmokechuyen01@g...", maxVideo: 3, enabled: false },
]

export function DashboardView() {
  const [timeInput, setTimeInput] = useState("")
  const [scheduledTimes, setScheduledTimes] = useState(["12:27", "13:18", "15:00", "18:00"])
  const [isRunning, setIsRunning] = useState(false)
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)

  const handleAddTime = () => {
    if (timeInput && !scheduledTimes.includes(timeInput)) {
      setScheduledTimes([...scheduledTimes, timeInput])
      setTimeInput("")
    }
  }

  const handleRemoveTime = (time: string) => {
    setScheduledTimes(scheduledTimes.filter((t) => t !== time))
  }

  const toggleAccount = (id: string) => {
    setAccounts(accounts.map((acc) =>
      acc.id === id ? { ...acc, enabled: !acc.enabled } : acc
    ))
  }

  const updateMaxVideo = (id: string, value: number) => {
    setAccounts(accounts.map((acc) =>
      acc.id === id ? { ...acc, maxVideo: value } : acc
    ))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Dashboard</h1>

      {/* Schedule Section */}
      <SectionCard>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              Cấu hình Lịch chạy (Giờ:Phút):
            </span>
            <FormInput
              type="text"
              placeholder="Ví dụ: 08:30"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              className="w-32"
            />
            <ActionButton
              variant="primary"
              onClick={handleAddTime}
              icon={<Plus className="h-4 w-4" />}
            >
              Thêm Giờ
            </ActionButton>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Các giờ bot sẽ chạy:</span>
            {scheduledTimes.map((time) => (
              <span
                key={time}
                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm text-foreground"
              >
                {time}
                <button
                  onClick={() => handleRemoveTime(time)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Run/Stop Buttons */}
      <div className="flex gap-4">
        <ActionButton
          variant="primary"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          className="flex-1 py-3"
          icon={<Play className="h-4 w-4" />}
        >
          [RUN] KHỞI ĐỘNG HỆ THỐNG
        </ActionButton>
        <ActionButton
          variant="ghost"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="flex-1 py-3"
          icon={<Square className="h-4 w-4" />}
        >
          [STOP] DỪNG HỆ THỐNG
        </ActionButton>
      </div>

      {/* Status */}
      <p className="text-sm text-muted-foreground">
        Trạng thái: {isRunning ? "Đang chạy..." : "Đang chờ..."}
      </p>

      {/* Accounts Table */}
      <SectionCard title="[*] Danh sách tài khoản trên Supabase:">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Bật/Tắt</th>
                <th className="px-4 py-3 font-medium">TikTok ID</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Max Video/Lần</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={account.enabled}
                      onChange={() => toggleAccount(account.id)}
                      className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{account.tiktokId}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{account.email}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={account.maxVideo}
                      onChange={(e) => updateMaxVideo(account.id, parseInt(e.target.value) || 0)}
                      className="w-20 rounded-md border border-border bg-input px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
