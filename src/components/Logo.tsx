import Image from "next/image";

type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  const sizeClass = compact ? "w-[215px]" : "w-[170px] sm:w-[230px] lg:w-[250px]";

  return (
    <span className="brand-logo inline-block shrink-0" role="img" aria-label="SD Sykkeldelerlageret">
      <Image
        src="/sykkel-deler-logo.svg"
        alt=""
        width={520}
        height={102}
        className={`logo-dark h-auto ${sizeClass}`}
      />
      <Image
        src="/sykkel-deler-logo-light.svg"
        alt=""
        width={520}
        height={102}
        className={`logo-light h-auto ${sizeClass}`}
      />
    </span>
  );
}
