import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Journal",
};

export default async function Journal({ searchParams }) {
  const sp = await searchParams;
  const search = typeof sp?.search === "string" ? sp.search : "";
  const sort = sp?.sort === "readtime" ? "readtime" : "newest";
  const page = Math.max(1, parseInt(sp?.page, 10) || 1);
  const category = typeof sp?.category === "string" ? sp.category : "";
  const categoryHref = (value) =>
    `/journal?${new URLSearchParams({ search, sort, category: value })}`;

  const [posts, categories] = await Promise.all([
    getPosts({
      search,
      category,
      per_page: 12,
      sort,
      page,
    }),
    getCategories(),
  ]);

  const list = posts.data || [];

  return (
    <main className="w-full bg-[#fbf9f3] text-[#14261d] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* HEADER SECTION */}
        <header className="pb-8 border-b border-[#526a5a]/10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="block text-xs font-bold tracking-widest uppercase text-[#526a5a]">
                Archival Vol. IV · Clinical & Field Records
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#14261d] tracking-tight">
                The Journal
              </h1>
              <p className="text-base sm:text-lg text-[#424844] leading-relaxed">
                Notes, clinical cases, experiences, observations, and stories
                collected along the way.
              </p>
            </div>

            <div className="text-left md:text-right space-y-1">
              <span className="inline-block py-1.5 px-3 rounded-full bg-[#f0eee8] text-xs font-bold uppercase tracking-wider text-[#424844]">
                {posts.total ?? list.length} Published Monographs & Case Studies
              </span>
              <p className="font-serif italic text-xs text-[#59625b]">
                Clinical knowledge & reflective writing
              </p>
            </div>
          </div>

          {/* SEARCH & SORT FORM */}
          <form className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-7 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59625b]">
                <Icon name="search" className="w-5 h-5" />
              </span>
              <input
                aria-label="Search journal"
                name="search"
                defaultValue={search}
                placeholder="Search by pathology, species, drug protocol, or essay theme..."
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-[#f5f3ed] border border-[#526a5a]/10 text-sm text-[#424844] placeholder-[#59625b]/60 focus:outline-none focus:ring-1 focus:ring-[#526a5a]"
              />
            </div>

            <input type="hidden" name="category" value={category} />

            <div className="sm:col-span-3">
              <select
                aria-label="Sort articles"
                name="sort"
                defaultValue={sort}
                className="w-full h-12 px-4 rounded-lg bg-[#f5f3ed] border border-[#526a5a]/10 text-xs font-semibold uppercase tracking-wider text-[#424844] focus:outline-none focus:ring-1 focus:ring-[#526a5a]"
              >
                <option value="newest">Chronological (Recent)</option>
                <option value="readtime">Read Time (Longest)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#293c32] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#14261d] transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </form>

          {/* CATEGORIES BADGES */}
          <div className="flex gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            <Link
              href={categoryHref("")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                !category
                  ? "bg-[#293c32] text-white"
                  : "bg-[#f0eee8] text-[#424844] hover:bg-[#cee9d5]"
              }`}
            >
              All Writings{" "}
              <small className="opacity-70">
                ({posts.total ?? list.length})
              </small>
            </Link>
            {(categories || []).map((c) => (
              <Link
                key={c.id}
                href={categoryHref(c.slug)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  category === c.slug
                    ? "bg-[#293c32] text-white"
                    : "bg-[#f0eee8] text-[#424844] hover:bg-[#cee9d5]"
                }`}
              >
                {c.name}{" "}
                <small className="opacity-70">({c.posts_count || 0})</small>
              </Link>
            ))}
          </div>
        </header>

        {/* POSTS LISTING */}
        <section className="space-y-8">
          {list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {list.map((p, i) => (
                <PostCard key={p.id} post={p} large={i === 0} index={i} />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="p-16 text-center rounded-xl bg-[#f0eee8]/50 border border-dashed border-[#526a5a]/20 space-y-3 my-8">
              <div className="w-12 h-12 rounded-full bg-[#cee9d5] text-[#526a5a] flex items-center justify-center mx-auto">
                <Icon name="book" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#14261d]">
                No Monographs Found
              </h3>
              <p className="text-xs text-[#59625b] max-w-md mx-auto">
                No matching articles were found for your query. Try searching
                with a different keyword or selecting another category.
              </p>
            </div>
          )}
        </section>

        {/* PAGINATION */}
        {list.length > 0 && (
          <div className="pt-6">
            <Pagination
              data={posts}
              pathname="/journal"
              params={{ search, category, sort }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
