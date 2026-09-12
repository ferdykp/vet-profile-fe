import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="closing-banner">
        <div className="closing-inner">
          <span className="closing-emblem">✣</span>
          <h2>“Curiosity doesn’t stop when the clinic closes.”</h2>
          <p>
            A quiet inquiry into animal biology, cellular wonder, and the living
            world. Think you’re wondering along.
          </p>
          <div className="closing-actions">
            <Link href="/journal" className="button ivory">
              Browse All Monographs
            </Link>
            <Link href="/about" className="button ghost-light">
              About This Practice
            </Link>
            <Link href="/contact" className="button ghost-light">
              Speaking &amp; Inquiries
            </Link>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-signature">
            <p className="quote-mini">
              “Curiosity doesn’t stop when the clinic closes.”
            </p>
            <strong>drh. Tiara, DVM</strong>
            <p>
              Clinician. Writer. Veterinary Educator. Exploring comparative
              pathology, field observation, and compassionate medicine through
              evidence-led long-form work.
            </p>
          </div>
          <div className="footer-index">
            <span className="footer-label">Dispatch Index</span>
            <Link href="/journal">— Journal Archive</Link>
            <Link href="/resources">— Curated Library &amp; Resources</Link>
            <Link href="/about">— About Elena</Link>
            <Link href="/contact">— Clinical Insights</Link>
            <Link href="/contact">— Contact &amp; Speaking Inquiries</Link>
          </div>
          <div className="footer-monograph">
            <strong>The Veterinary Monograph</strong>
            <p>
              Monthly clinical dispatches, diagnostic reviews, and natural
              medical history essays delivered to your inbox.
            </p>
            <div className="mini-subscribe">
              <input aria-label="Email" placeholder="Your inquiry or email" />
              <button type="button">Subscribe to Dispatches</button>
            </div>
          </div>
        </div>
        <div className="footer-rule">
          <div>
            © {new Date().getFullYear()} drh. Tiara. DVM. All writing, visual
            research &amp; rights reserved.
          </div>
          <div>Printed and dispatched from Gloucestershire &amp; Oxford.</div>
        </div>
      </footer>
    </>
  );
}
