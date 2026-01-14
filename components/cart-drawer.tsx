"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart()

  // Tiendanube checkout redirect (mock URL - replace with actual Tiendanube store URL)
  const handleCheckout = () => {
    // In production, this would redirect to Tiendanube checkout
    const tiendanubeCheckoutUrl = "https://your-store.tiendanube.com/checkout"
    window.open(tiendanubeCheckoutUrl, "_blank")
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-serif text-xl tracking-wide">Tu Carrito</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 transition-opacity hover:opacity-60"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">Tu carrito está vacío</p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Seguir comprando
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">Talle: {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center border transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center border transition-colors hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-xs text-muted-foreground underline transition-colors hover:text-foreground"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-xl">{formatPrice(totalPrice)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              Finalizar Compra
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Serás redirigido a Tiendanube para completar tu compra
            </p>
          </div>
        )}
      </div>
    </>
  )
}
