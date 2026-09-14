export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
export function initials(name = '') { return String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map(v => v[0]).join('').toUpperCase() || 'DR'; }
export function safeUrl(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  const url = value.trim();
  if (!url || /[\u0000-\u0020\\]/.test(url)) return fallback;
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try { return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(url).protocol) ? url : fallback; } catch { return fallback; }
}
export function mediaUrl(media, fallback = '') {
  const value = typeof media === 'string' ? media : media?.url || media?.path;
  if (!value) return fallback;
  if (/^(https?:\/\/|\/)/i.test(value)) return safeUrl(value, fallback);
  if (/^[\w./-]+$/.test(value)) {
    const api = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
    try { return `${new URL(api).origin}/storage/${value.replace(/^storage\//, '')}`; } catch { return fallback; }
  }
  return fallback;
}
