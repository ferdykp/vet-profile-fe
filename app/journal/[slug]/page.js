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
    <>
      <article className="monograph">
        <header className="article-top page-shell">
          <div className="article-series">
            {post.category?.name || "Clinical Pathology"} · Case Study · Series
            04
          </div>
          <h1>{post.title}</h1>
          <p className="article-deck">“{post.excerpt}”</p>
          <div className="article-attribution">
            <div className="attribution-author">
              <img src={authorImage} alt="" />
              <div>
                <b>{profile.full_name || "drh. Tiara"}</b>
                <span>Clinician &amp; Author</span>
                <small>
                  {profile.professional_title || "DVM · Veterinary Clinician"}
                </small>
              </div>
            </div>
            <div className="attribution-meta">
              <span>▣ {formatDate(post.published_at)}</span>
              <span>•</span>
              <span>◷ {post.reading_time || 5} min read</span>
              <span>•</span>
              <span>✓ Peer-Reviewed Notes</span>
            </div>
          </div>
        </header>

        {heroImage && (
          <figure className="clinical-hero page-shell">
            <div className="clinical-image-wrap">
              <img src={heroImage} alt="" />
              <span className="clinical-badge">100x Oil Immersion</span>
              <span className="specimen-badge">
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
          </figure>
        )}

        <section className="article-body-layout page-shell">
          <div className="article-main">
            <BlockContent content={post.content} />
            {!post.content && (
              <div className="article-prose">
                <p>{post.excerpt}</p>
                <h2>Observation before conclusion</h2>
                <p>
                  Every diagnostic story begins with attention: to the patient,
                  to the sample, and to the context around both.
                </p>
              </div>
            )}
          </div>
          <aside className="article-rail">
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
              {post.tags?.map((t) => (
                <Link key={t.id} href={`/journal?tag=${t.slug}`}>
                  #{t.name}
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="article-author page-shell">
          <img src={authorImage} alt="" />
          <div>
            <span>About the author</span>
            <h3>{profile.full_name || "drh. Tiara"}</h3>
            <p>{profile.short_bio || "Veterinary clinician and writer."}</p>
            <Link href="/about">View professional profile ↗</Link>
          </div>
        </section>
      </article>

      {res.related?.length > 0 && (
        <section className="page-shell article-related">
          <div className="section-headline-row">
            <div>
              <span className="section-eyebrow">Continue Reading</span>
              <h2>Companion Case Monographs</h2>
            </div>
          </div>
          <div className="home-recent-grid">
            {res.related.slice(0, 2).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
