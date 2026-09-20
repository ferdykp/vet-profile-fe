import Icon from "@/components/Icon";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/lib/api";
import { formatDate, mediaUrl } from "@/lib/format";
import BlockContent from "@/components/BlockContent";
import PostCard from "@/components/PostCard";
import { portrait } from "@/lib/demo-data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getPost(slug);
  if (!res) return { title: "Article" };
  const p = res.data;
  return {
    title: p.seo_title || p.title,
    description: p.seo_description || p.excerpt,
    robots: {
      index: p.allow_indexing !== false,
      follow: true,
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const res = await getPost(slug);
  if (!res) notFound();

  const post = res.data;
  const profile = post.author?.profile || {};
  const authorImage = mediaUrl(profile.profile_photo, portrait);
  const heroImage = mediaUrl(post.featured_media);

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <article className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ARTICLE HEADER */}
        <header className="space-y-6 pb-6 border-b border-[#526a5a]/10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#526a5a]">
            {post.category?.name || "Clinical Pathology"} · Case Study
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#14261d] leading-tight max-w-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-[#424844] max-w-3xl border-l-2 border-[#526a5a]/20 pl-4">
              “{post.excerpt}”
            </p>
          )}

          {/* AUTHOR & META BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-[#f5f3ed] rounded-xl border border-[#526a5a]/10">
            <div className="flex items-center gap-3">
              <img
                src={authorImage}
                alt={profile.full_name || "Author"}
                className="w-12 h-12 rounded-full object-cover border border-[#526a5a]/20"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <b className="text-xs font-bold uppercase tracking-wider text-[#14261d]">
                    {profile.full_name || "drh. Tiara"}
                  </b>
                  <span className="px-2 py-0.5 rounded-full bg-[#fbf9f3] text-[10px] uppercase font-semibold text-[#526a5a] border border-[#526a5a]/10">
                    Clinician & Author
                  </span>
                </div>
                <p className="text-xs text-[#59625b]">
                  {profile.professional_title || "DVM · Veterinary Clinician"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#424844]">
              <span className="inline-flex items-center gap-1">
                <Icon name="book" className="w-4 h-4 text-[#526a5a]" />{" "}
                {formatDate(post.published_at)}
              </span>
              <span>•</span>
              <span>◷ {post.reading_time || 5} min read</span>
              <span>•</span>
              <span className="text-[#526a5a] font-semibold">
                ✓ Peer-Reviewed Notes
              </span>
            </div>
          </div>
        </header>

        {/* FEATURED MEDIA FIGURE */}
        {heroImage && (
          <figure className="rounded-xl overflow-hidden bg-[#f5f3ed] border border-[#526a5a]/10 shadow-sm space-y-3 p-2">
            <div className="relative aspect-[21/9] sm:aspect-[2.2/1] overflow-hidden rounded-lg bg-[#293c32]">
              <img
                src={heroImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#14261d]/80 text-white backdrop-blur-sm">
                Specimen ID · Clinical Archive
              </span>
            </div>
            <figcaption className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-3 py-1 text-xs text-[#424844]">
              <p>
                <b>Fig 1.1:</b> Visual findings associated with this monograph.
                Interpret observations within complete history and clinical
                context.
              </p>
              <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-[10px] uppercase tracking-wider text-[#526a5a] font-semibold whitespace-nowrap">
                Clinical Archives
              </span>
            </figcaption>
          </figure>
        )}

        {/* MAIN CONTENT & SIDEBAR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Article Body */}
          <div className="lg:col-span-8 space-y-6">
            <BlockContent content={post.content} />

            {!post.content && (
              <div className="space-y-4 text-base text-[#424844] leading-relaxed">
                <p>{post.excerpt}</p>
                <h2 className="text-2xl font-serif font-semibold text-[#14261d] pt-2">
                  Observation Before Conclusion
                </h2>
                <p>
                  Every diagnostic story begins with attention: to the patient,
                  to the sample, and to the context around both.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-5 bg-[#f5f3ed] rounded-xl border-l-4 border-[#c9866b] border-y border-r border-[#526a5a]/10 space-y-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#526a5a]">
                Clinical Note
              </span>
              <p className="text-xs text-[#424844] leading-relaxed">
                Clinical writing is educational and does not replace
                patient-specific veterinary assessment and diagnosis.
              </p>
            </div>

            <div className="p-5 bg-[#f5f3ed] rounded-xl border-l-4 border-[#526a5a] border-y border-r border-[#526a5a]/10 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#526a5a]">
                Filed Under
              </span>
              <p className="text-sm font-semibold text-[#14261d]">
                {post.category?.name || "Veterinary Medicine"}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((t) => (
                    <Link
                      key={t.id}
                      href={`/journal?tag=${t.slug}`}
                      className="text-xs text-[#526a5a] hover:underline"
                    >
                      #{t.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* AUTHOR BIO BOX */}
        <section className="p-6 bg-[#e7ece5] rounded-xl border border-[#526a5a]/10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={authorImage}
            alt={profile.full_name || "Author"}
            className="w-16 h-16 rounded-full object-cover border border-[#526a5a]/20 flex-shrink-0"
          />
          <div className="space-y-1 flex-1">
            <span className="block text-xs uppercase tracking-wider text-[#526a5a] font-bold">
              About the Author
            </span>
            <h3 className="text-xl font-serif font-semibold text-[#14261d]">
              {profile.full_name || "drh. Tiara"}
            </h3>
            <p className="text-xs text-[#424844] leading-relaxed">
              {profile.short_bio || "Veterinary clinician and writer."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#526a5a] hover:underline pt-1"
            >
              View professional profile{" "}
              <Icon name="external" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* RELATED POSTS */}
        {res.related?.length > 0 && (
          <section className="pt-10 border-t border-[#526a5a]/10 space-y-6">
            <div className="space-y-1">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Continue Reading
              </span>
              <h2 className="text-2xl font-serif font-semibold text-[#14261d]">
                Companion Case Monographs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {res.related.slice(0, 2).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
