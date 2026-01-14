"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 md:flex-col">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative h-20 w-16 flex-shrink-0 overflow-hidden border-2 transition-all",
              selectedIndex === index ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Imagen ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-muted">
        <Image
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
      </div>
    </div>
  )
}
