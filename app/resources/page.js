import Icon from "@/components/Icon";
import { safeUrl } from "@/lib/format";
import { getResources } from "@/lib/api";
export const metadata = {
  title: "Resources"
};
export default async function Resources() {
  const r = await getResources({
    per_page: 50
  });
  return <><section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-[45px] pb-7 px-0 [&_h1]:text-[52px] [&_h1]:mt-[5px] [&_h1]:mb-2 [&_h1]:mx-0 [&_[data-ui~=lead]]:max-w-175 [&_[data-ui~=lead]]:text-[16px] [&_[data-ui~=lead]]:leading-[1.7] [&_[data-ui~=lead]]:text-[#424844] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:py-11 max-[800px]:px-0 max-[560px]:w-[min(100%_-_24px,_1280px)]"><p className="text-[12px] uppercase tracking-[0.09em] text-[#526a5a] font-bold">The reference shelf</p><h1>Resources</h1><p data-ui="lead">Books, papers, tools, equipment, courses, and useful references that support better observation and clinical reasoning.</p></section><section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto py-14 px-0 max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:py-11 max-[800px]:px-0 max-[560px]:w-[min(100%_-_24px,_1280px)]"><div className="grid grid-cols-[repeat(2,_1fr)] gap-4.5 max-[800px]:grid-cols-1">{r.data?.map((x, i) => <a href={safeUrl(x.url, "/contact")} key={x.id} className="grid grid-cols-[34px_1fr_20px] gap-3 min-h-55 p-5.5 rounded-[10px] bg-[#f5f3ed] border border-[#526a5a]/10 [&_h3]:text-[22px] [&_p]:text-[13px] [&_p]:leading-[1.6] [&_p]:text-[#424844]"><span>{String(i + 1).padStart(2, '0')}</span><div><p className="text-[12px] uppercase tracking-[0.09em] text-[#526a5a] font-bold">{String(x.type).replaceAll('_', ' ')}</p><h3>{x.title}</h3><p>{x.description}</p></div><b><Icon name="external" className="size-5" /></b></a>)}</div></section></>;
}
