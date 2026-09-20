import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10 border-b border-[#526a5a]/10">
          <div className="max-w-3xl space-y-3">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              Correspondence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#14261d] tracking-tight">
              Contact
            </h1>
            <p className="text-base sm:text-lg text-[#424844] leading-relaxed pt-1">
              For professional conversation, speaking engagements, educational
              collaboration, or thoughtful correspondence.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-semibold text-[#14261d]">
                  Send a note.
                </h2>
                <p className="text-sm text-[#424844] leading-relaxed">
                  Messages are delivered directly to ensure they can be reviewed
                  privately and responded to in a timely manner.
                </p>
              </div>

              {/* Clinical Notice Box */}
              <div className="p-5 bg-[#e7ece5] rounded-xl border border-[#526a5a]/10 space-y-2">
                <span className="block text-xs uppercase tracking-wider text-[#526a5a] font-bold">
                  Clinical Note
                </span>
                <p className="text-xs text-[#424844] leading-relaxed">
                  Please do not send urgent patient-specific medical requests
                  through this form. In case of a veterinary emergency, contact
                  your local emergency clinic immediately.
                </p>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7 bg-[#f5f3ed] p-6 sm:p-8 rounded-xl border border-[#526a5a]/10 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
