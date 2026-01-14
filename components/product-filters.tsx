"use client"

import { useState } from "react"
import { categories } from "@/lib/products"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

const priceRanges: { label: string; value: [number, number] }[] = [
  { label: "Todos", value: [0, Number.POSITIVE_INFINITY] },
  { label: "Hasta $30.000", value: [0, 30000] },
  { label: "$30.000 - $45.000", value: [30000, 45000] },
  { label: "Más de $45.000", value: [45000, Number.POSITIVE_INFINITY] },
]

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest">Categoría</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "py-1.5 text-left text-sm transition-colors hover:text-foreground",
                selectedCategory === category.id ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest">Precio</h3>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => onPriceRangeChange(range.value)}
              className={cn(
                "py-1.5 text-left text-sm transition-colors hover:text-foreground",
                priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <FilterContent />
      </aside>

      {/* Mobile filter button */}
      <div className="mb-6 lg:hidden">
        <Button variant="outline" size="sm" onClick={() => setIsMobileOpen(true)} className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMobileOpen(false)}
      />
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-background px-6 py-8 shadow-xl transition-transform duration-500 ease-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-lg tracking-wide">Filtros</h2>
          <button onClick={() => setIsMobileOpen(false)} className="p-2 transition-opacity hover:opacity-60">
            <X className="h-5 w-5" />
          </button>
        </div>
        <FilterContent />
      </div>
    </>
  )
}
