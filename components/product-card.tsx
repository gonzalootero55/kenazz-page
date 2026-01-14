"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product & { canonical_url?: string } // Agregamos la URL de Tiendanube
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={product.canonical_url || "#"} // Usa el link directo de Tiendanube
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* Imagen principal con efecto suave de V0 */}
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100",
          )}
        />
        {/* Segunda imagen de Tiendanube al pasar el mouse */}
        {product.images[1] && (
          <Image
            src={product.images[1] || "/placeholder.svg"}
            alt={`${product.name} - Vista alternativa`}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0",
            )}
          />
        )}

        {/* Quick view overlay: Ahora dice "Comprar ahora" */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center bg-white/90 py-3 transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
          )}
        >
          <span className="text-[10px] font-light uppercase tracking-[0.3em] text-black">
            Comprar en Tienda
          </span>
        </div>
      </div>

      {/* Info del producto con el estilo minimalista de V0 */}
      <div className="mt-4 space-y-1 text-center">
        <h3 className="text-[11px] uppercase tracking-widest font-light transition-colors group-hover:text-gray-500">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-medium tracking-widest">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </a>
  )
}