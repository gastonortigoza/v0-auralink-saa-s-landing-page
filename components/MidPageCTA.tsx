"use client"

import * as React from "react"

export function MidPageCTA() {
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
    <section className="w-full py-20 px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3
          className="text-[28px] leading-tight font-normal text-[#202020] tracking-tight mb-3"
          style={{
            fontFamily: "var(--font-figtree), Figtree",
            fontWeight: "400",
          }}
        >
          Probalo antes que nadie
        </h3>
        <p
          className="text-lg text-[#666666] mb-8"
          style={{
            fontFamily: "var(--font-figtree), Figtree",
          }}
        >
          Dejá tu email y te avisamos cuando esté disponible.
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
              className="bg-[#156d95] text-white px-[24px] py-[15px] rounded-full text-base hover:rounded-2xl transition-all whitespace-nowrap disabled:opacity-50"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
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
            Hubo un error. Prob\u00e1 de nuevo.
          </p>
        )}
        <p
          className="text-xs text-[#999999] mt-4"
          style={{
            fontFamily: "var(--font-figtree), Figtree",
          }}
        >
          Sin spam. Solo novedades.
        </p>
      </div>
    </section>
  )
}
