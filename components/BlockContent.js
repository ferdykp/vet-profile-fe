function stripHtml(v = "") {
  return String(v).replace(/<[^>]*>/g, "");
}
export default function BlockContent({ content }) {
  if (!content) return null;
  const blocks = Array.isArray(content) ? content : content?.blocks || content?.content || [];
  if (!Array.isArray(blocks)) return null;
  return (
    <div className="article-prose">
      {blocks.map((b, i) => {
        const d = b.data || b.attrs || {};
        const text = d.text || b.text || "";
        if (b.type === "heading" || b.type === "header") {
          const L = Number(d.level || 2);
          return L === 3 ? <h3 key={i}>{stripHtml(text)}</h3> : <h2 key={i}>{stripHtml(text)}</h2>;
        }
        if (b.type === "quote" || b.type === "blockquote") return <blockquote key={i}>{stripHtml(text || d.caption)}</blockquote>;
        if (b.type === "callout") return <aside className="prose-callout" key={i}><b>{stripHtml(d.title || "Clinical Note")}</b><p>{stripHtml(text)}</p></aside>;
        if (b.type === "image") {
          const src = d.file?.url || d.url || b.url;
          return <figure key={i}>{src && <img src={src} alt={d.alt || d.caption || ""} />}{d.caption && <figcaption>{stripHtml(d.caption)}</figcaption>}</figure>;
        }
        if (b.type === "list") {
          const Tag = d.style === "ordered" ? "ol" : "ul";
          return <Tag key={i}>{(d.items || []).map((x, j) => <li key={j}>{typeof x === "string" ? stripHtml(x) : stripHtml(x.content || x.text || "")}</li>)}</Tag>;
        }
        if (b.type === "checklist") return <ul className="checklist" key={i}><li>{stripHtml(text)}</li></ul>;
        if (b.type === "paragraph") return <p key={i}>{stripHtml(text)}</p>;
        return text ? <p key={i}>{stripHtml(text)}</p> : null;
      })}
    </div>
  );
}
