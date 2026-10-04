type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <span className="flex min-w-fit items-center gap-3" aria-label="Sykkel Deler">
      <span
        className={`relative font-black italic leading-none tracking-[-0.18em] ${
          compact ? "text-[2.2rem]" : "text-[2.75rem]"
        }`}
      >
        <span className="bg-[linear-gradient(180deg,#ffffff_0%,#d8d8d8_38%,#8b8b8b_72%,#f1f1f1_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,.55)]">
          SK
        </span>
        <span className="absolute -right-3 top-2 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
      </span>

      <span className="flex flex-col leading-none">
        <strong
          className={`${compact ? "text-[1rem]" : "text-[1.15rem]"} bg-[linear-gradient(180deg,#ffffff_0%,#d6d6d6_48%,#8a8a8a_100%)] bg-clip-text tracking-[.16em] text-transparent drop-shadow-[0_1px_6px_rgba(0,0,0,.45)]`}
        >
          SYKKEL
        </strong>
        <span
          className={`${compact ? "text-[9px]" : "text-[10px]"} mt-1 bg-[linear-gradient(180deg,#eeeeee_0%,#bcbcbc_55%,#767676_100%)] bg-clip-text font-semibold tracking-[.34em] text-transparent`}
        >
          DELER
        </span>
      </span>
    </span>
  );
}
