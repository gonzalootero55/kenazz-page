"use client"

import { cn } from "@/lib/utils"

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest">Talle</span>
        <button className="text-xs text-muted-foreground underline transition-colors hover:text-foreground">
          Guía de talles
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              "flex h-10 min-w-[2.5rem] items-center justify-center border px-3 text-sm transition-all",
              selectedSize === size
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground",
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
