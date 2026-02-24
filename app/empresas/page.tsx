import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { MidPageCTA } from "@/components/MidPageCTA"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"

export default function EmpresasPage() {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard
        dailyVolumeLabel="HERRAMIENTA PROFESIONAL DE EVENTOS"
        headline="La gestión profesional de eventos necesita herramientas profesionales."
        subheadline="Multi-tenant y white-label para empresas. Centralizá salones, catering, proveedores y pagos. Gestioná eventos desde la web o por chat con IA."
        primaryButtonText="Quiero probarlo gratis"
      />
      <BankingScaleHero />
      <CaseStudiesCarousel />
      <IntegrationCarousel />
      <MidPageCTA />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  )
}
