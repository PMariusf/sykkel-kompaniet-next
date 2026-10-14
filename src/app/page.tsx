import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureStrip from "@/components/FeatureStrip";
import ProductGrid from "@/components/ProductGrid";
import BrandStrip from "@/components/BrandStrip";
import TeamSection from "@/components/TeamSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeatureStrip />
        <ProductGrid />
        <BrandStrip />
        <TeamSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
