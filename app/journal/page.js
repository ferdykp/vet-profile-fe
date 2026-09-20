import Pagination from "@/components/Pagination";
import Icon from "@/components/Icon";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
export const metadata = {
  title: "Journal"
};
export default async function Journal({
  searchParams
}) {
  const sp = await searchParams;
  const search = typeof sp?.search === "string" ? sp.search : "";
  const sort = sp?.sort === "readtime" ? "readtime" : "newest";
  const page = Math.max(1, parseInt(sp?.page, 10) || 1);
  const category = typeof sp?.category === "string" ? sp.category : "";
  const categoryHref = value => `/journal?${new URLSearchParams({search, sort, category: value})}`;
  const [posts, categories] = await Promise.all([getPosts({
    search,
    category,
    per_page: 12, sort, page
  }), getCategories()]);
  const list = posts.data || [];
  return <div className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-7 pb-20 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[560px]:w-[min(100%_-_24px,_1280px)]">
      <header className="pb-6.5 border-b border-b-[#d5ddd3] [&_h1]:text-[52px] [&_h1]:mt-[5px] [&_h1]:mb-1.5 [&_h1]:mx-0 max-[560px]:[&_h1]:text-[44px]">
        <div className="flex justify-between items-end gap-7.5 [&_>_div:first-child_>_p]:max-w-162.5 [&_>_div:first-child_>_p]:m-0 [&_>_div:first-child_>_p]:text-[#424844] [&_>_div:first-child_>_p]:text-[16px] [&_>_div:first-child_>_p]:leading-[1.7] max-[800px]:items-start max-[800px]:flex-col">
          <div>
            <span className="block text-[13px] font-bold tracking-[0.09em] uppercase text-[#526a5a]">Archival Vol. IV · Clinical &amp; Field Records</span>
            <h1>The Journal</h1>
            <p>Notes, clinical cases, experiences, observations, and stories collected along the way.</p>
          </div>
          <div className="text-right [&_span]:inline-block [&_span]:py-[7px] [&_span]:px-2.5 [&_span]:rounded-full [&_span]:bg-[#f0eee8] [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[0.07em] [&_span]:text-[#424844] [&_p]:font-(family-name:--font-serif) [&_p]:italic [&_p]:text-[12px] [&_p]:text-[#59625b] [&_p]:mt-[7px] [&_p]:mb-0 [&_p]:mx-0 max-[800px]:text-left">
            <span>{posts.total ?? list.length} Published Monographs &amp; Case Studies</span>
            <p>Clinical knowledge & reflective writing</p>
          </div>
        </div>

        <form className="grid grid-cols-[minmax(0,1fr)_220px_auto] gap-5 mt-7.5 [&_input]:w-full [&_input]:h-12 [&_input]:border-0 [&_input]:rounded-[10px] [&_input]:bg-[#f5f3ed] [&_input]:outline-none [&_input]:text-[#424844] [&_select]:w-full [&_select]:h-12 [&_select]:border-0 [&_select]:rounded-[10px] [&_select]:bg-[#f5f3ed] [&_select]:outline-none [&_select]:text-[#424844] [&_input]:py-0 [&_input]:pr-[15px] [&_input]:pl-[45px] [&_select]:py-0 [&_select]:px-[15px] [&_select]:text-[12px] [&_select]:uppercase [&_select]:tracking-[0.06em] max-[800px]:grid-cols-1">
          <div className="relative [&_>_span]:absolute [&_>_span]:left-[15px] [&_>_span]:top-[50%] [&_>_span]:-translate-y-1/2 [&_>_span]:text-[18px] [&_>_span]:text-[#59625b]"><span><Icon name="search" /></span><input aria-label="Search journal" name="search" defaultValue={search} placeholder="Search by pathology, species, drug protocol, or essay theme..." /></div>
          <input type="hidden" name="category" value={category} />
          <select aria-label="Sort articles" name="sort" defaultValue={sort}>
            <option value="newest">Chronological (Recent)</option>
            <option value="readtime">Read Time (Longest)</option>
          </select><button className="min-h-12 rounded-lg bg-[#293c32] px-5 text-sm font-semibold text-white hover:bg-[#14261d]">Apply</button>
        </form>

        <div className="flex gap-2 overflow-x-auto pt-4.5 [&_a]:whitespace-nowrap [&_a]:py-2 [&_a]:px-3 [&_a]:rounded-full [&_a]:bg-[#f0eee8] [&_a]:text-[12px] [&_a]:uppercase [&_a]:tracking-[0.06em] [&_a]:text-[#424844] [&_a[data-ui~=active]]:bg-[#293c32] [&_a[data-ui~=active]]:text-[#fff] [&_small]:opacity-[0.65]">
          <Link href={categoryHref("")} data-ui={!category ? "active" : ""}>All Writings <small>({posts.total ?? list.length})</small></Link>
          {categories.map(c => <Link key={c.id} href={categoryHref(c.slug)} data-ui={category === c.slug ? "active" : ""}>{c.name} <small>({c.posts_count || 0})</small></Link>)}
        </div>
      </header>

      <section className="grid grid-cols-12 gap-5 pt-8 [&_>_[data-ui~=journal-card]:not(:where([data-ui~=journal-card-lead]))]:col-span-6 [&_>_[data-ui~=journal-card-lead]]:col-span-12 [&_>_[data-ui~=journal-card-lead]]:grid [&_>_[data-ui~=journal-card-lead]]:grid-cols-2 [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-image]]:h-full [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-image]]:min-h-97.5 [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-copy]]:p-9 [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-copy]]:flex [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-copy]]:flex-col [&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-copy]]:justify-center [&_>_[data-ui~=journal-card-lead]_h3]:text-[36px] max-[800px]:[&_>_[data-ui~=journal-card]]:col-span-12 max-[800px]:[&_>_[data-ui~=journal-card-lead]]:block max-[800px]:[&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-image]]:min-h-70 max-[800px]:[&_>_[data-ui~=journal-card-lead]_[data-ui~=journal-card-image]]:h-70 max-[560px]:[&_>_[data-ui~=journal-card-lead]_h3]:text-[29px]">
        {list.map((p, i) => <PostCard key={p.id} post={p} large={i === 0} index={i} />)}
      </section>

      <Pagination data={posts} pathname="/journal" params={{ search, category, sort }} />
      {!list.length && <div className="py-20 px-5 text-center [&_h3]:text-[30px] [&_p]:text-[#59625b]"><h3>No monographs found.</h3><p>Try another search phrase or archival category.</p></div>}
    </div>;
}
