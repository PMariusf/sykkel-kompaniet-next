import Image from "next/image";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  image_url: string | null;
  image_alt: string | null;
};

async function getTeam(): Promise<TeamMember[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/team_members?select=id,name,role,bio,email,phone,image_url,image_alt&is_active=eq.true&order=sort_order.asc,created_at.asc`,
      { headers: supabaseHeaders(), cache: "no-store" },
    );
    return response.ok ? await response.json() : [];
  } catch {
    return [];
  }
}

export default async function TeamSection() {
  const team = await getTeam();
  if (team.length === 0) return null;

  return (
    <section className="border-b border-white/10 bg-[#081011]">
      <div className="mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-[10px] font-black tracking-[.3em] text-[#c9ff35]">TEAMET</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Folkene bak Sykkel Deler</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Møt teamet som hjelper med deler, produktvalg og kundeservice.</p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((member) => (
            <article key={member.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0f10]">
              {member.image_url ? (
                <div className="relative aspect-[4/3] bg-black">
                  <Image src={member.image_url} alt={member.image_alt || member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#253033,#090b0c_70%)] text-4xl font-black text-[#c9ff35]">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-black text-white">{member.name}</h3>
                {member.role && <p className="mt-1 text-xs font-black uppercase tracking-[.16em] text-[#c9ff35]">{member.role}</p>}
                {member.bio && <p className="mt-3 text-sm leading-6 text-zinc-400">{member.bio}</p>}
                {(member.email || member.phone) && (
                  <div className="mt-4 space-y-1 text-xs text-zinc-500">
                    {member.email && <p>{member.email}</p>}
                    {member.phone && <p>{member.phone}</p>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
