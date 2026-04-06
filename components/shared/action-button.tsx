"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type ActionVariant = "primary" | "secondary" | "ghost" | "destructive"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionVariant
  isLoading?: boolean
  icon?: React.ReactNode
}

const variantClasses: Record<ActionVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-foreground hover:bg-secondary/80",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
  destructive: "hover:bg-destructive/10 hover:text-destructive",
}

export function ActionButton({
  variant = "primary",
  isLoading,
  icon,
  children,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  )
}
