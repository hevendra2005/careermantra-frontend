'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import FilterSelect from '@/components/FilterSelect';
import { submitLead } from '@/lib/api';
import data from '@/data/onlineCourses.json';

const { providers, programs, tiles } = data;
const PAGE = 9;
const LEVELS = ['All', 'UG', 'PG'];

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

function Enquiry({ ctx, onClose }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', agree: false });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverErr, setServerErr] = useState('');
  const first = useRef(null);
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    first.current?.focus();
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [onClose]);

  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined })); setServerErr(''); };
  const submit = async ev => {
    ev.preventDefault();
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (!f.agree) e.agree = 'Please allow us to contact you.';
    setErr(e);
    const k = Object.keys(e)[0];
    if (k) { document.getElementById(`oc-${k}`)?.focus(); return; }
    setStatus('sending');
    try {
      // TODO (backend): goes to your API through lib/api.js -> submitLead
      await submitLead({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), course: ctx.program, university: ctx.university, request: ctx.kind, source: 'online-courses' });
      setStatus('done');
    } catch (x) { setServerErr(x.message || 'Something went wrong. Please try again.'); setStatus('idle'); }
  };

  const text = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`oc-${k}`}>{label}</label>
      <input id={`oc-${k}`} ref={k === 'name' ? first : undefined} value={f[k]} onChange={ev => set(k, props.digits ? cleanPhone(ev.target.value) : ev.target.value)}
        type={props.type || 'text'} inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? `oc-${k}-e` : undefined} />
      {err[k] && <small id={`oc-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <div className="oc-modal" role="dialog" aria-modal="true" aria-labelledby="oc-mt" onClick={onClose}>
      <div className="oc-sheet" onClick={e => e.stopPropagation()}>
        <button className="oc-x" type="button" onClick={onClose} aria-label="Close">✕</button>
        {status === 'done' ? (
          <div className="sc-done" role="status">
            <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
            <h3 id="oc-mt">Request received, {f.name.trim().split(' ')[0]}!</h3>
            <p>A Career Mantra counsellor will contact you on <b>+91 {f.phone}</b> about <b>{ctx.program}</b>.</p>
            <button className="btn" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="sc-form" onSubmit={submit} noValidate>
            <h3 id="oc-mt">{ctx.kind === 'syllabus' ? 'Get the syllabus' : ctx.kind === 'program' ? 'Know more about this program' : 'Talk to a counsellor'}</h3>
            <div className="oc-ctx"><b>{ctx.program}</b>{ctx.university && <span>{ctx.university}</span>}</div>
            {text('name', 'Full name', { placeholder: 'e.g. Aarav Sharma', autoComplete: 'name' })}
            {text('phone', 'Mobile number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
            {text('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
            <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
              <label className="sc-check">
                <input id="oc-agree" type="checkbox" checked={f.agree} onChange={ev => set('agree', ev.target.checked)} aria-invalid={!!err.agree} />
                <span>I agree to be contacted by Career Mantra counsellors about this program.</span>
              </label>
              {err.agree && <small role="alert">{err.agree}</small>}
            </div>
            {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
            <button className="btn sc-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request a call back'}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function OnlineCourseExplorer() {
  const [level, setLevel] = useState('All');
  const [degree, setDegree] = useState('');
  const [uni, setUni] = useState('');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  const [ctx, setCtx] = useState(null);

  const degrees = useMemo(() => [...new Set(programs.map(p => p.degree))], []);
  const base = programs.filter(p => (level === 'All' || p.level === level));
  const filtered = base.filter(p =>
    (!degree || p.degree === degree) &&
    (!uni || providers[p.provider].name === uni) &&
    (!q || `${p.title} ${providers[p.provider].name} ${p.degree}`.toLowerCase().includes(q.toLowerCase())));
  const uniOpts = Object.values(providers).map(v => ({ value: v.name, label: v.name, count: base.filter(p => providers[p.provider].name === v.name && (!degree || p.degree === degree)).length }));
  const reset = () => { setLevel('All'); setDegree(''); setUni(''); setQ(''); setShown(PAGE); };
  const pickTile = d => {
    setDegree(d); setLevel('All'); setUni(''); setQ(''); setShown(PAGE);
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const onTile = e => pickTile(e.detail);
    const onSearch = e => { setQ(e.detail); setDegree(''); setLevel('All'); setUni(''); setShown(PAGE); };
    window.addEventListener('oc-tile', onTile);
    window.addEventListener('oc-search', onSearch);
    return () => { window.removeEventListener('oc-tile', onTile); window.removeEventListener('oc-search', onSearch); };
  }, []);

  return (
    <>
      <div className="oc-bar" id="programs">
        <div className="oc-lv" role="tablist" aria-label="Level">
          {LEVELS.map(l => (
            <button key={l} role="tab" aria-selected={level === l} className={level === l ? 'on' : ''} onClick={() => { setLevel(l); setShown(PAGE); }}>
              {l === 'All' ? 'All programs' : l === 'UG' ? 'Undergraduate' : 'Postgraduate'}
            </button>
          ))}
        </div>
        <label className="oc-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search by program or university" aria-label="Search programs" />
        </label>
        <div className="oc-fs"><FilterSelect label="University" value={uni} onChange={v => { setUni(v); setShown(PAGE); }} options={uniOpts} placeholder="All universities" allLabel="All universities" /></div>
      </div>
      <div className="oc-chips" role="group" aria-label="Degree">
        <button type="button" className={!degree ? 'on' : ''} onClick={() => { setDegree(''); setShown(PAGE); }}>All degrees</button>
        {degrees.map(d => <button type="button" key={d} className={degree === d ? 'on' : ''} onClick={() => { setDegree(degree === d ? '' : d); setShown(PAGE); }}>{d}</button>)}
      </div>
      <p className="oc-count" aria-live="polite">{filtered.length} program{filtered.length === 1 ? '' : 's'}{degree ? ` in ${degree}` : ''}</p>

      {filtered.length === 0 ? (
        <div className="oc-none">
          <h3>No {degree || 'matching'} programs listed here yet</h3>
          <p>Our counsellors can still help you find an online or distance {degree || ''} program.</p>
          <div>
            <button className="btn" type="button" onClick={() => setCtx({ kind: 'counsellor', program: degree ? `Online ${degree}` : 'Online courses' })}>Talk to a counsellor</button>
            <button className="btn ghost-dark" type="button" onClick={reset}>Clear filters</button>
          </div>
        </div>
      ) : (
        <div className="oc-grid">
          {filtered.slice(0, shown).map(p => {
            const v = providers[p.provider];
            return (
              <article className="oc-card" key={p.id}>
                <div className="oc-top">
                  <span className="oc-mono" style={{ background: `linear-gradient(135deg,${v.c[0]},${v.c[1]})` }}>{v.short}</span>
                  <span className="oc-lvl">{p.level === 'UG' ? 'Undergraduate' : 'Postgraduate'}</span>
                </div>
                <p className="oc-uni">{v.name}</p>
                <h3>{p.title}</h3>
                <div className="oc-tags"><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{p.duration}</span><span>{p.degree}</span></div>
                <div className="oc-act">
                  <button className="btn" type="button" onClick={() => setCtx({ kind: 'program', program: p.title, university: v.name })}>View program</button>
                  <button className="oc-syl" type="button" onClick={() => setCtx({ kind: 'syllabus', program: p.title, university: v.name })}>Syllabus</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {filtered.length > shown && <div className="oc-more"><button className="btn ghost-dark" type="button" onClick={() => setShown(s => s + PAGE)}>Show more programs</button></div>}
      {ctx && <Enquiry ctx={ctx} onClose={() => setCtx(null)} />}
    </>
  );
}