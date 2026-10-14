import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KontoClient from "./KontoClient";
import ProfileForm from "./ProfileForm";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Profile = {
  full_name?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
};

export default async function KontoPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_customer_access")?.value;

  let user: { email?: string; id?: string } | null = null;
  let profile: Profile | null = null;

  if (accessToken) {
    const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: supabaseHeaders(accessToken),
      cache: "no-store",
    });

    if (userResponse.ok) {
      user = await userResponse.json();

      if (user?.id) {
        const profileResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/customer_profiles?select=full_name,phone,address_line1,postal_code,city,country&user_id=eq.${user.id}`,
          {
            headers: supabaseHeaders(accessToken),
            cache: "no-store",
          },
        );
        const rows = profileResponse.ok ? await profileResponse.json() : [];
        profile = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] px-4 py-12 text-white sm:px-6 lg:px-8">
        {user ? (
          <div className="mx-auto max-w-5xl">
            <div className="rounded-xl border border-white/10 bg-[#0b0f10] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">MIN KONTO</p>
                  <h1 className="mt-3 text-3xl font-black tracking-tight">Hei{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
                  <p className="mt-2 text-sm text-zinc-400">{user.email}</p>
                </div>
                <form action="/api/konto/logout" method="post">
                  <button className="rounded-md border border-white/10 px-4 py-2.5 text-xs font-bold text-zinc-300 transition hover:border-white/25 hover:text-white">
                    Logg ut
                  </button>
                </form>
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
                <section className="rounded-lg border border-white/10 bg-white/[.025] p-5 sm:p-6">
                  <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">KUNDEPROFIL</p>
                  <h2 className="mt-2 text-xl font-black">Kontakt og leveringsadresse</h2>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Opplysningene kan senere brukes til å fylle ut kassen automatisk.
                  </p>
                  <ProfileForm profile={profile} />
                </section>

                <section className="h-fit rounded-lg border border-white/10 bg-white/[.025] p-5 sm:p-6">
                  <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">ORDRER</p>
                  <h2 className="mt-2 text-xl font-black">Ordrehistorikk</h2>
                  <div className="mt-5 rounded-lg border border-dashed border-white/10 bg-black/15 px-5 py-10 text-center">
                    <p className="text-sm font-black text-white">Ingen bestillinger ennå</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                      Når ekte checkout og ordrebehandling kobles til, vises tidligere kjøp og ordrestatus her.
                    </p>
                  </div>
                  <a href="/#produkter" className="mt-5 inline-flex text-xs font-bold text-[#c9ff35] hover:text-[#d8ff68]">
                    Se produkter →
                  </a>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <KontoClient />
        )}
      </main>
      <Footer />
    </>
  );
}
