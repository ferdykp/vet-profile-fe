import Icon from "@/components/Icon";
import { getProfile } from "@/lib/api";
import { mediaUrl } from "@/lib/format";
import { portrait } from "@/lib/demo-data";
export const metadata = {
  title: "About"
};
export default async function About() {
  const p = await getProfile();
  const profileImage = mediaUrl(p.profile_photo, portrait);
  const story = p.biography || "My work lives at the intersection of diagnostic precision and humane communication. I write to make complex veterinary medicine clearer, more memorable, and more useful at the bedside.";
  return <>
      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto grid grid-cols-[5fr_7fr] gap-18 items-center pt-10 pb-18.5 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:grid-cols-1 max-[800px]:gap-9.5 max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="relative max-w-130 max-[800px]:max-w-125">
          <div className="absolute [inset:-12px] bg-[rgba(206,_233,_213,_0.45)] rounded-[12px] [transform:rotate(-1deg)]"></div>
          <div className="relative overflow-hidden rounded-[12px] bg-[#f5f3ed] shadow-[0_2px_8px_rgba(41,_60,_50,_0.08)] [&_>_img]:w-full [&_>_img]:aspect-[1/1] [&_>_img]:object-cover [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:items-center [&_>_div]:p-[15px] [&_span]:flex [&_span]:flex-col [&_b]:text-[12px] [&_b]:uppercase [&_b]:tracking-[0.08em] [&_b]:text-[#526a5a] [&_small]:text-[12px] [&_small]:text-[#424844] [&_small]:mt-1 [&_i]:w-2 [&_i]:h-2 [&_i]:rounded-full [&_i]:bg-[#c9866b]">
            <img src={profileImage} alt={p.full_name || "drh. Tiara"} />
            <div>
              <span>
                <b>{p.location || "Gloucestershire & Oxford"}</b>
                <small>Small Animal Medicine · Clinical Pathology</small>
              </span>
              <i></i>
            </div>
          </div>
        </div>
        <div className="[&_>_small]:text-[13px] [&_>_small]:uppercase [&_>_small]:tracking-[0.08em] [&_>_small]:text-[#526a5a] [&_h1]:text-[clamp(32px,_4vw,_52px)] [&_h1]:leading-[1.12] [&_h1]:mt-2 [&_h1]:mb-4.5 [&_h1]:mx-0 [&_>_p]:max-w-180 [&_>_p]:text-[16px] [&_>_p]:leading-[1.75] [&_>_p]:text-[#424844] max-[560px]:[&_h1]:text-[39px]">
          <div className="flex items-center gap-[9px] mb-4 [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[0.09em] [&_span]:text-[#526a5a]">
            <span>Curriculum Vitae &amp; Ethos</span>
            <b>•</b>
            <span>Est. 2011</span>
          </div>
          <small>{p.full_name || "drh. Tiara"}, DVM</small>
          <h1>
            {p.headline || "Bridging the science of veterinary diagnostics with the human stories behind every patient."}
          </h1>
          <p>{p.short_bio}</p>
          <div className="flex flex-wrap gap-[14px_26px] mt-5.5 [&_span]:text-[12px] [&_span]:text-[#526a5a] max-[560px]:flex-col max-[560px]:gap-2">
            <span>
              ✓ {p.educations?.[0]?.degree || "Doctor of Veterinary Medicine"}
            </span>
            <span>
              ✚{" "}
              {p.memberships?.[0]?.organization || "Professional Veterinary Membership"}
            </span>
            <span><Icon name="book" className="size-5" /> Contributing Essayist & Speaker</span>
          </div>
        </div>
      </section>

      <section className="py-17 px-0 bg-[#f5f3ed]">
        <div className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="max-w-195 mb-7 [&_>_span]:text-[12px] [&_>_span]:uppercase [&_>_span]:tracking-[0.09em] [&_>_span]:text-[#526a5a] [&_>_span]:font-bold [&_h2]:text-[38px] [&_h2]:mt-1 max-[560px]:[&_h2]:text-[32px]">
            <span>Narrative</span>
            <h2>The Thread Between the Microscope &amp; the Page</h2>
          </div>
          <div className="grid grid-cols-[repeat(3,_1fr)] gap-5 [&_article]:min-h-82.5 [&_article]:p-6.5 [&_article]:bg-[#fbf9f3] [&_article]:rounded-[10px] [&_article]:shadow-[0_1px_5px_rgba(41,_60,_50,_0.05)] [&_article]:flex [&_article]:flex-col [&_article_>_span]:[font-family:var(--font-serif)] [&_article_>_span]:text-[30px] [&_article_>_span]:text-[#c9866b] [&_h3]:text-[21px] [&_h3]:my-[9px] [&_h3]:mx-0 [&_p]:text-[14px] [&_p]:leading-[1.75] [&_p]:text-[#424844] [&_p]:[flex:1] [&_small]:text-[12px] [&_small]:uppercase [&_small]:tracking-[0.08em] [&_small]:text-[#526a5a] max-[1020px]:grid-cols-1 max-[1020px]:[&_article]:min-h-auto">
            {[["I.", "Forest Basins & Keen Curiosity", story, "Origins · Natural Science"], ["II.", "The Intensity of the Clinic Floor", p.experiences?.[0]?.description || story, "Residency · Critical Care"], ["III.", "Writing as a Clinical Instrument", "The notebook became a second diagnostic tool: a way to interrogate uncertainty, preserve observations, and communicate difficult medicine with greater clarity.", "Practice · Clinical Writing"]].map(([n, t, c, f]) => <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{c}</p>
                <small>{f}</small>
              </article>)}
          </div>
        </div>
      </section>

      <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-18 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
        <div className="max-w-195 mb-7 [&_>_span]:text-[12px] [&_>_span]:uppercase [&_>_span]:tracking-[0.09em] [&_>_span]:text-[#526a5a] [&_>_span]:font-bold [&_h2]:text-[38px] [&_h2]:mt-1 max-[560px]:[&_h2]:text-[32px]">
          <span>Professional Record</span>
          <h2>Appointments, study &amp; clinical milestones</h2>
        </div>
        <div className="grid grid-cols-[1fr_300px] gap-17.5 max-[800px]:grid-cols-1">
          <div className="[border-top:1px_solid_#d5ddd3] [&_>_div]:grid [&_>_div]:grid-cols-[50px_1fr] [&_>_div]:gap-4 [&_>_div]:py-5.5 [&_>_div]:px-0 [&_>_div]:[border-bottom:1px_solid_#d5ddd3] [&_>_div_>_span]:text-[12px] [&_>_div_>_span]:text-[#526a5a] [&_section_small]:text-[12px] [&_section_small]:uppercase [&_section_small]:tracking-[0.07em] [&_section_small]:text-[#59625b] [&_h3]:text-[23px] [&_h3]:my-[5px] [&_h3]:mx-0 [&_p]:text-[14px] [&_p]:leading-[1.65] [&_p]:text-[#424844]">
            {(p.experiences || []).map((x, i) => <div key={x.id || i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <section>
                  <small>{x.organization}</small>
                  <h3>{x.position}</h3>
                  <p>{x.description}</p>
                </section>
              </div>)}
            {(p.educations || []).map((x, i) => <div key={`e${x.id || i}`}>
                <span>ED</span>
                <section>
                  <small>{x.institution}</small>
                  <h3>{x.degree}</h3>
                  <p>{x.description}</p>
                </section>
              </div>)}
          </div>
          <aside className="p-5.5 bg-[#e7ece5] rounded-[10px] h-[max-content] [&_>_span]:block [&_>_span]:mb-4 [&_>_span]:text-[12px] [&_>_span]:uppercase [&_>_span]:tracking-[0.09em] [&_>_span]:text-[#526a5a] [&_>_div]:grid [&_>_div]:grid-cols-[28px_1fr] [&_>_div]:gap-[7px] [&_>_div]:py-3 [&_>_div]:px-0 [&_>_div]:[border-top:1px_solid_rgba(82,_106,_90,_0.15)] [&_small]:text-[#526a5a] [&_small]:text-[12px] [&_b]:text-[13px]">
            <span>Clinical Inquiries</span>
            {(p.clinical_interests || []).map((x, i) => <div key={x}>
                <small>0{i + 1}</small>
                <b>{x}</b>
              </div>)}
          </aside>
        </div>
      </section>

      <section className="bg-[#eae8e2] py-16.5 px-0">
        <div className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="max-w-195 mb-7 [&_>_span]:text-[12px] [&_>_span]:uppercase [&_>_span]:tracking-[0.09em] [&_>_span]:text-[#526a5a] [&_>_span]:font-bold [&_h2]:text-[38px] [&_h2]:mt-1 max-[560px]:[&_h2]:text-[32px]">
            <span>Selected Work</span>
            <h2>Publications &amp; lectures</h2>
          </div>
          <div className="[border-top:1px_solid_#d5ddd3] [&_>_a]:grid [&_>_a]:grid-cols-[70px_1.4fr_1fr_30px] [&_>_a]:gap-[15px] [&_>_a]:items-center [&_>_a]:py-[17px] [&_>_a]:px-0 [&_>_a]:[border-bottom:1px_solid_#d5ddd3] [&_>_div]:grid [&_>_div]:grid-cols-[70px_1.4fr_1fr_30px] [&_>_div]:gap-[15px] [&_>_div]:items-center [&_>_div]:py-[17px] [&_>_div]:px-0 [&_>_div]:[border-bottom:1px_solid_#d5ddd3] [&_span]:text-[12px] [&_span]:text-[#59625b] [&_small]:text-[12px] [&_small]:text-[#59625b] [&_b]:[font-family:var(--font-serif)] [&_b]:text-[16px] [&_b]:font-medium [&_i]:text-right [&_i]:[font-style:normal] max-[800px]:[&_>_a]:grid-cols-[60px_1fr] max-[800px]:[&_>_div]:grid-cols-[60px_1fr] max-[800px]:[&_small]:[grid-column:2] max-[800px]:[&_i]:hidden">
            {(p.publications || []).map(x => <a href={x.url || "#"} key={x.id}>
                <span>{x.year}</span>
                <b>{x.title}</b>
                <small>{x.publisher}</small>
                <i><Icon name="external" className="size-5" /></i>
              </a>)}
            {(p.speaking_events || []).map(x => <div key={x.id}>
                <span>{x.event_date?.slice(0, 4)}</span>
                <b>{x.topic || x.event_name}</b>
                <small>{x.event_name}</small>
                <i>◌</i>
              </div>)}
          </div>
        </div>
      </section>
    </>;
}
