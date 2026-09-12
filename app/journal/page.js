import Link from "next/link";
import { getCategories, getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export const metadata = { title: "Journal" };

export default async function Journal({ searchParams }) {
  const sp = await searchParams;
  const search = sp?.search || "";
  const category = sp?.category || "";
  const [posts, categories] = await Promise.all([
    getPosts({ search, category, per_page: 12 }),
    getCategories(),
  ]);
  const list = posts.data || [];

  return (
    <div className="journal-page page-shell">
      <header className="journal-hero">
        <div className="journal-hero-row">
          <div>
            <span className="archive-label">Archival Vol. IV · Clinical &amp; Field Records</span>
            <h1>The Journal</h1>
            <p>Notes, clinical cases, experiences, observations, and stories collected along the way.</p>
          </div>
          <div className="journal-count">
            <span>{posts.total ?? list.length} Published Monographs &amp; Case Studies</span>
            <p>Updated bi-weekly · Gloucestershire, UK</p>
          </div>
        </div>

        <form className="journal-search">
          <div className="journal-search-box"><span>⌕</span><input name="search" defaultValue={search} placeholder="Search by pathology, species, drug protocol, or essay theme..." /></div>
          <input type="hidden" name="category" value={category} />
          <select name="sort" defaultValue="newest">
            <option value="newest">Chronological (Recent)</option>
            <option value="readtime">Read Time (Longest)</option>
          </select>
        </form>

        <div className="journal-filters">
          <Link className={!category ? "active" : ""} href="/journal">All Writings <small>({posts.total ?? list.length})</small></Link>
          {categories.map((c) => <Link key={c.id} className={category === c.slug ? "active" : ""} href={`/journal?category=${c.slug}`}>{c.name} <small>({c.posts_count || 0})</small></Link>)}
        </div>
      </header>

      <section className="journal-archive-grid">
        {list.map((p,i)=><PostCard key={p.id} post={p} large={i===0} index={i}/>)}
      </section>

      {!list.length && <div className="editorial-empty"><h3>No monographs found.</h3><p>Try another search phrase or archival category.</p></div>}
    </div>
  );
}
