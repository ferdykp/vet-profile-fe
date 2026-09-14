import { mediaUrl } from '@/lib/format';
import Icon from './Icon';
const plain = (value = '') => String(value ?? '').replace(/<[^>]*>/g, '');
export default function BlockContent({ content }) {
  const blocks = Array.isArray(content) ? content : content?.blocks || content?.content || [];
  if (!Array.isArray(blocks)) return null;
  return <div className="max-w-[70ch] text-[17px] leading-[1.85] text-[#252a27] sm:text-lg [&_p]:mb-6 [&_p]:whitespace-pre-line [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:leading-tight [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#b56f51] [&_blockquote]:pl-5 [&_blockquote]:font-[family-name:var(--font-serif)] [&_blockquote]:text-2xl [&_blockquote]:italic [&_figure]:my-8 [&_figure_img]:max-h-[720px] [&_figure_img]:w-full [&_figure_img]:rounded-xl [&_figure_img]:object-contain [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:leading-6 [&_figcaption]:text-[#545f57] [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2">
    {blocks.map((block, index) => {
      if (!block || typeof block !== 'object') return null;
      const data = block.data || block.attrs || {};
      const text = plain(data.text || block.text || '');
      if (['heading','header'].includes(block.type)) return Number(data.level) === 3 ? <h3 key={index}>{text}</h3> : <h2 key={index}>{text}</h2>;
      if (['quote','blockquote'].includes(block.type)) return <blockquote key={index}>{text || plain(data.caption)}</blockquote>;
      if (block.type === 'callout') return <aside key={index} className="my-8 rounded-xl border border-[#cad7cc] bg-[#e7ece5] p-5 sm:p-6"><strong className="text-sm font-semibold text-[#293c32]">{plain(data.title || 'Clinical note')}</strong><div className="mt-3 whitespace-pre-line text-base leading-7">{text}</div></aside>;
      if (block.type === 'image') { const src = mediaUrl(data.file?.url || data.url || block.url); return src ? <figure key={index}><img src={src} loading="lazy" alt={plain(data.alt || data.caption || '')} />{data.caption && <figcaption>{plain(data.caption)}</figcaption>}</figure> : null; }
      if (block.type === 'list') { const Tag = data.style === 'ordered' ? 'ol' : 'ul'; const items = Array.isArray(data.items) ? data.items : text.split('\n').filter(Boolean); return <Tag key={index}>{items.map((item,i) => <li key={i}>{plain(typeof item === 'object' ? item?.content || item?.text : item)}</li>)}</Tag>; }
      if (block.type === 'checklist') { const items = Array.isArray(data.items) ? data.items : text.split('\n').filter(Boolean); return <div key={index} role="list" className="my-6 space-y-3">{items.map((item,i) => <div role="listitem" key={i} className="flex items-start gap-3"><Icon name="check" className="mt-1 size-5 text-[#526a5a]" /><span>{plain(typeof item === 'object' ? item?.text || item?.content : item)}</span></div>)}</div>; }
      return text ? <p key={index}>{text}</p> : null;
    })}
  </div>;
}
