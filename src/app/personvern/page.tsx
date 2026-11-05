import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Personvern",
  description: "Informasjon om personvern og frivillig nyhetsbrev hos Sykkel Deler.",
};

export default function PersonvernPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-16 text-zinc-100 sm:py-20">
        <h1 className="mb-8 text-3xl font-bold">Personvern</h1>
        <div className="space-y-7 text-base leading-7 text-zinc-200">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Hvem behandler opplysninger?</h2>
            <p>Sykkel Deler behandler opplysninger som samles inn via denne nettsiden. Kontaktopplysninger for virksomheten finnes under Kontakt nederst på siden. Firmanavn og kontaktinformasjon må bekreftes av virksomheten før siden tas i endelig bruk.</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Frivillig nyhetsbrev</h2>
            <p>Du kan velge å registrere e-postadressen din for å få nyheter, tips og tilbud på e-post. Det er frivillig, og du trenger ikke samtykke for å handle eller laste ned filer.</p>
            <p>Vi lagrer e-postadresse, samtykketeksten og tidspunktet for registreringen for å dokumentere samtykket. Grunnlaget er samtykke, som du kan trekke tilbake når som helst. Opplysningene brukes ikke til andre formål uten et eget rettslig grunnlag.</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Lagring og sletting</h2>
            <p>Nyhetsbrevregistreringer lagres i tilgangsbegrenset database. Vi beholder opplysningene så lenge samtykket gjelder og de trengs til formålet. Når du trekker samtykket tilbake, stanser vi utsendelser og håndterer sletting i samsvar med gjeldende krav. Den tekniske løsningen for utsendelse og automatisk avmelding må være klar før første nyhetsbrev sendes.</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Dine rettigheter</h2>
            <p>Du kan be om innsyn, retting eller sletting av opplysninger, og trekke samtykket tilbake. Bruk kontaktinformasjonen i footeren for å nå virksomheten. Du kan også klage til Datatilsynet dersom du mener personopplysningene dine behandles i strid med regelverket.</p>
          </section>
        </div>
        <Link href="/" className="mt-10 inline-block text-sm font-semibold text-[#c9ff35] underline underline-offset-4">Tilbake til forsiden</Link>
      </main>
      <Footer />
    </>
  );
}
