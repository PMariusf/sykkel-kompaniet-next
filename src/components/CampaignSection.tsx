import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Campaign = {
  id: string;
  title: string;
  badge: string | null;
  description: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

async function getCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/campaigns?select=id,title,badge,description,image_url,cta_label,cta_href&is_active=eq.true&order=sort_order.asc&limit=3`, {
      headers: supabaseHeaders(),
      cache: "no-store",
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

export default async function CampaignSection() {
  const campaigns = await getCampaigns();
  if (!campaigns.length) return null;

  return (
    <section className="border-b border-white/10 bg-[#070b0c] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1420px]">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-black tracking-[.32em] text-[#c9ff35]">AKTUELT</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Tilbud og kampanjer</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="relative isolate min-h-[230px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0f10] p-6">
              {campaign.image_url && <img src={campaign.image_url} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
              {campaign.badge && <span className="inline-flex rounded-full bg-[#c9ff35] px-3 py-1 text-[9px] font-black tracking-[.18em] text-black">{campaign.badge}</span>}
              <h3 className="mt-4 max-w-sm text-2xl font-black">{campaign.title}</h3>
              {campaign.description && <p className="mt-2 max-w-md text-sm leading-6 text-zinc-300">{campaign.description}</p>}
              {campaign.cta_label && campaign.cta_href && <a href={campaign.cta_href} className="mt-5 inline-flex rounded-md border border-white/20 bg-black/30 px-4 py-2.5 text-xs font-black text-white transition hover:border-[#c9ff35]/50">{campaign.cta_label} →</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
