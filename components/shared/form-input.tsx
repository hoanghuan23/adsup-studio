"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Input {...props} />
    </div>
  )
}
