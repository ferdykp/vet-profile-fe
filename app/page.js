import Icon from "@/components/Icon";
import { safeUrl } from "@/lib/format";
import Link from "next/link";
import { getHome } from "@/lib/api";
import { formatDate, mediaUrl } from "@/lib/format";
import PostCard from "@/components/PostCard";
import { portrait } from "@/lib/demo-data";
export default async function Home() {
  const d = await getHome();
  const p = d.profile || {};
  const featured = d.featured_post || d.latest_posts?.[0];
  const latest = (d.latest_posts || []).filter(x => x.id !== featured?.id).slice(0, 3);
  const heroImage = mediaUrl(p.hero_photo, mediaUrl(p.profile_photo, portrait));
  const credentialCards = [["award", "Education", p.educations?.[0]?.degree || "Doctor of Veterinary Medicine (DVM)", "Clinical education grounded in evidence-led medicine."], ["leaf", "Experience", p.experiences?.[0]?.position || "Veterinary Clinician", "Years of clinical observation, diagnostics & communication."], ["award", "Clinical Focus", (p.clinical_interests || []).slice(0, 2).join(" · ") || "Internal Medicine · Cytology", "Pattern recognition, pathology, microscopy & bedside decisions."], ["book", "Selected Speaking", p.speaking_events?.[0]?.topic || "Veterinary Education", "Lectures and essays bridging clinical reasoning and narrative."]];
  return <>
      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-7 pb-18 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:pt-6 max-[800px]:pb-12 max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="flex justify-between items-center pt-1 pb-7 px-0 text-[12px] uppercase tracking-[0.13em] text-[#59625b] max-[800px]:hidden">
          <span><Icon name="award" className="size-5" /> Clinical Notes · Essays · Field Observations</span>
          <span>A journal of veterinary practice</span>
        </div>
        <div className="grid grid-cols-[minmax(0,_1.35fr)_minmax(330px,_0.65fr)] gap-20.5 items-center max-[1020px]:grid-cols-[1fr_0.75fr] max-[1020px]:gap-10.5 max-[800px]:grid-cols-1 max-[800px]:gap-7.5">
          <div className="py-3.5 px-0 [&_h1]:max-w-195 [&_h1]:mt-3.5 [&_h1]:mb-4.5 [&_h1]:mx-0 [&_h1]:text-[clamp(36px,_4.4vw,_56px)] [&_h1]:leading-[1.08] [&_>_p]:max-w-190 [&_>_p]:text-[#424844] [&_>_p]:text-[16px] [&_>_p]:leading-[1.75] max-[560px]:[&_h1]:text-[36px] max-[560px]:[&_>_p]:text-[15px]">
            <span className="inline-flex items-center py-1.5 px-2.5 rounded-full bg-[#cee9d5] text-[12px] tracking-[0.07em] uppercase text-[#526a5a] font-bold">
              Veterinarian · Writer · Lifelong Learner
            </span>
            <h1>Medicine, stories, and everything I learn along the way.</h1>
            <p>
              A personal space for sharing veterinary knowledge, clinical
              experiences, diagnostic observations, natural history, and
              contemplative reflections formed at the margins of patient care.
            </p>
            <div className="flex items-center gap-4 w-[min(760px,_100%)] mt-6.5 mb-4.5 mx-0 py-3 px-3.5 bg-[#f0eee8] rounded-[8px] text-[12px] text-[#59625b] [&_strong]:[font-family:var(--font-serif)] [&_strong]:text-[16px] [&_strong]:text-[#14261d] [&_strong]:font-medium max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-[5px]">
              <strong>{p.full_name || "drh. Tiara"}</strong>
              <span>DVM</span>
              <span>
                {p.professional_title || "Veterinary Medicine & Clinical Pathology"}
              </span>
            </div>
            <div className="flex gap-2.5 max-[560px]:flex-col">
              <Link href="/journal" className="inline-flex items-center justify-center gap-3 min-h-11 py-0 px-4 rounded-[7px] [border:1px_solid_transparent] text-[14px] font-bold tracking-[0.04em] uppercase [transition:0.2s] bg-[#293c32] text-[#fff] hover:[transform:translateY(-1px)] hover:bg-[#14261d]" data-ui="button primary">
                Explore the Journal <span><Icon name="external" className="size-5" /></span>
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-3 min-h-11 py-0 px-4 rounded-[7px] [border:1px_solid_transparent] text-[14px] font-bold tracking-[0.04em] uppercase [transition:0.2s] bg-[#f0eee8] text-[#14261d] hover:bg-[#eae8e2]" data-ui="button subtle">
                About Tiara <span><Icon name="external" className="size-5" /></span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center max-[800px]:justify-start">
            <div className="w-[min(100%,_420px)] p-[7px] rounded-[6px] bg-[#fff] shadow-[0_8px_20px_rgba(20,_38,_29,_0.12)] [&_>_img]:w-full [&_>_img]:aspect-[1.05/1] [&_>_img]:object-cover max-[800px]:w-[min(100%,_520px)]">
              <img src={heroImage} alt={p.full_name || "drh. Tiara"} />
              <div className="grid grid-cols-[1fr_auto] gap-[3px_12px] items-center pt-2.5 pb-[5px] px-2 text-[12px] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-1.5 [&_strong]:font-semibold [&_small]:text-[#59625b] [&_small]:[grid-column:1] [&_>_span]:[grid-column:2] [&_>_span]:[grid-row:1/3] [&_>_span]:text-[#526a5a]">
                <div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9866b]"></span>
                  <strong>Practicing Clinician</strong>
                </div>
                <small>
                  Writing between appointments &amp; microscope sessions
                </small>
                <span><Icon name="external" className="size-5" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f3ed] [border-top:1px_solid_rgba(82,_106,_90,_0.08)] [border-bottom:1px_solid_rgba(82,_106,_90,_0.08)]">
        <div className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto grid grid-cols-[0.75fr_1.55fr] gap-25 py-16 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[1020px]:gap-[55px] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:grid-cols-1 max-[800px]:gap-7.5 max-[800px]:py-12 max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="[&_h2]:max-w-87.5 [&_h2]:mt-[7px] [&_h2]:mb-4.5 [&_h2]:mx-0 [&_h2]:text-[39px] [&_h2]:leading-[1.12] [&_>_p]:max-w-82.5 [&_>_p]:text-[12px] [&_>_p]:uppercase [&_>_p]:tracking-[0.08em] [&_>_p]:leading-[1.6] [&_>_p]:text-[#59625b] max-[560px]:[&_h2]:text-[32px]">
            <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Perspective</span>
            <h2>Behind the Stethoscope &amp; the Notebook</h2>
            <div className="w-8 h-0.5 bg-[#c9866b] my-3.5 mx-0"></div>
            <p>
              Reflections from veterinary internal medicine, case work, cellular
              cytology, oncologic cases &amp; writing itself.
            </p>
          </div>
          <div className="[&_blockquote]:mt-0 [&_blockquote]:mb-8.5 [&_blockquote]:mx-0 [&_blockquote]:[font-family:var(--font-serif)] [&_blockquote]:text-[23px] [&_blockquote]:leading-[1.45] [&_blockquote]:italic [&_blockquote]:text-[#14261d]">
            <blockquote>
              “To veterinary medicine, diagnostic rigor is not simply an
              academic virtue — it is our primary ethical language for beings
              who cannot tell us where it hurts.”
            </blockquote>
            <div className="grid grid-cols-2 gap-11.5 [&_b]:text-[15px] [&_b]:text-[#14261d] [&_p]:mt-[9px] [&_p]:mb-4 [&_p]:mx-0 [&_p]:text-[15px] [&_p]:leading-[1.65] [&_p]:text-[#424844] [&_a]:text-[12px] [&_a]:uppercase [&_a]:tracking-[0.08em] [&_a]:text-[#526a5a] [&_a]:font-bold max-[800px]:gap-6 max-[560px]:grid-cols-1">
              <div>
                <b><Icon name="eye" className="size-5" /> Microscopic Attention</b>
                <p>
                  Whether examining an aspirate at reactive lymphadenopathy or
                  observing early septic shift in a feline patient, clinical
                  evidence starts with patient stillness.
                </p>
                <Link href="/journal">Read field pathology <Icon name="external" className="size-5" /></Link>
              </div>
              <div>
                <b><Icon name="leaf" className="size-5" /> The Narrative Cure</b>
                <p>
                  Medicine without narrative becomes clinical fatigue. Through
                  essays and micro-observations, I chronicle the emotional
                  complexities of animal stewardship.
                </p>
                <Link href="/journal">Human case-context reflections <Icon name="external" className="size-5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-18 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="flex justify-between items-end mb-6.5 [&_h2]:mt-[5px] [&_h2]:text-[34px] [&_>_a]:text-[12px] [&_>_a]:uppercase [&_>_a]:tracking-[0.08em] [&_>_a]:text-[#526a5a] max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-2 max-[560px]:[&_h2]:text-[30px]">
            <div>
              <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Monograph of the Month</span>
              <h2>Featured Dispatch</h2>
            </div>
            <Link href="/journal">Browse entire archive <Icon name="external" className="size-5" /></Link>
          </div>
          <article className="grid grid-cols-[1.3fr_0.9fr] min-h-97.5 rounded-[10px] overflow-hidden bg-[#f0eee8] shadow-[0_4px_14px_rgba(41,_60,_50,_0.06)] [&:hover_img]:[transform:scale(1.02)] max-[800px]:grid-cols-1">
            <Link href={`/journal/${featured.slug}`} className="relative min-h-97.5 overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:[transition:0.5s] [&_>_span]:absolute [&_>_span]:left-3 [&_>_span]:top-3 [&_>_span]:py-[5px] [&_>_span]:px-2 [&_>_span]:bg-[#5a2b16] [&_>_span]:rounded-full [&_>_span]:text-[#fff] [&_>_span]:text-[12px] [&_>_span]:tracking-[0.08em] [&_>_span]:uppercase max-[800px]:min-h-75">
              {mediaUrl(featured.featured_media) && <img src={mediaUrl(featured.featured_media)} alt="" />}
              <span><Icon name="award" className="size-5" /> Editor’s Selection</span>
            </Link>
            <div className="p-8 flex flex-col justify-between [&_h3]:mt-2.5 [&_h3]:mb-3 [&_h3]:mx-0 [&_h3]:text-[34px] [&_h3]:leading-[1.12] [&_>_p]:text-[15px] [&_>_p]:leading-[1.7] [&_>_p]:text-[#424844]">
              <div className="flex flex-wrap gap-2 text-[12px] uppercase tracking-[0.08em] text-[#59625b] [&_span:first-child]:text-[#526a5a] [&_span:first-child]:font-bold">
                <span>{featured.category?.name || "Clinical Case"}</span>
                <span>•</span>
                <span>{formatDate(featured.published_at)}</span>
                <span>•</span>
                <span>{featured.reading_time || 9} min read</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="mt-6 pt-4 [border-top:1px_solid_#d5ddd3] grid grid-cols-[34px_1fr_auto] gap-2.5 items-center [&_div]:flex [&_div]:flex-col [&_b]:text-[12px] [&_small]:text-[12px] [&_small]:text-[#59625b] [&_small]:mt-0.5 [&_>_a]:w-7 [&_>_a]:h-7 [&_>_a]:rounded-full [&_>_a]:grid [&_>_a]:place-items-center [&_>_a]:bg-[#fbf9f3] [&_>_a]:text-[15px]">
                <span className="w-7.5 h-7.5 rounded-full grid place-items-center bg-[#14261d] text-[#fff] [font-family:var(--font-serif)] text-[12px]">EV</span>
                <div>
                  <b>{p.full_name || "drh. Tiara"}</b>
                  <small>Practicing clinician &amp; writer</small>
                </div>
                <Link href={`/journal/${featured.slug}`}><Icon name="arrow" className="size-5" /></Link>
              </div>
            </div>
          </article>
        </section>}

      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-5 px-5.5 bg-[#eae8e2] rounded-[10px] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="flex justify-between items-center mb-3 text-[12px] uppercase tracking-[0.08em] text-[#59625b] [&_span]:text-[#526a5a]">
          <span>Explore Themes &amp; Dispatches</span>
          <small>{d.categories?.length || 0} Curated Knowledge Corridors</small>
        </div>
        <div className="flex flex-wrap gap-2 [&_a]:py-[7px] [&_a]:px-3 [&_a]:rounded-full [&_a]:bg-[#fbf9f3] [&_a]:text-[12px] [&_a]:uppercase [&_a]:tracking-[0.06em] [&_a]:text-[#424844] [&_a_small]:ml-[7px] [&_a_small]:opacity-[0.6] [&_a[data-ui~=active]]:bg-[#293c32] [&_a[data-ui~=active]]:text-[#fff]">
          <Link href="/journal" data-ui="active">
            All Dispatches <small>{d.latest_posts?.length || 0}</small>
          </Link>
          {(d.categories || []).map(c => <Link key={c.id} href={`/journal?category=${c.slug}`}>
              {c.name}
              <small>{c.posts_count || 0}</small>
            </Link>)}
        </div>
      </section>

      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-18 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="flex justify-between items-end mb-6.5 [&_h2]:mt-[5px] [&_h2]:text-[34px] [&_>_a]:text-[12px] [&_>_a]:uppercase [&_>_a]:tracking-[0.08em] [&_>_a]:text-[#526a5a] max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-2 max-[560px]:[&_h2]:text-[30px]">
          <div>
            <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">The Practitioner’s Archive</span>
            <h2>Recent Journal Entries</h2>
          </div>
          <Link href="/journal">Complete clinical archive <Icon name="external" className="size-5" /></Link>
        </div>
        <div className="grid grid-cols-[1.3fr_0.8fr] gap-5.5 max-[800px]:grid-cols-1">
          {latest.slice(0, 2).map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
        </div>
        {latest[2] && <div className="mt-5.5 [&_[data-ui~=journal-card]]:grid [&_[data-ui~=journal-card]]:grid-cols-[1.25fr_1fr] [&_[data-ui~=journal-card-image]]:h-47.5 max-[800px]:[&_[data-ui~=journal-card]]:block max-[800px]:[&_[data-ui~=journal-card-image]]:h-57.5">
            <PostCard post={latest[2]} large />
          </div>}
      </section>

      <section className="py-16 px-0 bg-[#eae8e2]">
        <div className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="flex justify-between gap-15 items-end mb-6.5 [&_h2]:text-[34px] [&_h2]:mt-[5px] [&_>_p]:max-w-77.5 [&_>_p]:text-[12px] [&_>_p]:leading-[1.55] [&_>_p]:text-[#59625b] max-[800px]:items-start max-[800px]:flex-col max-[560px]:[&_h2]:text-[30px]">
            <div>
              <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Scholarly Footprint</span>
              <h2>Clinical Acumen &amp; Background</h2>
            </div>
            <p>
              Bringing bedside acumen with peer-reviewed literature and
              veterinary education.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(4,_1fr)] gap-3.5 max-[1020px]:grid-cols-[repeat(2,_1fr)] max-[560px]:grid-cols-1">
            {credentialCards.map(([icon, title, value, description]) => <div key={title} className="min-h-62.5 bg-[#fbf9f3] rounded-[8px] p-5 [border:1px_solid_rgba(82,_106,_90,_0.08)] [&_h3]:[font-family:var(--font-sans)] [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:mt-4.5 [&_h3]:mb-[9px] [&_h3]:mx-0 [&_b]:block [&_b]:text-[12px] [&_b]:leading-[1.5] [&_b]:text-[#424844] [&_p]:text-[12px] [&_p]:leading-[1.55] [&_p]:text-[#59625b] [&_p]:mt-2 [&_p]:mb-6 [&_p]:mx-0 [&_small]:text-[11px] [&_small]:uppercase [&_small]:tracking-[0.08em] [&_small]:text-[#526a5a]">
                <span className="w-7 h-7 rounded-[7px] grid place-items-center bg-[#cee9d5] text-[#526a5a] text-[15px]"><Icon name={icon} /></span>
                <h3>{title}</h3>
                <b>{value}</b>
                <p>{description}</p>
                <small>Selected professional record</small>
              </div>)}
          </div>
        </div>
      </section>

      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-18 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="flex justify-between items-end mb-6.5 [&_h2]:mt-[5px] [&_h2]:text-[34px] [&_>_a]:text-[12px] [&_>_a]:uppercase [&_>_a]:tracking-[0.08em] [&_>_a]:text-[#526a5a] max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-2 max-[560px]:[&_h2]:text-[30px]">
          <div>
            <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Educator &amp; Companion</span>
            <h2>Curated Clinician Resources</h2>
          </div>
          <Link href="/resources">View all recommended guides <Icon name="external" className="size-5" /></Link>
        </div>
        <div className="grid grid-cols-[repeat(3,_1fr)] gap-4.5 max-[800px]:grid-cols-1">
          {(d.featured_resources || []).slice(0, 3).map((r, i) => <a key={r.id} href={safeUrl(r.url, "/resources")} className="min-h-67.5 p-5 rounded-[8px] bg-[#f5f3ed] [border:1px_solid_rgba(82,_106,_90,_0.08)] [transition:0.2s] hover:[transform:translateY(-2px)] hover:shadow-[0_8px_24px_-4px_rgba(41,_60,_50,_0.07)] [&_small]:text-[11px] [&_small]:uppercase [&_small]:tracking-[0.07em] [&_small]:text-[#59625b] [&_h3]:text-[21px] [&_h3]:leading-[1.1] [&_h3]:mt-[7px] [&_h3]:mb-2.5 [&_h3]:mx-0 [&_p]:text-[13px] [&_p]:leading-[1.6] [&_p]:text-[#424844] [&_>_b]:block [&_>_b]:mt-4.5 [&_>_b]:text-[11px] [&_>_b]:uppercase [&_>_b]:tracking-[0.07em] [&_>_b]:text-[#526a5a]">
              <span className="w-7.5 h-7.5 rounded-[7px] grid place-items-center mb-5.5 text-[15px] [&[data-ui~=resource-0]]:bg-[#14261d] [&[data-ui~=resource-0]]:text-[#fff] [&[data-ui~=resource-1]]:bg-[#cee9d5] [&[data-ui~=resource-1]]:text-[#526a5a] [&[data-ui~=resource-2]]:bg-[#e7d9d2] [&[data-ui~=resource-2]]:text-[#5a2b16]" data-ui={`resource-symbol ${["resource-0", "resource-1", "resource-2"][i % 3]}`}>
                <Icon name={i === 1 ? "leaf" : "book"} />
              </span>
              <small>{String(r.type || "resource").replaceAll("_", " ")}</small>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <b>
                {i === 0 ? "View resource" : i === 1 ? "Explore resource" : "View reading list"}{" "}
                <Icon name="external" className="size-5" />
              </b>
            </a>)}
        </div>
      </section>
    </>;
}
