import { demoCategories, demoPosts, demoProfile, demoResources } from "./demo-data";

const API = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
const fallbackEnabled = process.env.NEXT_PUBLIC_USE_DEMO_FALLBACK !== "false";

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(8000),
    headers: { Accept: "application/json", ...(options.headers || {}) },
    next: options.next ?? { revalidate: 60 },
  });
  if (!response.ok) { const error = new Error(`Laravel API ${response.status}: ${path}`); error.status = response.status; throw error; }
  return response.json();
}

export async function getHome() {
  try { return (await request("/home")).data; }
  catch (e) { if (!fallbackEnabled) throw e; return {profile:demoProfile,featured_post:demoPosts[0],latest_posts:demoPosts,categories:demoCategories,featured_resources:demoResources}; }
}
export async function getPosts(params = {}) {
  const qs = new URLSearchParams(Object.entries(params).filter(([,v]) => v !== undefined && v !== null && v !== "")).toString();
  try { return await request(`/posts${qs ? `?${qs}` : ""}`); }
  catch (e) { if (!fallbackEnabled) throw e; const search=(params.search||"").toLowerCase(); const category=params.category; let data=demoPosts.filter(p=>(!search||`${p.title} ${p.excerpt}`.toLowerCase().includes(search))&&(!category||p.category?.slug===category)); if (params.sort === "readtime") data.sort((a,b)=>(b.reading_time||0)-(a.reading_time||0)); else data.sort((a,b)=>new Date(b.published_at)-new Date(a.published_at)); const total=data.length; const perPage=Math.max(1,Math.min(Number(params.per_page)||12,50)); const page=Math.max(1,Number(params.page)||1); return {data:data.slice((page-1)*perPage,page*perPage),current_page:page,last_page:Math.max(1,Math.ceil(total/perPage)),total}; }
}
export async function getPost(slug) {
  try { return await request(`/posts/${encodeURIComponent(slug)}`); }
  catch (e) { if (e.status === 404) return null; if (!fallbackEnabled) throw e; const post=demoPosts.find(p=>p.slug===slug); if(!post) return null; return {data:post,related:demoPosts.filter(p=>p.id!==post.id).slice(0,3)}; }
}
export async function getProfile() {
  try { return (await request("/profile")).data; }
  catch (e) { if (!fallbackEnabled) throw e; return demoProfile; }
}
export async function getCategories() {
  try { return (await request("/categories")).data; }
  catch (e) { if (!fallbackEnabled) throw e; return demoCategories; }
}
export async function getResources(params={}) {
  const qs=new URLSearchParams(Object.entries(params).filter(([,v])=>v)).toString();
  try { return await request(`/resources${qs?`?${qs}`:""}`); }
  catch(e){ if(!fallbackEnabled) throw e; return {data:demoResources,current_page:1,last_page:1,total:demoResources.length}; }
}
