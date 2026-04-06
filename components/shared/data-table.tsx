"use client"

import { cn } from "@/lib/utils"

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  className?: string
  rowClassName?: string
  emptyMessage?: string
}

export function DataTable<T>({
  columns,
  data,
  keyField,
  className,
  rowClassName,
  emptyMessage = "Không có dữ liệu",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left text-sm text-muted-foreground">
            {columns.map((col) => (
              <th key={String(col.key)} className={cn("px-4 py-3 font-medium", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[keyField])}
              className={cn(
                "border-b border-border/50 last:border-0",
                rowClassName,
              )}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className={cn("px-4 py-3 text-sm", col.className)}>
                  {col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
