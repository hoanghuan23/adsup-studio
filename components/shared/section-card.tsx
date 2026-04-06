"use client"

import { cn } from "@/lib/utils"

interface SectionCardProps {
  title?: string
  children: React.ReactNode
  className?: string
  titleClassName?: string
  actions?: React.ReactNode
}

export function SectionCard({
  title,
  children,
  className,
  titleClassName,
  actions,
}: SectionCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className={cn("text-sm font-medium text-foreground", titleClassName)}>
            {title}
          </h2>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
