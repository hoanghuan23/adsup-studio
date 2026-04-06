"use client"

import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface AppSidebarProps {
  navItems: NavItem[]
  activeId: string
  onNavChange: (id: string) => void
  title: string
  bottomActions?: React.ReactNode
  className?: string
}

export function AppSidebar({
  navItems,
  activeId,
  onNavChange,
  title,
  bottomActions,
  className,
}: AppSidebarProps) {
  return (
    <aside className={cn("flex h-full w-56 flex-col border-r border-border bg-card", className)}>
      {/* Logo / Title */}
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-center text-lg font-bold tracking-wide text-foreground">
          {title}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      {bottomActions && (
        <div className="border-t border-border p-3">
          {bottomActions}
        </div>
      )}
    </aside>
  )
}
