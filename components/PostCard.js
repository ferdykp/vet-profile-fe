import Icon from "@/components/Icon";
import Link from "next/link";
import { formatDate, mediaUrl } from "@/lib/format";
export default function PostCard({
  post,
  large = false,
  index = 0
}) {
  const image = mediaUrl(post.featured_media);
  return <article className="overflow-hidden rounded-[9px] bg-[#f0eee8] border border-[#526a5a]/9 [&:hover_[data-ui~=journal-card-image]_img]:scale-[1.025] [&_h3]:text-[23px] [&_h3]:leading-[1.08] [&_h3]:my-2 [&_h3]:mx-0 [&_p]:text-[13px] [&_p]:leading-[1.65] [&_p]:text-[#424844]" data-ui={`journal-card ${large ? "journal-card-lead" : ""}`}>
      {image && <Link href={`/journal/${post.slug}`} className="block relative h-52.5 overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:transition-all [&_img]:duration-450 [&_img]:ease-[ease]" data-ui="journal-card-image">
          <img src={image} alt="" />
          <span className="absolute left-2.5 top-2.5 py-[5px] px-[7px] rounded-full bg-[rgba(20,_38,_29,_0.88)] text-[#fff] text-[11px] uppercase tracking-[0.07em]">{post.category?.name || "Veterinary Journal"}</span>
        </Link>}
      <div className="p-4.5" data-ui="journal-card-copy">
        <div className="flex gap-[7px] text-[#59625b] text-[11px] uppercase tracking-[0.07em]">
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{post.reading_time || 5} min read</span>
        </div>
        <h3><Link href={`/journal/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="flex justify-between items-center mt-4.5 pt-[11px] border-t border-t-[#d5ddd3] text-[11px] uppercase tracking-[0.06em] text-[#59625b] [&_a]:text-[#526a5a] [&_a]:font-bold">
          <span>{post.category?.name || "Field Notes"}</span>
          <Link href={`/journal/${post.slug}`}>{large ? "Read Monograph" : "Read Case"} <b><Icon name="external" className="size-5" /></b></Link>
        </div>
      </div>
    </article>;
}
