"use client";

export default function Error({
  reset
}) {
  return <section className="w-[min(1280px,_calc(100%_-_96px))] my-0 mx-auto pt-[45px] pb-7 px-0 [&_h1]:text-[52px] [&_h1]:mt-[5px] [&_h1]:mb-2 [&_h1]:mx-0 [&_[data-ui~=lead]]:max-w-175 [&_[data-ui~=lead]]:text-[16px] [&_[data-ui~=lead]]:leading-[1.7] [&_[data-ui~=lead]]:text-[#424844] max-[1020px]:w-[min(100%_-_48px,_1280px)] max-[800px]:w-[min(100%_-_32px,_1280px)] max-[800px]:py-11 max-[800px]:px-0 max-[560px]:w-[min(100%_-_24px,_1280px)]"><p className="text-[12px] uppercase tracking-[0.09em] text-[#526a5a] font-bold">Connection interrupted</p><h1>We couldn’t load this page.</h1><p data-ui="lead">Check the Laravel API connection and try again.</p><button onClick={reset} className="inline-flex items-center justify-center gap-3 min-h-11 py-0 px-4 rounded-[7px] [border:1px_solid_transparent] text-[14px] font-bold tracking-[0.04em] uppercase [transition:0.2s] bg-[#293c32] text-[#fff] hover:[transform:translateY(-1px)] hover:bg-[#14261d]" data-ui="button primary">Try again</button></section>;
}
