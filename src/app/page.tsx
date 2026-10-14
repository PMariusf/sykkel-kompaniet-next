import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureStrip from "@/components/FeatureStrip";
import ProductGrid from "@/components/ProductGrid";
import CampaignSection from "@/components/CampaignSection";
import BrandStrip from "@/components/BrandStrip";
import TeamSection from "@/components/TeamSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/products/hero-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/products/hero-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeatureStrip />
        <ProductGrid />
        <CampaignSection />
        <BrandStrip />
        <TeamSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
