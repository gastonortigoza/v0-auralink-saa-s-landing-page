import React from "react"

export type UtmVariant = {
  badge: string
  h1: string
  subtitle: string
  ctaText: string
}

const UTM_MAP: Record<string, UtmVariant> = {
  default: {
    badge: "PLATAFORMA DE EVENTOS",
    h1: "Un solo evento. Todos los proveedores. Cero caos.",
    subtitle:
      "Organizá eventos desde la web, por chat con IA o con agentes humanos. Salones, catering, música y pagos en un solo lugar.",
    ctaText: "Obtener acceso temprano",
  },
  arte_eventos: {
    badge: "PARA QUIENES HACEN LAS COSAS BIEN",
    h1: "Dominar cada detalle de un evento es un arte. Nosotros te damos las herramientas.",
    subtitle:
      "Desde el salón hasta los pagos. Todo centralizado, todo bajo control, todo con tu sello.",
    ctaText: "Obtener acceso temprano",
  },
  caos_eventos: {
    badge: "¿ORGANIZANDO UN EVENTO?",
    h1: "Basta de la locura al organizar eventos.",
    subtitle:
      "Sin estrés, sin costos extra. Un solo lugar para salones, proveedores, pagos y comunicación.",
    ctaText: "Quiero organizar sin caos",
  },
  plataforma_pro: {
    badge: "HERRAMIENTA PROFESIONAL DE EVENTOS",
    h1: "La gestión profesional de eventos necesita herramientas profesionales.",
    subtitle:
      "Organizá eventos desde la web, por chat con IA o con agentes humanos. Salones, catering, música y pagos en un solo lugar.",
    ctaText: "Quiero probarlo gratis",
  },
  organizar_ia: {
    badge: "ORGANIZÁ TUS EVENTOS CON IA",
    h1: "Rompé el caos de tus eventos. Dejá que la IA trabaje por vos.",
    subtitle:
      "Organizá eventos desde la web, por chat con IA o con agentes humanos. Salones, catering, música y pagos en un solo lugar.",
    ctaText: "Probar Event Planner con IA",
  },
  proveedores: {
    badge: "PARA PROVEEDORES DE EVENTOS",
    h1: "Conectate con quienes organizan eventos. Sin intermediarios.",
    subtitle:
      "Organizá eventos desde la web, por chat con IA o con agentes humanos. Salones, catering, música y pagos en un solo lugar.",
    ctaText: "Sumarme como proveedor",
  },
}

export function getUtmContent(): string | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  return params.get("utm_content")
}

export function getUtmVariant(utmContent: string | null): UtmVariant {
  if (!utmContent) return UTM_MAP.default
  const key = utmContent.toLowerCase().replace(/\s/g, "_")
  return UTM_MAP[key] ?? UTM_MAP.default
}

export function useUtmVariant(): UtmVariant {
  const [variant, setVariant] = React.useState<UtmVariant>(UTM_MAP.default)
  React.useEffect(() => {
    setVariant(getUtmVariant(getUtmContent()))
  }, [])
  return variant
}
