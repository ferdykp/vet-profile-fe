import Icon from "@/components/Icon";
import { getProfile } from "@/lib/api";
import { mediaUrl } from "@/lib/format";
import { portrait } from "@/lib/demo-data";

export const metadata = {
  title: "About",
};

export default async function About() {
  const p = await getProfile();
  const profileImage = mediaUrl(p.profile_photo, portrait);
  const story =
    p.biography ||
    "My work lives at the intersection of diagnostic precision and humane communication. I write to make complex veterinary medicine clearer, more memorable, and more useful at the bedside.";

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO / BIO SECTION */}
        <section className="py-12 md:py-16 lg:py-20 border-b border-[#526a5a]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-2.5 bg-[#cee9d5]/60 rounded-2xl -rotate-1"></div>
                <div className="relative overflow-hidden rounded-xl bg-[#f5f3ed] shadow-lg shadow-[#14261d]/5 border border-[#526a5a]/10 space-y-3 p-2.5">
                  <div className="aspect-square overflow-hidden rounded-lg bg-[#eae8e2]">
                    <img
                      src={profileImage}
                      alt={p.full_name || "drh. Tiara"}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex justify-between items-center px-3 py-2">
                    <div>
                      <b className="block text-xs uppercase tracking-wider text-[#526a5a]">
                        {p.location || "Gloucestershire & Oxford"}
                      </b>
                      <span className="block text-xs text-[#424844] mt-0.5">
                        Small Animal Medicine · Clinical Pathology
                      </span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c9866b] flex-shrink-0"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#526a5a] font-semibold">
                <span>Curriculum Vitae & Ethos</span>
                <span>•</span>
                <span>Est. 2011</span>
              </div>

              <div>
                <span className="block text-sm uppercase tracking-wider text-[#526a5a] font-bold">
                  {p.full_name || "drh. Tiara"}, DVM
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#14261d] leading-tight mt-1">
                  {p.headline ||
                    "Bridging the science of veterinary diagnostics with the human stories behind every patient."}
                </h1>
              </div>

              <p className="text-base text-[#424844] leading-relaxed max-w-2xl">
                {p.short_bio}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#526a5a] font-semibold">
                <span className="inline-flex items-center gap-1 bg-[#cee9d5]/50 px-3 py-1.5 rounded-md">
                  ✓{" "}
                  {p.educations?.[0]?.degree || "Doctor of Veterinary Medicine"}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#cee9d5]/50 px-3 py-1.5 rounded-md">
                  ✚{" "}
                  {p.memberships?.[0]?.organization ||
                    "Professional Veterinary Membership"}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#cee9d5]/50 px-3 py-1.5 rounded-md">
                  <Icon name="book" className="w-4 h-4" /> Contributing Essayist
                  & Speaker
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* NARRATIVE SECTION */}
      <section className="py-14 md:py-20 bg-[#f5f3ed] border-b border-[#526a5a]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              Narrative
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#14261d]">
              The Thread Between the Microscope & the Page
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [
                "I.",
                "Forest Basins & Keen Curiosity",
                story,
                "Origins · Natural Science",
              ],
              [
                "II.",
                "The Intensity of the Clinic Floor",
                p.experiences?.[0]?.description || story,
                "Residency · Critical Care",
              ],
              [
                "III.",
                "Writing as a Clinical Instrument",
                "The notebook became a second diagnostic tool: a way to interrogate uncertainty, preserve observations, and communicate difficult medicine with greater clarity.",
                "Practice · Clinical Writing",
              ],
            ].map(([n, t, c, f]) => (
              <article
                key={n}
                className="bg-[#fbf9f3] rounded-xl p-6 border border-[#526a5a]/10 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <span className="font-serif text-2xl text-[#c9866b] font-bold block">
                    {n}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                    {t}
                  </h3>
                  <p className="text-sm text-[#424844] leading-relaxed">{c}</p>
                </div>
                <span className="block pt-3 border-t border-[#526a5a]/10 text-xs uppercase tracking-wider text-[#526a5a]">
                  {f}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL RECORD SECTION */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              Professional Record
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#14261d]">
              Appointments, Study & Clinical Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Timeline Column */}
            <div className="lg:col-span-8 border-t border-[#d5ddd3] divide-y divide-[#d5ddd3]">
              {(p.experiences || []).length > 0 ||
              (p.educations || []).length > 0 ? (
                <>
                  {(p.experiences || []).map((x, i) => (
                    <div
                      key={x.id || i}
                      className="grid grid-cols-[40px_1fr] gap-4 py-6"
                    >
                      <span className="text-xs font-semibold text-[#526a5a] pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <section className="space-y-1">
                        <span className="block text-xs uppercase tracking-wider text-[#59625b]">
                          {x.organization}
                        </span>
                        <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                          {x.position}
                        </h3>
                        <p className="text-sm text-[#424844] leading-relaxed">
                          {x.description}
                        </p>
                      </section>
                    </div>
                  ))}

                  {(p.educations || []).map((x, i) => (
                    <div
                      key={`e${x.id || i}`}
                      className="grid grid-cols-[40px_1fr] gap-4 py-6"
                    >
                      <span className="text-xs font-semibold text-[#526a5a] pt-1">
                        ED
                      </span>
                      <section className="space-y-1">
                        <span className="block text-xs uppercase tracking-wider text-[#59625b]">
                          {x.institution}
                        </span>
                        <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                          {x.degree}
                        </h3>
                        <p className="text-sm text-[#424844] leading-relaxed">
                          {x.description}
                        </p>
                      </section>
                    </div>
                  ))}
                </>
              ) : (
                <div className="py-8 text-xs text-[#59625b] italic">
                  No experience or education records available.
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 p-6 bg-[#e7ece5] rounded-xl border border-[#526a5a]/10 space-y-4">
              <span className="block text-xs uppercase tracking-widest text-[#526a5a] font-bold border-b border-[#526a5a]/15 pb-2">
                Clinical Focus Areas
              </span>
              {(p.clinical_interests || []).length > 0 ? (
                <div className="divide-y divide-[#526a5a]/15">
                  {p.clinical_interests.map((x, i) => (
                    <div
                      key={x}
                      className="grid grid-cols-[30px_1fr] gap-2 py-2.5 items-center"
                    >
                      <small className="text-xs text-[#526a5a]">0{i + 1}</small>
                      <b className="text-xs text-[#14261d] font-semibold">
                        {x}
                      </b>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#59625b] italic">
                  No clinical interests listed.
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS & SPEAKING SECTION */}
      <section className="bg-[#eae8e2] py-14 md:py-20 border-t border-[#526a5a]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              Selected Work
            </span>
            <h2 className="text-3xl font-serif font-semibold text-[#14261d]">
              Publications & Lectures
            </h2>
          </div>

          {(p.publications || []).length > 0 ||
          (p.speaking_events || []).length > 0 ? (
            <div className="border-t border-[#d5ddd3] divide-y divide-[#d5ddd3]">
              {(p.publications || []).map((x) => (
                <a
                  href={x.url || "#"}
                  key={x.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center py-4 text-xs text-[#59625b] hover:text-[#14261d] transition-colors"
                >
                  <span className="sm:col-span-2 font-medium">{x.year}</span>
                  <b className="sm:col-span-6 font-serif text-base text-[#14261d] font-medium">
                    {x.title}
                  </b>
                  <small className="sm:col-span-3 text-xs text-[#59625b]">
                    {x.publisher}
                  </small>
                  <span className="sm:col-span-1 text-right hidden sm:block">
                    <Icon
                      name="external"
                      className="w-4 h-4 inline-block text-[#526a5a]"
                    />
                  </span>
                </a>
              ))}

              {(p.speaking_events || []).map((x) => (
                <div
                  key={x.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center py-4 text-xs text-[#59625b]"
                >
                  <span className="sm:col-span-2 font-medium">
                    {x.event_date?.slice(0, 4)}
                  </span>
                  <b className="sm:col-span-6 font-serif text-base text-[#14261d] font-medium">
                    {x.topic || x.event_name}
                  </b>
                  <small className="sm:col-span-3 text-xs text-[#59625b]">
                    {x.event_name}
                  </small>
                  <span className="sm:col-span-1 text-right hidden sm:block">
                    ◌
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-[#f0eee8] border border-dashed border-[#526a5a]/20">
              <p className="text-xs text-[#59625b]">
                No publications or speaking events listed yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
