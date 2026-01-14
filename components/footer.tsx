import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl tracking-[0.2em]">
              KENAZZ
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Calidad que perdura, estilo que inspira. Moda femenina premium diseñada para la mujer moderna.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium uppercase tracking-widest">Navegación</h3>
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Catálogo
            </Link>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium uppercase tracking-widest">Contacto</h3>
            <a
              href="mailto:hola@kenazz.com"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              hola@kenazz.com
            </a>
            <div className="mt-2 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KENAZZ. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
