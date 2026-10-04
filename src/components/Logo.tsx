type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <span className="flex min-w-fit items-center gap-3" aria-label="Sykkel Deler">
      <span
        className={`relative font-black italic leading-none tracking-[-0.18em] text-zinc-100 ${
          compact ? "text-[2.2rem]" : "text-[2.75rem]"
        }`}
      >
        SK
        <span className="absolute -right-3 top-2 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
      </span>

      <span className="flex flex-col leading-none">
        <strong className={`${compact ? "text-[1rem]" : "text-[1.15rem]"} tracking-[.16em] text-white`}>
          SYKKEL
        </strong>
        <span className={`${compact ? "text-[9px]" : "text-[10px]"} mt-1 font-semibold tracking-[.34em] text-zinc-400`}>
          DELER
        </span>
      </span>
    </span>
  );
}
