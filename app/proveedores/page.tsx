import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { MidPageCTA } from "@/components/MidPageCTA"
import { PricingSection } from "@/components/PricingSection"
import { FAQSection } from "@/components/FAQSection"
import { Footer } from "@/components/Footer"

export default function ProveedoresPage() {
  return (
    <>
      <PortfolioNavbar />
      <ProductTeaserCard
        dailyVolumeLabel="PARA PROVEEDORES DE EVENTOS"
        headline="Conectate con quienes organizan eventos. Sin intermediarios."
        subheadline="Llegá directo a organizadores y empresas. Sin comisiones ocultas, sin intermediarios. Salones, catering, fotografía y más en un solo lugar."
        primaryButtonText="Sumarme como proveedor"
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
