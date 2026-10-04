import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <ProductGrid />
        <section id="merker" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="text-center text-xs font-bold tracking-[.22em] text-[#c9ff35]">MERKER</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-xl font-black italic text-zinc-500 sm:text-2xl">
            <span>SHIMANO</span><span>SRAM</span><span>CONTINENTAL</span><span>MAXXIS</span><span>SCHWALBE</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
