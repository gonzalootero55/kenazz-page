"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxSpeed = 0.3
      hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <div ref={heroRef} className="absolute inset-0 -z-10">
        <Image
          src="/placeholder.svg?height=1200&width=1920"
          alt="KENAZZ Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Content */}
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1
            className="animate-fade-in font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            Calidad que perdura,
            <br />
            <span className="font-medium">estilo que inspira</span>
          </h1>
          <p
            className="animate-fade-in mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base md:mt-8"
            style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
          >
            Descubre nuestra colección exclusiva de moda femenina premium, diseñada para la mujer moderna que valora la
            elegancia atemporal.
          </p>
          <div
            className="animate-fade-in mt-8 md:mt-10"
            style={{ animationDelay: "600ms", animationFillMode: "backwards" }}
          >
            <Button asChild size="lg" className="group bg-foreground px-8 text-background hover:bg-foreground/90">
              <Link href="/catalogo">
                Ver colección
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-[1px] bg-foreground/40" />
      </div>
    </section>
  )
}
