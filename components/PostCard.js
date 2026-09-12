import Link from "next/link";
import { formatDate, mediaUrl } from "@/lib/format";

export default function PostCard({ post, large = false, index = 0 }) {
  const image = mediaUrl(post.featured_media);
  return (
    <article className={`journal-card ${large ? "journal-card-lead" : ""}`}>
      {image && (
        <Link href={`/journal/${post.slug}`} className="journal-card-image">
          <img src={image} alt="" />
          <span className="image-label">{post.category?.name || "Veterinary Journal"}</span>
        </Link>
      )}
      <div className="journal-card-copy">
        <div className="journal-card-meta">
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{post.reading_time || 5} min read</span>
        </div>
        <h3><Link href={`/journal/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="journal-card-bottom">
          <span>{post.category?.name || "Field Notes"}</span>
          <Link href={`/journal/${post.slug}`}>{large ? "Read Monograph" : "Read Case"} <b>↗</b></Link>
        </div>
      </div>
    </article>
  );
}
