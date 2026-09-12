import { getProfile } from "@/lib/api";
import { mediaUrl } from "@/lib/format";
import { portrait } from "@/lib/demo-data";

export const metadata = { title: "About" };

export default async function About() {
  const p = await getProfile();
  const profileImage = mediaUrl(p.profile_photo, portrait);
  const story =
    p.biography ||
    "My work lives at the intersection of diagnostic precision and humane communication. I write to make complex veterinary medicine clearer, more memorable, and more useful at the bedside.";
  return (
    <>
      <section className="about-spread page-shell">
        <div className="about-portrait-wrap">
          <div className="portrait-offset"></div>
          <div className="about-portrait-card">
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
        <div className="about-intro">
          <div className="about-badges">
            <span>Curriculum Vitae &amp; Ethos</span>
            <b>•</b>
            <span>Est. 2011</span>
          </div>
          <small>{p.full_name || "drh. Tiara"}, DVM</small>
          <h1>
            {p.headline ||
              "Bridging the science of veterinary diagnostics with the human stories behind every patient."}
          </h1>
          <p>{p.short_bio}</p>
          <div className="quick-credentials">
            <span>
              ✓ {p.educations?.[0]?.degree || "Doctor of Veterinary Medicine"}
            </span>
            <span>
              ✚{" "}
              {p.memberships?.[0]?.organization ||
                "Professional Veterinary Membership"}
            </span>
            <span>✎ Contributing Essayist &amp; Speaker</span>
          </div>
        </div>
      </section>

      <section className="about-story-band">
        <div className="page-shell">
          <div className="about-section-title">
            <span>Narrative</span>
            <h2>The Thread Between the Microscope &amp; the Page</h2>
          </div>
          <div className="story-cards">
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
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{c}</p>
                <small>{f}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell professional-section">
        <div className="about-section-title">
          <span>Professional Record</span>
          <h2>Appointments, study &amp; clinical milestones</h2>
        </div>
        <div className="cv-grid">
          <div className="cv-list">
            {(p.experiences || []).map((x, i) => (
              <div key={x.id || i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <section>
                  <small>{x.organization}</small>
                  <h3>{x.position}</h3>
                  <p>{x.description}</p>
                </section>
              </div>
            ))}
            {(p.educations || []).map((x, i) => (
              <div key={`e${x.id || i}`}>
                <span>ED</span>
                <section>
                  <small>{x.institution}</small>
                  <h3>{x.degree}</h3>
                  <p>{x.description}</p>
                </section>
              </div>
            ))}
          </div>
          <aside className="about-rail">
            <span>Clinical Inquiries</span>
            {(p.clinical_interests || []).map((x, i) => (
              <div key={x}>
                <small>0{i + 1}</small>
                <b>{x}</b>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="about-publications-band">
        <div className="page-shell">
          <div className="about-section-title">
            <span>Selected Work</span>
            <h2>Publications &amp; lectures</h2>
          </div>
          <div className="publication-list">
            {(p.publications || []).map((x) => (
              <a href={x.url || "#"} key={x.id}>
                <span>{x.year}</span>
                <b>{x.title}</b>
                <small>{x.publisher}</small>
                <i>↗</i>
              </a>
            ))}
            {(p.speaking_events || []).map((x) => (
              <div key={x.id}>
                <span>{x.event_date?.slice(0, 4)}</span>
                <b>{x.topic || x.event_name}</b>
                <small>{x.event_name}</small>
                <i>◌</i>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
