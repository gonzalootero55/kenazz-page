"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/5] overflow-hidden transition-all duration-1000",
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
            )}
          >
            <Image src="/placeholder.svg?height=1000&width=800" alt="KENAZZ Atelier" fill className="object-cover" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all delay-300 duration-1000",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
            )}
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Nuestra Historia
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-wide md:text-4xl">
              Diseñando con propósito, creando con pasión
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                KENAZZ nació de la visión de crear moda que trascienda las tendencias pasajeras. Cada pieza es
                cuidadosamente diseñada pensando en la mujer moderna: sofisticada, consciente y elegante.
              </p>
              <p className="leading-relaxed">
                Trabajamos con los mejores materiales y artesanos para garantizar que cada prenda no solo luzca hermosa,
                sino que perdure en el tiempo. Creemos en la moda responsable y en el poder del estilo atemporal.
              </p>
              <p className="leading-relaxed">
                Nuestro compromiso es ofrecer piezas que se conviertan en favoritas de tu armario, aquellas que te
                acompañen temporada tras temporada con la misma elegancia del primer día.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-8 border-t pt-10">
              {[
                { value: "2019", label: "Fundación" },
                { value: "100%", label: "Diseño local" },
                { value: "5K+", label: "Clientas felices" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "transition-all duration-700",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <p className="font-serif text-2xl md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
