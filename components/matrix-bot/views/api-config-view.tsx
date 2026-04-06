"use client"

import { useState } from "react"
import { toast } from "sonner"
import { SectionCard } from "@/components/shared/section-card"
import { ActionButton } from "@/components/shared/action-button"
import { FormInput } from "@/components/shared/form-input"

export function ApiConfigView() {
  const [config, setConfig] = useState({
    supabaseUrl: "https://iynwmytfroatvzhbkodf.supabase.c",
    supabaseKey: "************************************************************",
    aiStudioUrl: "https://aistudio.google.com/app/apps/1c93e2d7-cf23-4d12-b191-2438c2c50587?fullscreenApplet=true",
    ttsApiKey: "************************************",
    voiceId: "voice-5f257d4b-348e-486b",
    googleSheetUrl: "https://script.google.com/macros/s/AKfycbwFf388vFhruw_eKOra_uGKItu6SdJQnSiA2dkovmkC6tWPF",
    telegramToken: "8649037286:AAEZ8NGI7p4qmpQEcG8Q7...",
    telegramChatId: "1801644744",
    machineNumber: "1",
  })

  const handleSave = () => {
    toast.success("Đã lưu cấu hình thành công!")
  }

  const updateConfig = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Cấu hình API & Hệ thống</h1>

      <SectionCard>
        <div className="p-6 space-y-6">
          {/* Section 0: Database */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-primary">0. Kết nối Database (Lưu vào .env):</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">URL:</span>
                <FormInput
                  type="text"
                  value={config.supabaseUrl}
                  onChange={(e) => updateConfig("supabaseUrl", e.target.value)}
                  className="w-80"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Key:</span>
                <FormInput
                  type="password"
                  value={config.supabaseKey}
                  onChange={(e) => updateConfig("supabaseKey", e.target.value)}
                  className="w-80"
                />
              </div>
            </div>
          </div>

          {/* Section 1: AI Studio */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">1. Hệ thống AI Studio URL:</h3>
            <FormInput
              type="text"
              value={config.aiStudioUrl}
              onChange={(e) => updateConfig("aiStudioUrl", e.target.value)}
            />
          </div>

          {/* Section 2: TTS */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">2. Text-to-Speech (API Key EverAI):</h3>
            <FormInput
              type="password"
              value={config.ttsApiKey}
              onChange={(e) => updateConfig("ttsApiKey", e.target.value)}
            />
            <div className="space-y-1.5">
              <h4 className="text-sm text-muted-foreground">Voice ID Mặc định:</h4>
              <FormInput
                type="text"
                value={config.voiceId}
                onChange={(e) => updateConfig("voiceId", e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Google Sheet */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">3. Google Sheet (Apps Script URL):</h3>
            <FormInput
              type="text"
              value={config.googleSheetUrl}
              onChange={(e) => updateConfig("googleSheetUrl", e.target.value)}
            />
          </div>

          {/* Section 4: Telegram */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-destructive">4. Bot Telegram Báo cáo (Tùy chọn):</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Bot Token:</span>
                <FormInput
                  type="text"
                  value={config.telegramToken}
                  onChange={(e) => updateConfig("telegramToken", e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Chat ID:</span>
                <FormInput
                  type="text"
                  value={config.telegramChatId}
                  onChange={(e) => updateConfig("telegramChatId", e.target.value)}
                  className="w-40"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Machine */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-orange-400">5. Cấu hình Phần Máy (Chỉ lưu ở máy này, không lên Cloud):</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">Định danh máy số:</span>
              <FormInput
                type="number"
                value={config.machineNumber}
                onChange={(e) => updateConfig("machineNumber", e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          {/* Save Button */}
          <ActionButton
            variant="primary"
            onClick={handleSave}
            className="px-6 py-3 font-semibold"
          >
            [SAVE] LƯU TOÀN BỘ CẤU HÌNH
          </ActionButton>
        </div>
      </SectionCard>
    </div>
  )
}
