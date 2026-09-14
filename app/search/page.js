import Link from 'next/link';
import { getPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import Icon from '@/components/Icon';
export const metadata = { title: 'Search' };
export default async function Search({ searchParams }) {
  const params = await searchParams;
  const q = typeof params?.q === 'string' ? params.q.trim() : '';
  const page = Math.max(1, parseInt(params?.page, 10) || 1);
  const posts = q ? await getPosts({ search: q, page, per_page: 12 }) : { data: [] };
  return <div className="mx-auto max-w-[1376px] px-5 py-10 sm:px-8 lg:px-12">
    <p className="text-xs font-semibold uppercase tracking-widest text-[#526a5a]">Archive search</p>
    <h1 className="mt-3 text-[clamp(32px,4vw,48px)] leading-tight">Search the journal</h1>
    <form className="mt-6 flex max-w-2xl gap-2"><label htmlFor="archive-search" className="sr-only">Search articles</label><input id="archive-search" name="q" defaultValue={q} className="min-h-12 min-w-0 flex-1 rounded-lg border border-[#a8b6ab] bg-white px-4 text-base" placeholder="Cytology, clinical cases, mentorship…" /><button className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#293c32] px-4 text-sm font-semibold text-white"><Icon name="search" /><span className="hidden sm:inline">Search</span></button></form>
    {q && <section className="mt-12"><h2 className="mb-6 text-xl">Results for “{q}”</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.data?.map(post => <PostCard key={post.id} post={post} />)}</div>{!posts.data?.length && <div className="rounded-xl border border-[#d5ddd3] bg-[#f5f3ed] p-8"><p>No articles found. Try another topic or a shorter search.</p><Link href="/journal" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-[#293c32]">Browse the journal <Icon /></Link></div>}<Pagination data={posts} pathname="/search" params={{q}} /></section>}
  </div>;
}
