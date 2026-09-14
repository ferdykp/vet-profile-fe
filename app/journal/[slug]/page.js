import Icon from "@/components/Icon";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/lib/api";
import { formatDate, mediaUrl } from "@/lib/format";
import BlockContent from "@/components/BlockContent";
import PostCard from "@/components/PostCard";
import { portrait } from "@/lib/demo-data";
export async function generateMetadata({
  params
}) {
  const {
    slug
  } = await params;
  const res = await getPost(slug);
  if (!res) return {
    title: "Article"
  };
  const p = res.data;
  return {
    title: p.seo_title || p.title,
    description: p.seo_description || p.excerpt,
    robots: {
      index: p.allow_indexing !== false,
      follow: true
    }
  };
}
export default async function Article({
  params
}) {
  const {
    slug
  } = await params;
  const res = await getPost(slug);
  if (!res) notFound();
  const post = res.data;
  const profile = post.author?.profile || {};
  const authorImage = mediaUrl(profile.profile_photo, portrait);
  const heroImage = mediaUrl(post.featured_media);
  return <>
      <article className="pt-2.5">
        <header className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-7.5 pb-8 [&_h1]:max-w-270 [&_h1]:text-[clamp(32px,_4vw,_52px)] [&_h1]:leading-[1.12] [&_h1]:mt-2.5 [&_h1]:mb-3 [&_h1]:mx-0 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)] max-[560px]:[&_h1]:text-[39px]">
          <div className="text-[12px] uppercase tracking-[0.1em] text-[#526a5a] font-bold">
            {post.category?.name || "Clinical Pathology"} · Case Study · Series
            04
          </div>
          <h1>{post.title}</h1>
          <p className="max-w-225 [font-family:var(--font-serif)] italic text-[22px] leading-[1.5] text-[#424844] max-[560px]:text-[19px]">“{post.excerpt}”</p>
          <div className="flex justify-between items-center gap-[25px] mt-7 py-3.5 px-4 bg-[#f5f3ed] rounded-[10px] max-[800px]:items-start max-[800px]:flex-col">
            <div className="flex items-center gap-[11px] [&_>_img]:w-12 [&_>_img]:h-12 [&_>_img]:rounded-full [&_>_img]:object-cover [&_>_div]:grid [&_>_div]:grid-cols-[auto_auto] [&_>_div]:gap-[2px_7px] [&_>_div]:items-center [&_b]:text-[12px] [&_b]:uppercase [&_b]:tracking-[0.06em] [&_b]:text-[#14261d] [&_span]:py-[3px] [&_span]:px-1.5 [&_span]:rounded-full [&_span]:bg-[#fbf9f3] [&_span]:text-[11px] [&_span]:uppercase [&_span]:tracking-[0.06em] [&_span]:text-[#526a5a] [&_small]:[grid-column:1/3] [&_small]:text-[12px] [&_small]:text-[#59625b]">
              <img src={authorImage} alt="" />
              <div>
                <b>{profile.full_name || "drh. Tiara"}</b>
                <span>Clinician &amp; Author</span>
                <small>
                  {profile.professional_title || "DVM · Veterinary Clinician"}
                </small>
              </div>
            </div>
            <div className="flex flex-wrap gap-[9px] text-[12px] text-[#424844]">
              <span><Icon name="book" className="size-5" /> {formatDate(post.published_at)}</span>
              <span>•</span>
              <span>◷ {post.reading_time || 5} min read</span>
              <span>•</span>
              <span>✓ Peer-Reviewed Notes</span>
            </div>
          </div>
        </header>

        {heroImage && <figure className="w-[min(1280px,_calc(100%_-_96px))] mt-0 mb-[45px] mx-auto bg-[#f5f3ed] rounded-[12px] overflow-hidden [&_figcaption]:flex [&_figcaption]:justify-between [&_figcaption]:gap-5 [&_figcaption]:items-center [&_figcaption]:py-3.5 [&_figcaption]:px-4.5 [&_figcaption_p]:max-w-225 [&_figcaption_p]:m-0 [&_figcaption_p]:text-[12px] [&_figcaption_p]:leading-[1.6] [&_figcaption_p]:text-[#424844] [&_figcaption_>_span]:[white-space:nowrap] [&_figcaption_>_span]:py-[5px] [&_figcaption_>_span]:px-2 [&_figcaption_>_span]:rounded-full [&_figcaption_>_span]:bg-[#f0eee8] [&_figcaption_>_span]:text-[11px] [&_figcaption_>_span]:uppercase [&_figcaption_>_span]:tracking-[0.07em] [&_figcaption_>_span]:text-[#526a5a] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)] max-[560px]:[&_figcaption]:items-start max-[560px]:[&_figcaption]:flex-col">
            <div className="relative aspect-[21/9] overflow-hidden bg-[#293c32] [&_img]:w-full [&_img]:h-full [&_img]:object-cover max-[800px]:aspect-[16/9]">
              <img src={heroImage} alt="" />
              <span className="absolute py-1.5 px-[9px] rounded-[5px] text-[11px] uppercase tracking-[0.09em] right-3.5 top-3.5 bg-[rgba(20,_38,_29,_0.8)] text-[#fff]">100x Oil Immersion</span>
              <span className="absolute py-1.5 px-[9px] rounded-[5px] text-[11px] uppercase tracking-[0.09em] left-3.5 bottom-3.5 bg-[rgba(251,_249,_243,_0.9)] text-[#14261d]">
                Specimen ID · Clinical Archive
              </span>
            </div>
            <figcaption>
              <p>
                <b>Fig 1.1:</b> Clinical image associated with this veterinary
                monograph. Interpret visual findings within the complete
                history, examination and diagnostic context.
              </p>
              <span>Clinical Archives</span>
            </figcaption>
          </figure>}

        <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto grid grid-cols-[minmax(0,_8fr)_minmax(230px,_4fr)] gap-17.5 [align-items:start] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:grid-cols-1 max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="max-w-205">
            <BlockContent content={post.content} />
            {!post.content && <div className="text-[17px] leading-[1.85] text-[#1b1c18] [&_>_p:first-child:first-letter]:[float:left] [&_>_p:first-child:first-letter]:mt-[3px] [&_>_p:first-child:first-letter]:mr-2 [&_>_p:first-child:first-letter]:mb-0 [&_>_p:first-child:first-letter]:ml-0 [&_>_p:first-child:first-letter]:[font-family:var(--font-serif)] [&_>_p:first-child:first-letter]:text-[58px] [&_>_p:first-child:first-letter]:leading-[0.78] [&_>_p:first-child:first-letter]:text-[#14261d] [&_p]:mt-0 [&_p]:mb-[21px] [&_p]:mx-0 [&_h2]:text-[31px] [&_h2]:mt-11.5 [&_h2]:mb-3.5 [&_h2]:mx-0 [&_h3]:text-[23px] [&_h3]:mt-8.5 [&_h3]:mb-[11px] [&_h3]:mx-0 [&_blockquote]:my-[35px] [&_blockquote]:mx-0 [&_blockquote]:py-2 [&_blockquote]:pr-0 [&_blockquote]:pl-5.5 [&_blockquote]:[border-left:2px_solid_#c9866b] [&_blockquote]:[font-family:var(--font-serif)] [&_blockquote]:text-[23px] [&_blockquote]:leading-[1.5] [&_blockquote]:italic [&_blockquote]:text-[#14261d] [&_figure]:my-8.5 [&_figure]:mx-0 [&_figure_img]:w-full [&_figure_img]:rounded-[10px] [&_figcaption]:mt-[7px] [&_figcaption]:text-[12px] [&_figcaption]:text-[#59625b] [&_ol]:pl-6 [&_ol]:my-5 [&_ol]:mx-0 [&_ul]:pl-6 [&_ul]:my-5 [&_ul]:mx-0 [&_li]:my-[9px] [&_li]:mx-0 [&_li]:pl-1.5">
                <p>{post.excerpt}</p>
                <h2>Observation before conclusion</h2>
                <p>
                  Every diagnostic story begins with attention: to the patient,
                  to the sample, and to the context around both.
                </p>
              </div>}
          </div>
          <aside className="flex flex-col gap-4.5 sticky top-[105px] [&_>_div]:p-4.5 [&_>_div]:bg-[#f5f3ed] [&_>_div]:rounded-[8px] [&_>_div]:[border-left:2px_solid_#c9866b] [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[0.09em] [&_span]:text-[#526a5a] [&_span]:font-bold [&_p]:text-[12px] [&_p]:leading-[1.6] [&_p]:text-[#424844] [&_a]:text-[12px] [&_a]:leading-[1.6] [&_a]:text-[#526a5a] [&_a]:inline-block [&_a]:mr-1.5 max-[800px]:static max-[800px]:[order:-1]">
            <div>
              <span>Clinical Note</span>
              <p>
                Clinical writing is educational and does not replace
                patient-specific veterinary assessment.
              </p>
            </div>
            <div>
              <span>Filed Under</span>
              <p>{post.category?.name || "Veterinary Medicine"}</p>
              {post.tags?.map(t => <Link key={t.id} href={`/journal?tag=${t.slug}`}>
                  #{t.name}
                </Link>)}
            </div>
          </aside>
        </section>

        <section className="w-[min(1280px,_calc(100%_-_96px))] mt-17.5 mb-0 mx-auto grid grid-cols-[70px_1fr] gap-4.5 max-w-225 p-6 bg-[#e7ece5] rounded-[10px] [&_>_img]:w-16 [&_>_img]:h-16 [&_>_img]:rounded-full [&_>_img]:object-cover [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[0.08em] [&_span]:text-[#526a5a] [&_h3]:text-[23px] [&_h3]:my-[3px] [&_h3]:mx-0 [&_p]:text-[13px] [&_p]:text-[#424844] [&_a]:text-[12px] [&_a]:uppercase [&_a]:tracking-[0.06em] [&_a]:text-[#526a5a] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)] max-[560px]:grid-cols-1">
          <img src={authorImage} alt="" />
          <div>
            <span>About the author</span>
            <h3>{profile.full_name || "drh. Tiara"}</h3>
            <p>{profile.short_bio || "Veterinary clinician and writer."}</p>
            <Link href="/about">View professional profile <Icon name="external" className="size-5" /></Link>
          </div>
        </section>
      </article>

      {res.related?.length > 0 && <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-18 pb-5 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
          <div className="flex justify-between items-end mb-6.5 [&_h2]:mt-[5px] [&_h2]:text-[34px] [&_>_a]:text-[12px] [&_>_a]:uppercase [&_>_a]:tracking-[0.08em] [&_>_a]:text-[#526a5a] max-[560px]:items-start max-[560px]:flex-col max-[560px]:gap-2 max-[560px]:[&_h2]:text-[30px]">
            <div>
              <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Continue Reading</span>
              <h2>Companion Case Monographs</h2>
            </div>
          </div>
          <div className="grid grid-cols-[1.3fr_0.8fr] gap-5.5 max-[800px]:grid-cols-1">
            {res.related.slice(0, 2).map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </section>}
    </>;
}
