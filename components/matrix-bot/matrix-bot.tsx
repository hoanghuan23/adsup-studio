"use client"

import { useState } from "react"
import { BotSidebar } from "./bot-sidebar"
import { DashboardView } from "./views/dashboard-view"
import { AccountsView } from "./views/accounts-view"
import { ChannelsView } from "./views/channels-view"
import { AutoRemixView } from "./views/auto-remix-view"
import { ApiConfigView } from "./views/api-config-view"

export type BotViewType =
  | "dashboard"
  | "accounts"
  | "channels"
  | "auto-remix"
  | "api-config"

interface MatrixBotProps {
  onLogout?: () => void
  onSwitchModule?: () => void
}

export function MatrixBot({ onLogout, onSwitchModule }: MatrixBotProps) {
  const [activeView, setActiveView] = useState<BotViewType>("dashboard")

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />
      case "accounts":
        return <AccountsView />
      case "channels":
        return <ChannelsView />
      case "auto-remix":
        return <AutoRemixView />
      case "api-config":
        return <ApiConfigView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <BotSidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
        onSwitchModule={onSwitchModule}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {renderView()}
      </main>
    </div>
  )
}
