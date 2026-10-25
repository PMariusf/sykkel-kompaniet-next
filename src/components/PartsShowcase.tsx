import Image from "next/image";
import Link from "next/link";

const showcaseParts = [
  {
    id: "1",
    name: "XT CS-M8100 Kassett",
    category: "Drivverk",
    image: "/products/cassette.png",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "3",
    name: "RT-MT800 Bremseskive",
    category: "Bremser",
    image: "/products/brake-rotor.png",
    className: "",
  },
  {
    id: "5",
    name: "XT Bakgir",
    category: "Drivverk",
    image: "/products/rear-derailleur.png",
    className: "",
  },
  {
    id: "2",
    name: "GX Eagle Kjede",
    category: "Drivverk",
    image: "/products/chain.png",
    className: "",
  },
  {
    id: "6",
    name: "XT Krankarm",
    category: "Drivverk",
    image: "/products/crank-arm.png",
    className: "",
  },
  {
    id: "4",
    name: "Trail King 29 × 2.4",
    category: "Dekk",
    image: "/products/tire.png",
    className: "md:col-span-2",
  },
];

export default function PartsShowcase() {
  return (
    <section className="border-y border-white/10 bg-[#080b0c] py-16 sm:py-20">
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SE NÆRMERE</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Deler som gjør forskjellen
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Et nærmere blikk på noen av komponentene i sortimentet — fra drivverk og bremser til dekk og krank.
            </p>
          </div>
          <Link
            href="/#produkter"
            className="text-xs font-black uppercase tracking-[.18em] text-[#c9ff35] transition hover:text-white"
          >
            Se alle produkter →
          </Link>
        </div>

        <div className="grid auto-rows-[220px] gap-3 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[240px]">
          {showcaseParts.map((part) => (
            <Link
              key={part.id}
              href={`/produkter/${part.id}`}
              className={`theme-on-image group relative overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_38%,#242a2b_0%,#101415_48%,#070909_100%)] ${part.className}`}
            >
              <Image
                src={part.image}
                alt={part.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-7 transition duration-500 group-hover:scale-[1.06] md:p-9"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pb-4 pt-14">
                <p className="text-[9px] font-black uppercase tracking-[.22em] text-[#c9ff35]">
                  {part.category}
                </p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <h3 className="text-sm font-black text-white sm:text-base">{part.name}</h3>
                  <span className="translate-x-1 text-lg text-white/50 transition group-hover:translate-x-0 group-hover:text-[#c9ff35]">→</span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition group-hover:ring-[#c9ff35]/25" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
