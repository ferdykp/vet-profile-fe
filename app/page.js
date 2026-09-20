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
  const latest = (d.latest_posts || [])
    .filter((x) => x.id !== featured?.id)
    .slice(0, 3);
  const heroImage = mediaUrl(p.hero_photo, mediaUrl(p.profile_photo, portrait));

  const credentialCards = [
    {
      icon: "award",
      title: "Education",
      value: p.educations?.[0]?.degree || "Doctor of Veterinary Medicine (DVM)",
      description: "Clinical education grounded in evidence-led medicine.",
    },
    {
      icon: "leaf",
      title: "Experience",
      value: p.experiences?.[0]?.position || "Veterinary Clinician",
      description:
        "Years of clinical observation, diagnostics & communication.",
    },
    {
      icon: "award",
      title: "Clinical Focus",
      value:
        (p.clinical_interests || []).slice(0, 2).join(" · ") ||
        "Internal Medicine · Cytology",
      description:
        "Pattern recognition, pathology, microscopy & bedside decisions.",
    },
    {
      icon: "book",
      title: "Selected Speaking",
      value: p.speaking_events?.[0]?.topic || "Veterinary Education",
      description:
        "Lectures and essays bridging clinical reasoning and narrative.",
    },
  ];

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d]">
      {/* Container Wrapper Utility with 1400px Max Width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <header className="hidden md:flex justify-between items-center py-5 border-b border-[#526a5a]/10 text-xs uppercase tracking-widest text-[#59625b]">
          <span className="inline-flex items-center gap-2">
            <Icon name="award" className="w-4 h-4 text-[#526a5a]" />
            Clinical Notes · Essays · Field Observations
          </span>
          <span>A journal of veterinary practice</span>
        </header>

        {/* HERO SECTION */}
        <section className="py-10 md:py-16 lg:py-15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#cee9d5] text-xs font-bold tracking-wider text-[#526a5a] uppercase">
                  Veterinarian · Writer · Lifelong Learner
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#14261d] leading-[1.1] tracking-tight">
                Medicine, stories, and everything I learn along the way.
              </h1>

              <p className="text-base sm:text-lg text-[#424844] leading-relaxed max-w-3xl">
                A personal space for sharing veterinary knowledge, clinical
                experiences, diagnostic observations, natural history, and
                contemplative reflections formed at the margins of patient care.
              </p>

              {/* Profile Meta Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-[#f0eee8] rounded-lg text-xs text-[#59625b] border border-[#526a5a]/10 max-w-3xl">
                <strong className="font-serif text-base text-[#14261d] font-medium">
                  {p.full_name || "drh. Tiara"}
                </strong>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="font-semibold text-[#526a5a]">DVM</span>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span>
                  {p.professional_title ||
                    "Veterinary Medicine & Clinical Pathology"}
                </span>
              </div>

              {/* Hero Call-to-Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/journal"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-bold tracking-wider uppercase transition-all duration-200 bg-[#293c32] text-white hover:bg-[#14261d] hover:-translate-y-0.5 shadow-sm"
                >
                  Explore the Journal
                  <Icon name="external" className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-bold tracking-wider uppercase transition-all duration-200 bg-[#f0eee8] text-[#14261d] hover:bg-[#eae8e2] hover:-translate-y-0.5"
                >
                  About Tiara
                  <Icon name="external" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-6xl p-2.5 bg-white rounded-xl shadow-xl shadow-[#14261d]/5 border border-[#526a5a]/10 space-y-3">
                <div className="aspect-[4/3] sm:aspect-[1.15/1] overflow-hidden rounded-lg bg-[#f0eee8]">
                  <img
                    src={heroImage}
                    alt={p.full_name || "drh. Tiara"}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between px-2 py-1 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c9866b]"></span>
                      <strong className="text-[#14261d] font-semibold">
                        Practicing Clinician
                      </strong>
                    </div>
                    <p className="text-[#59625b]">
                      Writing between appointments & microscope sessions
                    </p>
                  </div>
                  <Icon
                    name="external"
                    className="w-4 h-4 text-[#526a5a] flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PERSPECTIVE SECTION */}
      <section className="bg-[#f5f3ed] border-y border-[#526a5a]/10 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Perspective Title */}
            <div className="lg:col-span-4 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Perspective
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#14261d] leading-tight">
                Behind the Stethoscope & the Notebook
              </h2>
              <div className="w-10 h-0.5 bg-[#c9866b]"></div>
              <p className="text-xs uppercase tracking-wider leading-relaxed text-[#59625b]">
                Reflections from veterinary internal medicine, case work,
                cellular cytology, oncologic cases & writing itself.
              </p>
            </div>

            {/* Perspective Quote & Details */}
            <div className="lg:col-span-8 space-y-8">
              <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#14261d] border-l-2 border-[#526a5a]/20 pl-6">
                “To veterinary medicine, diagnostic rigor is not simply an
                academic virtue — it is our primary ethical language for beings
                who cannot tell us where it hurts.”
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#526a5a]/10">
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-[#14261d]">
                    <Icon name="eye" className="w-4 h-4 text-[#526a5a]" />
                    Microscopic Attention
                  </h3>
                  <p className="text-sm text-[#424844] leading-relaxed">
                    Whether examining an aspirate at reactive lymphadenopathy or
                    observing early septic shift in a feline patient, clinical
                    evidence starts with patient stillness.
                  </p>
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#526a5a] hover:underline"
                  >
                    Read field pathology{" "}
                    <Icon name="external" className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-[#14261d]">
                    <Icon name="leaf" className="w-4 h-4 text-[#526a5a]" />
                    The Narrative Cure
                  </h3>
                  <p className="text-sm text-[#424844] leading-relaxed">
                    Medicine without narrative becomes clinical fatigue. Through
                    essays and micro-observations, I chronicle the emotional
                    complexities of animal stewardship.
                  </p>
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#526a5a] hover:underline"
                  >
                    Human case-context reflections{" "}
                    <Icon name="external" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#526a5a]/10 pb-4">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Monograph of the Month
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#14261d] mt-1">
                Featured Dispatch
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#526a5a] hover:underline"
            >
              Browse entire archive <Icon name="external" className="w-4 h-4" />
            </Link>
          </div>

          {featured ? (
            <article className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden bg-[#f0eee8] border border-[#526a5a]/10 shadow-sm transition-all hover:shadow-md">
              <Link
                href={`/journal/${featured.slug}`}
                className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] overflow-hidden group"
              >
                {mediaUrl(featured.featured_media) && (
                  <img
                    src={mediaUrl(featured.featured_media)}
                    alt={featured.title || "Featured Post"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#5a2b16] rounded-full text-white text-xs font-semibold tracking-wider uppercase shadow-md">
                  <Icon name="award" className="w-3.5 h-3.5" /> Editor’s
                  Selection
                </span>
              </Link>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#59625b]">
                    <span className="text-[#526a5a] font-bold">
                      {featured.category?.name || "Clinical Case"}
                    </span>
                    <span>•</span>
                    <span>{formatDate(featured.published_at)}</span>
                    <span>•</span>
                    <span>{featured.reading_time || 9} min read</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#14261d] leading-snug">
                    <Link
                      href={`/journal/${featured.slug}`}
                      className="hover:text-[#526a5a] transition-colors"
                    >
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-[#424844] leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#526a5a]/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14261d] text-white font-serif text-xs font-semibold">
                      EV
                    </span>
                    <div>
                      <strong className="block text-xs text-[#14261d]">
                        {p.full_name || "drh. Tiara"}
                      </strong>
                      <span className="block text-xs text-[#59625b]">
                        Practicing clinician & writer
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="p-2 rounded-full bg-[#fbf9f3] text-[#14261d] hover:bg-[#293c32] hover:text-white transition-colors"
                  >
                    <Icon name="arrow" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            /* EMPTY STATE FOR FEATURED POST */
            <div className="p-12 text-center rounded-xl bg-[#f0eee8] border border-dashed border-[#526a5a]/20 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#cee9d5] text-[#526a5a] flex items-center justify-center mx-auto">
                <Icon name="book" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#14261d]">
                No Featured Article Available
              </h3>
              <p className="text-xs text-[#59625b] max-w-md mx-auto">
                There are currently no featured dispatches available. Please
                check back later for new clinical entries and insights.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="py-8 bg-[#eae8e2] border-y border-[#526a5a]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-between items-center text-xs uppercase tracking-wider text-[#59625b]">
            <span className="font-semibold text-[#526a5a]">
              Explore Themes & Dispatches
            </span>
            <span>{d.categories?.length || 0} Curated Knowledge Corridors</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/journal"
              className="px-4 py-2 rounded-full bg-[#293c32] text-white text-xs font-semibold tracking-wider uppercase shadow-sm"
            >
              All Dispatches{" "}
              <span className="ml-1 opacity-75">
                ({d.latest_posts?.length || 0})
              </span>
            </Link>
            {(d.categories || []).length > 0 ? (
              d.categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/journal?category=${c.slug}`}
                  className="px-4 py-2 rounded-full bg-[#fbf9f3] text-[#424844] hover:bg-[#cee9d5] hover:text-[#14261d] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  {c.name}{" "}
                  <span className="ml-1 text-[#59625b]">
                    ({c.posts_count || 0})
                  </span>
                </Link>
              ))
            ) : (
              <span className="text-xs text-[#59625b] italic py-2">
                No categories available
              </span>
            )}
          </div>
        </div>
      </section>

      {/* RECENT POSTS ARCHIVE */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#526a5a]/10 pb-4">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                The Practitioner’s Archive
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#14261d] mt-1">
                Recent Journal Entries
              </h2>
            </div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#526a5a] hover:underline"
            >
              Complete clinical archive{" "}
              <Icon name="external" className="w-4 h-4" />
            </Link>
          </div>

          {latest && latest.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latest.slice(0, 2).map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>

              {latest[2] && (
                <div className="pt-4">
                  <PostCard post={latest[2]} large />
                </div>
              )}
            </>
          ) : (
            /* EMPTY STATE FOR RECENT POSTS */
            <div className="p-16 text-center rounded-xl bg-[#f0eee8]/50 border border-dashed border-[#526a5a]/20 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#f0eee8] text-[#526a5a] flex items-center justify-center mx-auto border border-[#526a5a]/10">
                <Icon name="award" className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-semibold text-[#14261d]">
                  No Recent Journal Entries
                </h3>
                <p className="text-xs text-[#59625b] max-w-md mx-auto">
                  There are no recent journal entries or published articles
                  added to the archive yet.
                </p>
              </div>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase bg-[#293c32] text-white hover:bg-[#14261d] transition-colors"
              >
                Visit Journal Page
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CREDENTIALS SECTION */}
      <section className="py-14 md:py-20 bg-[#eae8e2] border-t border-[#526a5a]/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Scholarly Footprint
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#14261d] mt-1">
                Clinical Acumen & Background
              </h2>
            </div>
            <p className="text-xs uppercase tracking-wider text-[#59625b] max-w-sm">
              Bringing bedside acumen with peer-reviewed literature and
              veterinary education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentialCards.map((item) => (
              <div
                key={item.title}
                className="bg-[#fbf9f3] rounded-xl p-6 border border-[#526a5a]/10 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#cee9d5] text-[#526a5a]">
                    <Icon name={item.icon} className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-[#14261d] uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <strong className="block text-sm text-[#424844] font-medium leading-snug">
                    {item.value}
                  </strong>
                  <p className="text-xs text-[#59625b] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <span className="block pt-3 border-t border-[#526a5a]/10 text-[10px] uppercase tracking-widest text-[#526a5a] font-semibold">
                  Selected professional record
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#526a5a]/10 pb-4">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Educator & Companion
              </span>
              <h2 className="text-3xl font-serif font-semibold text-[#14261d] mt-1">
                Curated Clinician Resources
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#526a5a] hover:underline"
            >
              View all recommended guides{" "}
              <Icon name="external" className="w-4 h-4" />
            </Link>
          </div>

          {d.featured_resources && d.featured_resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {d.featured_resources.slice(0, 3).map((r, i) => {
                const bgColors = [
                  "bg-[#14261d] text-white",
                  "bg-[#cee9d5] text-[#526a5a]",
                  "bg-[#e7d9d2] text-[#5a2b16]",
                ];
                const actionText = [
                  "View resource",
                  "Explore resource",
                  "View reading list",
                ][i % 3];

                return (
                  <a
                    key={r.id}
                    href={safeUrl(r.url, "/resources")}
                    className="group bg-[#f5f3ed] p-6 rounded-xl border border-[#526a5a]/10 flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgColors[i % 3]}`}
                      >
                        <Icon
                          name={i === 1 ? "leaf" : "book"}
                          className="w-4 h-4"
                        />
                      </span>
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#59625b]">
                        {String(r.type || "resource").replaceAll("_", " ")}
                      </span>
                      <h3 className="text-xl font-serif font-semibold text-[#14261d] group-hover:text-[#526a5a] transition-colors leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-xs text-[#424844] leading-relaxed">
                        {r.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#526a5a]">
                      {actionText}{" "}
                      <Icon
                        name="external"
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE FOR RESOURCES */
            <div className="p-12 text-center rounded-xl bg-[#f0eee8] border border-dashed border-[#526a5a]/20 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#cee9d5] text-[#526a5a] flex items-center justify-center mx-auto">
                <Icon name="leaf" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#14261d]">
                No Resources Available
              </h3>
              <p className="text-xs text-[#59625b] max-w-md mx-auto">
                Recommended readings and clinical education materials have not
                been added yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
