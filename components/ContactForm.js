"use client";
import { useRef, useState } from 'react';
import Icon from './Icon';
export default function ContactForm() {
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const pending = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    pending.current = true;
    setState('loading'); setMessage(''); setErrors({});
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
      const response = await fetch(`${base.replace(/\/$/, '')}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))), signal: AbortSignal.timeout(15000) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) { setErrors(payload.errors || {}); throw new Error(response.status === 429 ? 'Too many attempts. Please wait a moment before trying again.' : payload.message || 'Your message could not be sent. Please try again.'); }
      form.reset(); setState('success'); setMessage(payload.message || 'Thank you. Your message has been sent.');
    } catch (error) {
      setState('error'); setMessage(error.name === 'TimeoutError' || error instanceof TypeError ? 'Connection unavailable. Your message is still here; please try again.' : error.message);
    } finally { pending.current = false; }
  }
  const field = 'mt-2 min-h-12 w-full rounded-lg border border-[#a8b6ab] bg-[#fbf9f3] px-3.5 py-3 text-base font-normal normal-case tracking-normal text-[#252a27] focus:outline-2 focus:outline-offset-2 focus:outline-[#526a5a]';
  return <form onSubmit={submit} aria-busy={state === 'loading'} className="rounded-2xl border border-[#d5ddd3] bg-white p-5 sm:p-8">
    <fieldset disabled={state === 'loading'} className="grid gap-5 disabled:opacity-70">
      <div className="grid gap-5 sm:grid-cols-2">{[['name','Name','text',150],['email','Email','email',255]].map(([name,label,type,max]) => <label key={name} className="text-sm font-semibold" htmlFor={`contact-${name}`}>{label}<input id={`contact-${name}`} className={field} type={type} name={name} autoComplete={name} required maxLength={max} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <span id={`${name}-error`} className="mt-2 block text-sm text-[#9c3027]">{errors[name][0]}</span>}</label>)}</div>
      <label htmlFor="contact-subject" className="text-sm font-semibold">Subject <span className="font-normal text-[#545f57]">(optional)</span><input id="contact-subject" className={field} name="subject" maxLength={255} /></label>
      <label htmlFor="contact-message" className="text-sm font-semibold">Message<textarea id="contact-message" className={field} name="message" required rows={7} maxLength={5000} aria-invalid={!!errors.message} />{errors.message && <span className="mt-2 block text-sm text-[#9c3027]">{errors.message[0]}</span>}</label>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#293c32] px-5 py-3 text-sm font-semibold text-white hover:bg-[#14261d] disabled:cursor-wait"><Icon name="mail" />{state === 'loading' ? 'Sending…' : 'Send message'}</button>
    </fieldset>
    {message && <p role={state === 'error' ? 'alert' : 'status'} className={`mt-5 rounded-lg p-4 text-sm leading-6 ${state === 'error' ? 'bg-[#fff0ee] text-[#8a2f27]' : 'bg-[#e7f1e8] text-[#2e5a3b]'}`}>{message}</p>}
  </form>;
}
