"use client"

import {
  LayoutDashboard,
  Users,
  Radio,
  Zap,
  Settings,
  LogOut,
  Clapperboard,
} from "lucide-react"
import type { BotViewType } from "./matrix-bot"

interface BotSidebarProps {
  activeView: BotViewType
  onViewChange: (view: BotViewType) => void
  onLogout?: () => void
  onSwitchModule?: () => void
}

const navItems: {
  id: BotViewType
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "accounts", label: "Quản lý Tài khoản", icon: Users },
  { id: "channels", label: "Quản lý Kênh", icon: Radio },
  { id: "auto-remix", label: "Treo Auto Remix", icon: Zap },
  { id: "api-config", label: "Cấu hình API", icon: Settings },
]

export function BotSidebar({
  activeView,
  onViewChange,
  onLogout,
  onSwitchModule,
}: BotSidebarProps) {
  return (
    <aside className="flex h-full w-56 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-center text-lg font-bold tracking-wide text-foreground">
          MATRIX BOT
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-border p-3 space-y-2">
        {onSwitchModule && (
          <button
            onClick={onSwitchModule}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700"
          >
            <Clapperboard className="h-4 w-4" />
            <span>Studio Editor</span>
          </button>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </button>
        )}
      </div>
    </aside>
  )
}
