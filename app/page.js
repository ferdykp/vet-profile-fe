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
    [
      "✧",
      "Education",
      p.educations?.[0]?.degree || "Doctor of Veterinary Medicine (DVM)",
      "Clinical education grounded in evidence-led medicine.",
    ],
    [
      "⌁",
      "Experience",
      p.experiences?.[0]?.position || "Veterinary Clinician",
      "Years of clinical observation, diagnostics & communication.",
    ],
    [
      "⌬",
      "Clinical Focus",
      (p.clinical_interests || []).slice(0, 2).join(" · ") ||
        "Internal Medicine · Cytology",
      "Pattern recognition, pathology, microscopy & bedside decisions.",
    ],
    [
      "✎",
      "Selected Speaking",
      p.speaking_events?.[0]?.topic || "Veterinary Education",
      "Lectures and essays bridging clinical reasoning and narrative.",
    ],
  ];

  return (
    <>
      <section className="home-hero page-shell">
        <div className="hero-topline">
          <span>✦ Clinical Notes · Essays · Field Observations</span>
          <span>Issue No. 24 · Autumn Monograph</span>
        </div>
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <span className="taxonomy-chip">
              Veterinarian · Writer · Lifelong Learner
            </span>
            <h1>Medicine, stories, and everything I learn along the way.</h1>
            <p>
              A personal space for sharing veterinary knowledge, clinical
              experiences, diagnostic observations, natural history, and
              contemplative reflections formed at the margins of patient care.
            </p>
            <div className="hero-signature-strip">
              <strong>{p.full_name || "drh. Tiara"}</strong>
              <span>DVM</span>
              <span>
                {p.professional_title ||
                  "Veterinary Medicine & Clinical Pathology"}
              </span>
            </div>
            <div className="hero-actions">
              <Link href="/journal" className="button primary">
                Explore the Journal <span>↗</span>
              </Link>
              <Link href="/about" className="button subtle">
                About Tiara <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="editorial-portrait">
            <div className="portrait-frame">
              <img src={heroImage} alt={p.full_name || "drh. Tiara"} />
              <div className="portrait-caption">
                <div>
                  <span className="live-dot"></span>
                  <strong>Practicing Clinician</strong>
                </div>
                <small>
                  Writing between appointments &amp; microscope sessions
                </small>
                <span>↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-band">
        <div className="page-shell manifesto-grid">
          <div className="manifesto-title">
            <span className="section-eyebrow">Perspective</span>
            <h2>Behind the Stethoscope &amp; the Notebook</h2>
            <div className="terracotta-rule"></div>
            <p>
              Reflections from veterinary internal medicine, case work, cellular
              cytology, oncologic cases &amp; writing itself.
            </p>
          </div>
          <div className="manifesto-copy">
            <blockquote>
              “To veterinary medicine, diagnostic rigor is not simply an
              academic virtue — it is our primary ethical language for beings
              who cannot tell us where it hurts.”
            </blockquote>
            <div className="manifesto-columns">
              <div>
                <b>◉ Microscopic Attention</b>
                <p>
                  Whether examining an aspirate at reactive lymphadenopathy or
                  observing early septic shift in a feline patient, clinical
                  evidence starts with patient stillness.
                </p>
                <Link href="/journal">Read field pathology ↗</Link>
              </div>
              <div>
                <b>⌁ The Narrative Cure</b>
                <p>
                  Medicine without narrative becomes clinical fatigue. Through
                  essays and micro-observations, I chronicle the emotional
                  complexities of animal stewardship.
                </p>
                <Link href="/journal">Human case-context reflections ↗</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="page-shell home-section">
          <div className="section-headline-row">
            <div>
              <span className="section-eyebrow">Monograph of the Month</span>
              <h2>Featured Dispatch</h2>
            </div>
            <Link href="/journal">Browse entire archive ↗</Link>
          </div>
          <article className="featured-dispatch">
            <Link
              href={`/journal/${featured.slug}`}
              className="featured-dispatch-image"
            >
              {mediaUrl(featured.featured_media) && (
                <img src={mediaUrl(featured.featured_media)} alt="" />
              )}
              <span>✦ Editor’s Selection</span>
            </Link>
            <div className="featured-dispatch-copy">
              <div className="dispatch-meta">
                <span>{featured.category?.name || "Clinical Case"}</span>
                <span>•</span>
                <span>{formatDate(featured.published_at)}</span>
                <span>•</span>
                <span>{featured.reading_time || 9} min read</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="featured-author">
                <span className="author-mark">EV</span>
                <div>
                  <b>{p.full_name || "drh. Tiara"}</b>
                  <small>Practicing clinician &amp; writer</small>
                </div>
                <Link href={`/journal/${featured.slug}`}>→</Link>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="page-shell topic-ribbon">
        <div className="topic-ribbon-head">
          <span>Explore Themes &amp; Dispatches</span>
          <small>{d.categories?.length || 0} Curated Knowledge Corridors</small>
        </div>
        <div className="topic-pills">
          <Link href="/journal" className="active">
            All Dispatches <small>{d.latest_posts?.length || 0}</small>
          </Link>
          {(d.categories || []).map((c) => (
            <Link key={c.id} href={`/journal?category=${c.slug}`}>
              {c.name}
              <small>{c.posts_count || 0}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="section-headline-row">
          <div>
            <span className="section-eyebrow">The Practitioner’s Archive</span>
            <h2>Recent Journal Entries</h2>
          </div>
          <Link href="/journal">Complete clinical archive ↗</Link>
        </div>
        <div className="home-recent-grid">
          {latest.slice(0, 2).map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
        {latest[2] && (
          <div className="home-wide-card">
            <PostCard post={latest[2]} large />
          </div>
        )}
      </section>

      <section className="credentials-band">
        <div className="page-shell">
          <div className="credentials-heading">
            <div>
              <span className="section-eyebrow">Scholarly Footprint</span>
              <h2>Clinical Acumen &amp; Background</h2>
            </div>
            <p>
              Bringing bedside acumen with peer-reviewed literature and
              veterinary education.
            </p>
          </div>
          <div className="credential-cards">
            {credentialCards.map(([icon, title, value, description]) => (
              <div key={title} className="credential-card">
                <span className="credential-icon">{icon}</span>
                <h3>{title}</h3>
                <b>{value}</b>
                <p>{description}</p>
                <small>Selected professional record</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell home-section">
        <div className="section-headline-row">
          <div>
            <span className="section-eyebrow">Educator &amp; Companion</span>
            <h2>Curated Clinician Resources</h2>
          </div>
          <Link href="/resources">View all recommended guides ↗</Link>
        </div>
        <div className="home-resource-grid">
          {(d.featured_resources || []).slice(0, 3).map((r, i) => (
            <a key={r.id} href={r.url || "#"} className="home-resource-card">
              <span className={`resource-symbol resource-${i}`}>
                {i === 0 ? "▣" : i === 1 ? "♧" : "▤"}
              </span>
              <small>{String(r.type || "resource").replaceAll("_", " ")}</small>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <b>
                {i === 0
                  ? "Download for reference"
                  : i === 1
                    ? "Listen on Spotify / Apple"
                    : "Browse reading list"}{" "}
                ↗
              </b>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
