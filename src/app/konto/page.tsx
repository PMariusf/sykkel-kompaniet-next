import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KontoClient from "./KontoClient";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export default async function KontoPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_customer_access")?.value;

  let user: { email?: string; id?: string } | null = null;
  let profile: { full_name?: string | null; phone?: string | null; city?: string | null } | null = null;

  if (accessToken) {
    const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: supabaseHeaders(accessToken),
      cache: "no-store",
    });

    if (userResponse.ok) {
      user = await userResponse.json();

      if (user?.id) {
        const profileResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/customer_profiles?select=full_name,phone,city&user_id=eq.${user.id}`,
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
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-[#0b0f10] p-6 sm:p-8">
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">MIN KONTO</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Hei{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
            <p className="mt-2 text-sm text-zinc-400">{user.email}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[.025] p-5">
                <p className="text-xs font-black text-white">Kundeprofil</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Adresse, telefon og andre kundeopplysninger kan kobles på her etter hvert.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[.025] p-5">
                <p className="text-xs font-black text-white">Ordrehistorikk</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Når ekte checkout er koblet til, kan tidligere bestillinger vises her.
                </p>
              </div>
            </div>

            <form action="/api/konto/logout" method="post" className="mt-7">
              <button className="rounded-md border border-white/10 px-4 py-2.5 text-xs font-bold text-zinc-300 transition hover:border-white/25 hover:text-white">
                Logg ut
              </button>
            </form>
          </div>
        ) : (
          <KontoClient />
        )}
      </main>
      <Footer />
    </>
  );
}
