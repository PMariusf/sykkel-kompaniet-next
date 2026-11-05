"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const CONSENT_TEXT =
  "Jeg ønsker å motta nyhetsbrev og tilbud fra Sykkel Deler på e-post. Jeg kan melde meg av når som helst.";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!consent) {
      setMessage("Du må selv velge om du vil motta nyhetsbrev.");
      return;
    }

    setSubmitting(true);
    try {
      const form = event.currentTarget;
      const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, consentText: CONSENT_TEXT, website: honeypot }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Kunne ikke registrere e-postadressen.");
      setSuccess(true);
      setEmail("");
      setConsent(false);
      setMessage("Takk! Vi har mottatt registreringen din.");
    } catch (error) {
      setSuccess(false);
      setMessage(error instanceof Error ? error.message : "Noe gikk galt. Prøv igjen senere.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="theme-on-image relative isolate overflow-hidden border-b border-white/10 bg-black">
      <Image
        src="/products/hero-bottom.png"
        alt="Syklist i fjellandskap"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />

      <div className="mx-auto flex min-h-[170px] max-w-[1420px] flex-col justify-center gap-4 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-black tracking-tight text-white">Få de beste tilbudene først</h2>
          <p className="mt-1 max-w-lg text-sm leading-6 text-zinc-200">
            Nyhetsbrev er frivillig og helt uavhengig av kjøp og nedlastinger.
            Du kan melde deg av når som helst.
          </p>
        </div>

        <form onSubmit={submit} className="w-full max-w-lg space-y-3" noValidate={false}>
          <label htmlFor="newsletter-email" className="sr-only">Din e-postadresse</label>
          <div className="flex min-w-0 overflow-hidden rounded-md border border-white/20 bg-black/45 backdrop-blur-sm">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Din e-postadresse"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={submitting || !consent}
              className="bg-[#c9ff35] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Lagrer ..." : "Meld meg på"}
            </button>
          </div>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-zinc-200">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 accent-[#c9ff35]"
            />
            <span>{CONSENT_TEXT} Les vår <Link href="/personvern" className="underline underline-offset-2 hover:text-white">personvernerklæring</Link>.</span>
          </label>
          {message && (
            <p role={success ? "status" : "alert"} aria-live="polite" className={success ? "text-sm text-lime-300" : "text-sm text-amber-200"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
