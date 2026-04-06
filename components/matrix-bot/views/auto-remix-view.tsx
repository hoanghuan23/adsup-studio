"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { ActionButton } from "@/components/shared/action-button"

export function AutoRemixView() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "[19:17:04] Hệ thống đã kết nối với Core Worker. Nhấn BẬT TREO AUTO để bắt đầu!"
  ])

  const getTimestamp = () => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
  }

  const handleToggle = () => {
    if (!isRunning) {
      setIsRunning(true)
      setLogs((prev) => [...prev, `[${getTimestamp()}] Đang khởi động Trạm Auto Remix...`])
    } else {
      setIsRunning(false)
      setLogs((prev) => [...prev, `[${getTimestamp()}] Đã dừng Trạm Auto Remix.`])
    }
  }

  useEffect(() => {
    if (!isRunning) return

    const messages = [
      "Đang quét danh sách video từ kênh nguồn...",
      "Tìm thấy 3 video mới cần remix.",
      "Đang xử lý video 1/3...",
      "Áp dụng hiệu ứng Vid Intro...",
      "Đang render video...",
      "Video 1/3 hoàn thành!",
      "Đang xử lý video 2/3...",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < messages.length) {
        setLogs((prev) => [...prev, `[${getTimestamp()}] ${messages[index]}`])
        index++
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning])

  const getLogColor = (log: string) => {
    if (log.includes("hoàn thành") || log.includes("kết nối")) return "text-green-500"
    if (log.includes("Đã dừng") || log.includes("lỗi")) return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <div className="flex h-full flex-col space-y-6">
      <h1 className="text-xl font-bold text-foreground">Trạm Auto Remix</h1>

      {/* Toggle Button */}
      <div className="flex justify-center">
        <ActionButton
          variant={isRunning ? "destructive" : "primary"}
          onClick={handleToggle}
          className="px-12 py-4 text-lg font-bold"
          icon={<Play className={`h-6 w-6 ${isRunning ? "animate-pulse" : ""}`} />}
        >
          {isRunning ? "[■] TẮT TREO AUTO" : "[>] BẬT TREO AUTO"}
        </ActionButton>
      </div>

      {/* Logs Section */}
      <SectionCard title="Nhật ký hoạt động (Logs):" className="flex-1">
        <div className="h-[400px] overflow-y-auto bg-muted/20 p-4 font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index} className={`mb-1 ${getLogColor(log)}`}>
              {log}
            </div>
          ))}
          {isRunning && (
            <div className="mt-2 flex items-center gap-2 text-primary">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Đang chờ task tiếp theo...
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
