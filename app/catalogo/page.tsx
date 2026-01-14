"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"

export default function CatalogoPage() {
  // 1. Estados originales de tu proyecto anterior
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 2. Estados de control de V0 para filtros
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Number.POSITIVE_INFINITY])

  // 3. Tu lógica de conexión a la API original
  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Error en la API');
        return res.json();
      })
      .then(data => {
        // "Traducimos" los datos de Tiendanube al formato que espera el ProductCard de V0
        const mappedData = (Array.isArray(data) ? data : []).map((p: any) => ({
          id: p.id.toString(),
          name: p.name.es,
          price: parseFloat(p.variants[0]?.price || "0"),
          description: p.description?.es || "",
          category: "all", // Puedes ajustar esto si tienes categorías en Tiendanube
          images: p.images.map((img: any) => img.src),
          sizes: p.variants.map((v: any) => v.values[0]?.es).filter(Boolean),
          canonical_url: p.canonical_url // Mantenemos el link de compra
        }))
        setProducts(mappedData)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error cargando productos:", err)
        setLoading(false)
      })
  }, [])

  // 4. Lógica de filtrado (mantiene la funcionalidad de V0)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesCategory && matchesPrice
    })
  }, [products, selectedCategory, priceRange])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-24">
        {/* Hero del catálogo (Estética V0) */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl tracking-wide md:text-4xl text-[#1a1a1a]">Catálogo</h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground uppercase text-[10px] tracking-[0.3em]">
              Selected Pieces 2026
            </p>
          </div>
        </section>

        {/* Grilla de productos (Estética V0 + Datos Tiendanube) */}
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-12">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />

              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {filteredProducts.length} Items
                  </p>
                </div>

                {loading ? (
                   <div className="py-20 text-center text-[10px] uppercase tracking-[0.5em] text-gray-400">
                     Cargando Colección...
                   </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                      No se encontraron piezas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}