"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { SizeSelector } from "@/components/size-selector"
import { ProductCard } from "@/components/product-card"
import { getProductById, formatPrice, products } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Por favor selecciona un talle")
      return
    }
    setError(null)
    addItem(product, selectedSize)
  }

  // Get related products (same category, different product)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/catalogo"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="mb-4 flex gap-2">
                {product.new && (
                  <span className="bg-foreground px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
                    Nuevo
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-primary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                    Sale
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl tracking-wide md:text-4xl">{product.name}</h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="font-serif text-2xl">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="mt-8">
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSizeChange={(size) => {
                    setSelectedSize(size)
                    setError(null)
                  }}
                />
                {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  size="lg"
                >
                  Agregar al carrito
                </Button>
                <p className="text-center text-xs text-muted-foreground">Envío gratis en compras sobre $50.000</p>
              </div>

              {/* Additional info */}
              <div className="mt-10 space-y-4 border-t pt-8">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium">
                    Detalles del producto
                    <span className="transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <p className="pb-4 pt-2 text-sm text-muted-foreground">
                    Material premium de alta calidad. Lavado a mano recomendado. Fabricado localmente con los más altos
                    estándares de calidad.
                  </p>
                </details>
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium">
                    Envío y devoluciones
                    <span className="transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <p className="pb-4 pt-2 text-sm text-muted-foreground">
                    Envío express 24-48h en la Región Metropolitana. Devoluciones gratuitas dentro de los 30 días.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="mb-8 font-serif text-2xl tracking-wide">También te puede gustar</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
