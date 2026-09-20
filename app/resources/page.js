import Icon from "@/components/Icon";
import { safeUrl } from "@/lib/format";
import { getResources } from "@/lib/api";

export const metadata = {
  title: "Resources",
};

export default async function Resources() {
  const r = await getResources({
    per_page: 50,
  });

  const resources = r?.data || [];

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10 border-b border-[#526a5a]/10">
          <div className="max-w-3xl space-y-3">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              The Reference Shelf
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#14261d] tracking-tight">
              Resources
            </h1>
            <p className="text-base sm:text-lg text-[#424844] leading-relaxed pt-1">
              Books, papers, tools, equipment, courses, and useful references
              that support better observation and clinical reasoning.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-12 md:py-16">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((x, i) => (
                <a
                  href={safeUrl(x.url, "/contact")}
                  key={x.id}
                  className="group grid grid-cols-[auto_1fr_auto] gap-4 p-6 rounded-xl bg-[#f5f3ed] border border-[#526a5a]/10 hover:border-[#526a5a]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Number Badge */}
                  <span className="text-sm font-serif font-bold text-[#526a5a]/60 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Main Details */}
                  <div className="space-y-2">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#526a5a]">
                      {String(x.type || "Resource").replaceAll("_", " ")}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#14261d] group-hover:text-[#526a5a] transition-colors leading-snug">
                      {x.title}
                    </h3>
                    <p className="text-sm text-[#424844] leading-relaxed">
                      {x.description}
                    </p>
                  </div>

                  {/* Icon Indicator */}
                  <div className="pt-1 text-[#526a5a] group-hover:translate-x-0.5 transition-transform">
                    <Icon name="external" className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="p-16 text-center rounded-xl bg-[#f0eee8]/60 border border-dashed border-[#526a5a]/20 space-y-4 max-w-2xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[#cee9d5] text-[#526a5a] flex items-center justify-center mx-auto">
                <Icon name="book" className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                  No Resources Available
                </h3>
                <p className="text-xs text-[#59625b] leading-relaxed">
                  There are currently no references, books, or clinical tools
                  listed in this collection. Please check back later.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
