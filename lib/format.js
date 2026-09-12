export function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}
export function initials(name = "") { return name.split(/\s+/).filter(Boolean).slice(0,2).map(v=>v[0]).join("").toUpperCase() || "DR"; }
export function mediaUrl(media, fallback = "") { return media?.url || media?.path || fallback; }
