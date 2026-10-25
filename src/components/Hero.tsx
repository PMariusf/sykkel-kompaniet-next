import Image from "next/image";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

const trustItems = [
  ["▣", "Rask levering", "1–3 virkedager"],
  ["⬡", "Trygg handel", "Sikre betalingsløsninger"],
  ["◇", "Stort utvalg", "Kjente merkevarer"],
  ["☆", "Eksperthjelp", "Vi hjelper deg å velge"],
];

type HeroContent = {
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  image_alt: string | null;
};

const fallback: HeroContent = {
  eyebrow: "KVALITET GIR BEDRE TURER",
  headline: "Deler til sykkelen din",
  subheadline: "Kvalitetsdeler for vei, terreng og hverdagssykling. Stort utvalg fra ledende merkevarer.",
  primary_cta_label: "Se sykkeldeler",
  primary_cta_href: "#produkter",
  secondary_cta_label: "Finn riktig del",
  secondary_cta_href: "#kategorier",
  image_url: "/products/hero-image.png",
  image_alt: "Sykkeldeler og drivverk",
};

async function getHeroContent(): Promise<HeroContent> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/site_content?select=eyebrow,headline,subheadline,primary_cta_label,primary_cta_href,secondary_cta_label,secondary_cta_href,image_url,image_alt&key=eq.home_hero`,
      { headers: supabaseHeaders(), cache: "no-store" },
    );
    if (!response.ok) return fallback;
    const rows: HeroContent[] = await response.json();
    return rows[0] ?? fallback;
  } catch {
    return fallback;
  }
}

export default async function Hero() {
  const content = await getHeroContent();

  return (
    <section className="theme-on-image relative isolate overflow-hidden border-b border-white/10 bg-black">
      <Image
        src={content.image_url || fallback.image_url!}
        alt={content.image_alt || fallback.image_alt!}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[63%_center] sm:object-center"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/72 to-black/20 sm:via-black/65 sm:to-black/5" />
      <div className="absolute inset-y-0 left-0 -z-10 w-[72%] bg-black/20 sm:w-[55%]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#06090a]/95 to-transparent" />

      <div className="mx-auto flex min-h-[470px] max-w-[1420px] items-center px-4 pb-10 pt-12 sm:min-h-[520px] sm:px-6 sm:pt-16 lg:px-8 lg:pb-28">
        <div className="max-w-[650px]">
          <p className="mb-3 text-[10px] font-black tracking-[.28em] text-[#c9ff35] drop-shadow-[0_2px_8px_rgba(0,0,0,.45)] sm:text-xs sm:tracking-[.34em]">
            {content.eyebrow || fallback.eyebrow}
          </p>

          <h1 className="max-w-[640px] bg-[linear-gradient(180deg,#ffffff_0%,#dcdcdc_38%,#8d8d8d_73%,#f4f4f4_100%)] bg-clip-text text-[2.75rem] font-black leading-[.9] tracking-[-.055em] text-transparent drop-shadow-[0_4px_18px_rgba(0,0,0,.65)] min-[390px]:text-[3.15rem] sm:text-6xl lg:text-[4.7rem]">
            {content.headline || fallback.headline}
          </h1>

          <p className="mt-5 max-w-[540px] text-[15px] leading-6 text-zinc-200 sm:text-lg">
            {content.subheadline || fallback.subheadline}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-3">
            <a href={content.primary_cta_href || fallback.primary_cta_href!} className="rounded-md bg-[#c9ff35] px-6 py-3 text-center text-sm font-black text-black shadow-[0_0_24px_rgba(201,255,53,.16)] transition hover:bg-[#d8ff68]">
              {content.primary_cta_label || fallback.primary_cta_label} <span className="ml-2">→</span>
            </a>
            <a href={content.secondary_cta_href || fallback.secondary_cta_href!} className="rounded-md border border-white/35 bg-black/30 px-6 py-3 text-center text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/45">
              ⌕ <span className="ml-2">{content.secondary_cta_label || fallback.secondary_cta_label}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="mx-auto grid max-w-[1420px] grid-cols-2 gap-x-3 gap-y-4 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map(([icon, title, text], index) => (
            <div key={title} className={`flex min-w-0 items-center gap-2.5 ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""}`}>
              <span className="shrink-0 text-xl text-[#c9ff35] sm:text-2xl">{icon}</span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black text-white sm:text-xs">{title}</p>
                <p className="mt-0.5 text-[9px] leading-4 text-zinc-400 sm:text-[10px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
