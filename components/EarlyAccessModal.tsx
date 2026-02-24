"use client"

import React, { useState } from "react"

type EarlyAccessModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EarlyAccessModal({ open, onOpenChange }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const formData = new FormData()
      formData.append("email", email)
      const response = await fetch("https://formspree.io/f/mpqjazea", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (response.ok) {
        setStatus("success")
        setEmail("")
        setTimeout(() => onOpenChange(false), 2000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-[24px] bg-white p-8 shadow-xl"
        style={{ fontFamily: "var(--font-figtree), Figtree" }}
      >
        <h2 id="early-access-title" className="text-xl font-medium text-[#202020] mb-2">
          Acceso temprano
        </h2>
        <p className="text-[#666666] mb-6">
          Dejá tu email y te avisamos cuando esté disponible.
        </p>
        {status === "success" ? (
          <p className="text-[#16b364] text-base">¡Gracias! Te vamos a contactar.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="w-full px-4 py-[15px] rounded-full border border-[#d0d0d0] text-base focus:outline-none focus:border-[#156d95] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#156d95] text-white px-4 py-[15px] rounded-full text-base hover:rounded-2xl transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Enviando…" : "Unirme a la lista"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-[#ef4444] text-sm mt-2">Hubo un error. Probá de nuevo.</p>
        )}
        <p className="text-[#999999] text-xs mt-4">Sin spam. Solo novedades.</p>
      </div>
    </div>
  )
}
