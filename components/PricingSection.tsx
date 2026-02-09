"use client"

import * as React from "react"
import { Users, Building2, Store } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudienceCard {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  accentColor: string
}

const audiences: AudienceCard[] = [
  {
    title: "Usuarios finales",
    description: "Personas que quieren organizar eventos de manera simple y rápida.",
    features: [
      "Creá eventos en minutos",
      "Gestioná todo por chat o web",
      "Conectá con proveedores verificados",
      "Seguimiento en tiempo real",
    ],
    icon: <Users className="w-8 h-8" />,
    accentColor: "#16b364",
  },
  {
    title: "Organizadores y agencias",
    description: "Grandes empresas o freelancers que gestionan múltiples eventos.",
    features: [
      "Tu marca y dominio",
      "Tus clientes y proveedores",
      "Tus agentes humanos o IA",
      "Eventos ilimitados",
    ],
    icon: <Building2 className="w-8 h-8" />,
    accentColor: "#156d95",
  },
  {
    title: "Proveedores de eventos",
    description: "Salones, catering, fotógrafos y más servicios para eventos.",
    features: [
      "Recibí solicitudes automáticas",
      "Gestioná tu disponibilidad",
      "Comunicación directa con clientes",
      "Pagos y facturación integrados",
    ],
    icon: <Store className="w-8 h-8" />,
    accentColor: "#3b82f6",
  },
]

export function PricingSection() {
  const [selectedCard, setSelectedCard] = React.useState<number>(1)
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const formData = new FormData()
      formData.append("email", email)

      const response = await fetch("https://formspree.io/f/mpqjazea", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="empresas" className="py-24 bg-background scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-figtree text-[40px] font-normal leading-tight mb-4">Usá Event Planner como tu propio sistema de eventos</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma diseñada para todos los que participan en la organización de eventos.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <button
              key={audience.title}
              type="button"
              onClick={() => setSelectedCard(index)}
              className={cn(
                "relative p-8 rounded-2xl text-left transition-all border-2",
                selectedCard === index
                  ? "border-[#156d95] bg-[#156d95]/5"
                  : "border-border hover:border-[#156d95]/50",
              )}
            >
              <div className="mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${audience.accentColor}15`, color: audience.accentColor }}
                >
                  {audience.icon}
                </div>
                <h3 className="font-figtree text-2xl font-medium mb-2">{audience.title}</h3>
                <p className="font-figtree text-base text-muted-foreground">{audience.description}</p>
              </div>
              <ul className="space-y-3">
                {audience.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: audience.accentColor }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div id="waitlist" className="mt-16 text-center bg-[#fafafa] rounded-2xl p-12 scroll-mt-24">
          <h3 className="font-figtree text-3xl font-medium mb-4">Sumate y probá Event Planner antes que nadie</h3>
          <p className="font-figtree text-lg text-muted-foreground mb-8">
            Te avisamos cuando esté disponible.
          </p>
          {status === "success" ? (
            <p
              className="text-[#16b364] text-base"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              ¡Gracias! Te vamos a contactar.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="flex-1 w-full sm:w-auto px-4 py-[15px] rounded-full border border-[#d0d0d0] text-base leading-4 focus:outline-none focus:border-[#156d95] transition-colors disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#156d95] text-white px-[24px] py-[15px] rounded-full font-figtree text-base hover:rounded-2xl transition-all whitespace-nowrap disabled:opacity-50"
              >
                {status === "loading" ? "Enviando..." : "Unirme a la lista"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p
              className="text-[#ef4444] text-sm mt-3"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Hubo un error. Probá de nuevo.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
