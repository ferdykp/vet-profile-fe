import Link from "next/link";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Search",
};

export default async function Search({ searchParams }) {
  const params = await searchParams;
  const q = typeof params?.q === "string" ? params.q.trim() : "";
  const page = Math.max(1, parseInt(params?.page, 10) || 1);
  const posts = q
    ? await getPosts({ search: q, page, per_page: 12 })
    : { data: [] };

  const list = posts.data || [];

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* HEADER SECTION */}
        <section className="pb-8 border-b border-[#526a5a]/10 space-y-4">
          <div className="space-y-1">
            <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
              Archive Search
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#14261d] tracking-tight">
              Search the Journal
            </h1>
            <p className="text-base sm:text-lg text-[#424844] leading-relaxed">
              Find specific clinical cases, diagnostic procedures, pathology
              notes, or essay topics.
            </p>
          </div>

          {/* SEARCH FORM */}
          <form className="flex flex-col sm:flex-row gap-3 pt-2 max-w-2xl">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59625b]">
                <Icon name="search" className="w-5 h-5" />
              </span>
              <input
                id="archive-search"
                name="q"
                defaultValue={q}
                placeholder="Cytology, clinical cases, drug protocol, mentorship..."
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-[#f5f3ed] border border-[#526a5a]/10 text-sm text-[#424844] placeholder-[#59625b]/60 focus:outline-none focus:ring-1 focus:ring-[#526a5a]"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-lg bg-[#293c32] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#14261d] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </section>

        {/* RESULTS SECTION */}
        {q ? (
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#526a5a]/10 pb-4">
              <h2 className="text-xl font-serif font-semibold text-[#14261d]">
                Results for <span className="italic text-[#526a5a]">“{q}”</span>
              </h2>
              <span className="text-xs text-[#59625b] uppercase tracking-wider font-semibold">
                {posts.total ?? list.length}{" "}
                {list.length === 1 ? "Result" : "Results"} Found
              </span>
            </div>

            {list.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                <div className="pt-6">
                  <Pagination data={posts} pathname="/search" params={{ q }} />
                </div>
              </>
            ) : (
              /* EMPTY STATE */
              <div className="p-16 text-center rounded-xl bg-[#f0eee8]/50 border border-dashed border-[#526a5a]/20 space-y-4 max-w-2xl mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-[#cee9d5] text-[#526a5a] flex items-center justify-center mx-auto">
                  <Icon name="search" className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                    No Matching Articles Found
                  </h3>
                  <p className="text-xs text-[#59625b] leading-relaxed">
                    We couldn't find any articles matching “{q}”. Try using
                    different keywords or broader search terms.
                  </p>
                </div>
                <Link
                  href="/journal"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase bg-[#293c32] text-white hover:bg-[#14261d] transition-colors"
                >
                  Browse Full Archive
                </Link>
              </div>
            )}
          </section>
        ) : (
          /* INITIAL STATE WHEN SEARCH IS EMPTY */
          <div className="p-12 text-center rounded-xl bg-[#f5f3ed] border border-[#526a5a]/10 space-y-3">
            <p className="text-sm text-[#59625b]">
              Enter a search term above to explore clinical notes, pathology
              guides, and essays.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
