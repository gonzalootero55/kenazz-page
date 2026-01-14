export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  sizes: string[]
  images: string[]
  featured?: boolean
  new?: boolean
}

// Mock products ready for Tiendanube integration
export const products: Product[] = [
  {
    id: "1",
    name: "Vestido Elegance",
    price: 45990,
    originalPrice: 59990,
    description:
      "Vestido midi de corte elegante, confeccionado en tela premium con caída fluida. Ideal para ocasiones especiales o cenas formales.",
    category: "vestidos",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/elegant-midi-dress-feminine-pink-tones-fashion-pho.jpg", "/elegant-midi-dress-back-view-fashion-photography.jpg"],
    featured: true,
    new: true,
  },
  {
    id: "2",
    name: "Blusa Minimal",
    price: 28990,
    description:
      "Blusa de seda con diseño minimalista y mangas abullonadas. Perfecta para combinar con pantalones de vestir o faldas.",
    category: "blusas",
    sizes: ["XS", "S", "M", "L"],
    images: ["/minimalist-silk-blouse-feminine-fashion-photograph.jpg", "/minimalist-silk-blouse-detail-fashion-photography.jpg"],
    featured: true,
  },
  {
    id: "3",
    name: "Pantalón Palazzo",
    price: 38990,
    description:
      "Pantalón palazzo de tiro alto con cintura elástica. Tela liviana y fluida, ideal para primavera-verano.",
    category: "pantalones",
    sizes: ["S", "M", "L", "XL"],
    images: ["/palazzo-pants-high-waist-feminine-fashion-photogra.jpg", "/palazzo-pants-side-view-fashion-photography.jpg"],
    featured: true,
  },
  {
    id: "4",
    name: "Falda Midi Plisada",
    price: 32990,
    description: "Falda midi plisada con cintura alta. Elegante y versátil, perfecta para looks formales o casuales.",
    category: "faldas",
    sizes: ["XS", "S", "M", "L"],
    images: ["/pleated-midi-skirt-elegant-feminine-fashion-photog.jpg", "/pleated-midi-skirt-movement-fashion-photography.jpg"],
    new: true,
  },
  {
    id: "5",
    name: "Top Cropped Romántico",
    price: 22990,
    description: "Top cropped con detalles románticos y mangas voluminosas. Confeccionado en algodón premium.",
    category: "tops",
    sizes: ["XS", "S", "M", "L"],
    images: ["/romantic-cropped-top-feminine-fashion-photography-.jpg", "/romantic-cropped-top-back-view-fashion-photography.jpg"],
  },
  {
    id: "6",
    name: "Blazer Oversize",
    price: 54990,
    description:
      "Blazer oversize de corte moderno. Ideal para looks de oficina o salidas casuales con un toque sofisticado.",
    category: "chaquetas",
    sizes: ["S", "M", "L"],
    images: ["/oversize-blazer-feminine-fashion-photography-neutr.jpg", "/oversize-blazer-detail-fashion-photography.jpg"],
    featured: true,
  },
  {
    id: "7",
    name: "Vestido Lino Natural",
    price: 49990,
    description: "Vestido largo de lino natural con botones frontales. Fresco y elegante para días de verano.",
    category: "vestidos",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/linen-maxi-dress-natural-feminine-fashion-photogra.jpg", "/linen-maxi-dress-side-view-fashion-photography.jpg"],
  },
  {
    id: "8",
    name: "Camisa Satinada",
    price: 34990,
    description: "Camisa de satín con brillo sutil. Elegante y sofisticada para ocasiones especiales.",
    category: "blusas",
    sizes: ["XS", "S", "M", "L"],
    images: ["/satin-shirt-elegant-feminine-fashion-photography.jpg", "/placeholder.svg?height=800&width=600"],
    new: true,
  },
]

export const categories = [
  { id: "all", name: "Todos" },
  { id: "vestidos", name: "Vestidos" },
  { id: "blusas", name: "Blusas" },
  { id: "tops", name: "Tops" },
  { id: "pantalones", name: "Pantalones" },
  { id: "faldas", name: "Faldas" },
  { id: "chaquetas", name: "Chaquetas" },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(price)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
