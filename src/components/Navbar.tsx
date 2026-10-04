"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

const navItems = [
  { label: "Hjem", href: "/" },
  { label: "Sykkeldeler", href: "/kategorier" },
  { label: "Merker", href: "/#merker" },
  { label: "Tilbud", href: "/#produkter" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1420px] items-center gap-4 px-4 sm:h-[72px] sm:px-6 lg:gap-6 lg:px-8">
        <a href="/" aria-label="Sykkel Deler" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-[13px] font-semibold text-zinc-300 lg:flex">
          <a className="transition hover:text-white" href="/">Hjem</a>
          <a className="transition hover:text-[#c9ff35]" href="/kategorier">Sykkeldeler⌄</a>
          <a className="transition hover:text-white" href="/#merker">Merker⌄</a>
          <a className="transition hover:text-white" href="/#produkter">Tilbud</a>
          <a className="transition hover:text-white" href="/#kontakt">Kontakt</a>
        </nav>

        <div className="ml-auto hidden h-10 min-w-[330px] items-center rounded-lg border border-white/10 bg-white/[.035] px-3 text-[12px] text-zinc-500 md:flex lg:ml-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0 fill-none stroke-zinc-300" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <span className="truncate">Søk etter produkter, merker eller deler ...</span>
        </div>

        <button aria-label="Konto" className="hidden h-10 w-10 items-center justify-center text-zinc-200 md:flex">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
          </svg>
        </button>

        <button aria-label="Handlekurv" className="relative flex h-10 w-10 items-center justify-center text-zinc-100">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
            <path d="M3 4h2l2 11h10l2-7H6" />
            <circle cx="9" cy="19" r="1.2" />
            <circle cx="17" cy="19" r="1.2" />
          </svg>
          <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[9px] font-black text-black">0</span>
        </button>

        <button
          type="button"
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-100 transition hover:border-white/25 lg:hidden"
        >
          <span className="sr-only">Meny</span>
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#070a0b] px-4 pb-5 pt-4 shadow-2xl lg:hidden">
          <div className="mx-auto max-w-[1420px]">
            <div className="flex h-11 items-center rounded-md border border-white/10 bg-white/[.035] px-3 text-sm text-zinc-500 md:hidden">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 fill-none stroke-zinc-300" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              Søk etter produkter ...
            </div>

            <nav className="mt-3 grid text-sm font-semibold text-zinc-200">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-white/[.07] py-3.5 transition hover:text-[#c9ff35] ${index === 0 ? "text-[#c9ff35]" : ""}`}
                >
                  {item.label}
                  <span className="text-[#c9ff35]">→</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
