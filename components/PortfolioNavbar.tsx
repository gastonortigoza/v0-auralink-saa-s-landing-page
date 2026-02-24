"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEarlyAccess } from "@/components/EarlyAccessContext"

const navigationLinks = [
  { name: "Cómo funciona", href: "#como-funciona", external: false },
  { name: "Para empresas", href: "/empresas", external: true },
  { name: "Proveedores", href: "/proveedores", external: true },
  { name: "FAQ", href: "#faq", external: false },
]

export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { openModal } = useEarlyAccess()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  const handleLinkClick = (href: string, external: boolean) => {
    closeMobileMenu()
    if (external) return
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setTimeout(() => {
      const element = document.getElementById(href.replace("#", ""))
      if (element) {
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        })
      }
    }, isMobileMenuOpen ? 300 : 0)
  }
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <span style={{ fontFamily: "Figtree", fontWeight: "800" }}>
                Event Planner
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) =>
                link.external ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                    style={{ fontFamily: "Figtree, sans-serif", fontWeight: "400" }}
                  >
                    <span>{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href, false)}
                    className="text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                    style={{ fontFamily: "Figtree, sans-serif", fontWeight: "400" }}
                  >
                    <span>{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                )
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="bg-[#156d95] text-white px-[18px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-[15px]"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              <span style={{ fontFamily: "Figtree", fontWeight: "500" }}>
                Obtener acceso temprano
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationLinks.map((link) =>
                link.external ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                    style={{ fontFamily: "Figtree, sans-serif", fontWeight: "400" }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href, false)}
                    className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                    style={{ fontFamily: "Figtree, sans-serif", fontWeight: "400" }}
                  >
                    {link.name}
                  </button>
                )
              )}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={openModal}
                  className="w-full bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Obtener acceso temprano
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
