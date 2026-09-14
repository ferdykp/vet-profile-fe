import Link from 'next/link';
import Icon from './Icon';
export default function Pagination({ data, pathname, params = {} }) {
  const current = Number(data.current_page) || 1;
  const last = Number(data.last_page) || 1;
  if (last <= 1) return null;
  const href = page => `${pathname}?${new URLSearchParams({ ...params, page: String(page) })}`;
  return <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#d5ddd3] pt-6 text-sm">
    {current > 1 ? <Link className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#a8b6ab] px-4 hover:bg-[#e7ece5]" href={href(current-1)}><Icon className="size-4 rotate-180" /> Previous</Link> : <span />}
    <span className="text-[#545f57]">Page {current} of {last}</span>
    {current < last ? <Link className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#a8b6ab] px-4 hover:bg-[#e7ece5]" href={href(current+1)}>Next <Icon className="size-4" /></Link> : <span />}
  </nav>;
}
