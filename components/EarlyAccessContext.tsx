"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { EarlyAccessModal } from "./EarlyAccessModal"

type EarlyAccessContextType = {
  openModal: () => void
  closeModal: () => void
}

const EarlyAccessContext = createContext<EarlyAccessContextType | null>(null)

export function EarlyAccessProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <EarlyAccessContext.Provider value={{ openModal, closeModal }}>
      {children}
      <EarlyAccessModal open={open} onOpenChange={setOpen} />
    </EarlyAccessContext.Provider>
  )
}

export function useEarlyAccess() {
  const ctx = useContext(EarlyAccessContext)
  if (!ctx) throw new Error("useEarlyAccess must be used within EarlyAccessProvider")
  return ctx
}
