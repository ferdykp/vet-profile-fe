import Link from 'next/link';
import Icon from './Icon';
export default function Footer({ profile }) {
  const name = profile?.full_name || 'drh. Tiara';
  return <>
    <section className="mt-16 bg-[#293c32] px-5 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Icon name="leaf" className="mb-5 size-8 text-[#cee9d5]" />
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(28px,3vw,40px)] leading-tight text-white!">“Curiosity doesn’t stop when the clinic closes.”</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#e1eae3]">Exploring animal biology, clinical practice, and the living world—one thoughtful observation at a time.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/journal" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#fbf9f3] px-5 py-3 text-sm font-semibold text-[#14261d]">Explore the journal <Icon name="arrow" /></Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#b6ccbe]/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Speaking & inquiries <Icon name="external" /></Link>
        </div>
      </div>
    </section>
    <footer className="mx-auto w-full max-w-[1376px] px-5 pb-8 pt-12 sm:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div><Link href="/about" className="font-[family-name:var(--font-serif)] text-2xl font-medium text-[#14261d]">{name}</Link><p className="mt-3 max-w-sm text-sm leading-6 text-[#545f57]">{profile?.professional_title || 'Veterinarian. Writer. Lifelong learner.'} Sharing clinical knowledge and thoughtful observations from veterinary practice.</p></div>
        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-1 text-sm"><h3 className="mb-3 font-sans! text-sm! font-semibold! uppercase tracking-wider">Explore</h3>{[['/journal','Journal archive'],['/resources','Curated resources'],['/about','About the author'],['/contact','Contact & collaboration']].map(([href,label]) => <Link key={href} href={href} className="inline-flex min-h-10 items-center text-[#424844] hover:text-[#14261d] hover:underline">{label}</Link>)}</nav>
        <div><h3 className="font-[family-name:var(--font-serif)] text-2xl">Stay in conversation</h3><p className="mt-3 text-sm leading-6 text-[#545f57]">For educational collaboration, speaking engagements, or a thoughtful question about the journal.</p><Link href="/contact" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#293c32] hover:underline"><Icon name="mail" /> Send a note</Link></div>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#d5ddd3] pt-6 text-xs leading-5 text-[#545f57]"><span>© {new Date().getFullYear()} {name}. All rights reserved.</span><span>Veterinary knowledge, shared with care.</span></div>
    </footer>
  </>;
}
