"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import CartLink from "@/components/CartLink";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Hjem", href: "/", match: (pathname: string) => pathname === "/" },
  { label: "Sykkeldeler", href: "/kategorier", match: (pathname: string) => pathname === "/kategorier" || pathname.startsWith("/kategori/") },
  { label: "Merker", href: "/#merker" },
  { label: "Tilbud", href: "/#produkter" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] max-w-[1420px] items-center gap-3 px-4 py-2 sm:min-h-[72px] sm:px-6 lg:px-8 xl:gap-5">
        <Link href="/" aria-label="Sykkel Deler – forsiden" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Hovedmeny" className="ml-auto hidden items-center gap-5 text-sm font-semibold text-zinc-300 xl:flex">
          {navItems.map((item) => {
            const current = item.match?.(pathname) ?? false;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`transition hover:text-[#c9ff35] ${current ? "text-[#c9ff35]" : "hover:text-white"}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <form role="search" action="/sok" className="ml-auto hidden h-11 min-w-0 w-[min(30vw,320px)] items-center rounded-lg border border-white/10 bg-white/[.035] px-3 text-sm text-zinc-400 lg:flex xl:ml-2">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0 fill-none stroke-zinc-300" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            name="q"
            aria-label="Søk etter produkter"
            placeholder="Søk etter produkter, merker eller deler ..."
            className="min-w-0 flex-1 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-400"
          />
        </form>

        <a
          href="/konto"
          aria-label="Min konto"
          aria-current={pathname === "/konto" ? "page" : undefined}
          className="hidden h-11 w-11 shrink-0 items-center justify-center text-zinc-200 transition hover:text-[#c9ff35] md:flex"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
          </svg>
        </a>

        <CartLink />
        <ThemeToggle />

        <button
          type="button"
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 text-zinc-100 transition hover:border-white/25 xl:hidden"
        >
          <span className="sr-only">Meny</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#070a0b] px-4 pb-5 pt-4 shadow-2xl xl:hidden">
          <div className="mx-auto max-w-[1420px]">
            <form role="search" action="/sok" className="flex h-11 items-center rounded-md border border-white/10 bg-white/[.035] px-3 text-sm text-zinc-400 lg:hidden">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 fill-none stroke-zinc-300" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                name="q"
                aria-label="Søk etter produkter"
                placeholder="Søk etter produkter ..."
                className="min-w-0 flex-1 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-400"
              />
            </form>

            <nav aria-label="Mobilmeny" className="mt-3 grid text-sm font-semibold text-zinc-200">
              {navItems.map((item) => {
                const current = item.match?.(pathname) ?? false;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-11 items-center justify-between border-b border-white/[.07] py-3.5 transition hover:text-[#c9ff35] ${current ? "text-[#c9ff35]" : ""}`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[#c9ff35]">→</span>
                  </a>
                );
              })}
              <a
                href="/konto"
                aria-current={pathname === "/konto" ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between border-b border-white/[.07] py-3.5 transition hover:text-[#c9ff35]"
              >
                Min konto
                <span aria-hidden="true" className="text-[#c9ff35]">→</span>
              </a>
              <a
                href="/handlekurv"
                aria-current={pathname === "/handlekurv" ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between py-3.5 transition hover:text-[#c9ff35]"
              >
                Handlekurv
                <span aria-hidden="true" className="text-[#c9ff35]">→</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
