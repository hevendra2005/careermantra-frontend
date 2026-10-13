'use client';
import { useEffect, useRef, useState } from 'react';
import { submitLead } from '@/lib/api';
import data from '@/data/jobs.json';

const { openings, departments } = data;
const MAX = 2 * 1024 * 1024;

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

function Apply({ role, onClose }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', city: '', link: '', note: '', agree: false });
  const [file, setFile] = useState(null);
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

  const pick = ev => {
    const x = ev.target.files?.[0];
    if (!x) return setFile(null);
    if (!/\.(pdf|docx?)$/i.test(x.name)) { setFile(null); return setErr(e => ({ ...e, file: 'Upload a PDF or Word file.' })); }
    if (x.size > MAX) { setFile(null); return setErr(e => ({ ...e, file: 'File is larger than 2 MB.' })); }
    setErr(e => ({ ...e, file: undefined })); setFile(x);
  };

  const submit = async ev => {
    ev.preventDefault();
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (f.city.trim().length < 2) e.city = 'Please enter your city.';
    if (f.link && !/^https?:\/\/\S+\.\S+/.test(f.link.trim())) e.link = 'Enter a full link starting with https://';
    if (!file) e.file = err.file || 'Please attach your resume (PDF or Word, up to 2 MB).';
    if (!f.agree) e.agree = 'Please allow us to contact you.';
    setErr(e);
    const k = Object.keys(e)[0];
    if (k) { document.getElementById(`cr-${k}`)?.focus(); return; }
    setStatus('sending');
    try {
      // TODO (backend): upload `file` (multipart) and save the application through lib/api.js -> submitLead
      await submitLead({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), city: f.city.trim(), link: f.link.trim(), note: f.note.trim(), role: role.title, roleType: role.type, resumeName: file.name, source: 'careers' });
      setStatus('done');
    } catch (x) { setServerErr(x.message || 'Something went wrong. Please try again.'); setStatus('idle'); }
  };

  const text = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`cr-${k}`}>{label}</label>
      <input id={`cr-${k}`} ref={k === 'name' ? first : undefined} value={f[k]} onChange={ev => set(k, props.digits ? cleanPhone(ev.target.value) : ev.target.value)}
        type={props.type || 'text'} inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? `cr-${k}-e` : undefined} />
      {err[k] && <small id={`cr-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <div className="cr-modal" role="dialog" aria-modal="true" aria-labelledby="cr-mt" onClick={onClose}>
      <div className="cr-sheet" onClick={e => e.stopPropagation()}>
        <button className="cr-x" type="button" onClick={onClose} aria-label="Close">✕</button>
        {status === 'done' ? (
          <div className="sc-done" role="status">
            <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
            <h3 id="cr-mt">Application sent, {f.name.trim().split(' ')[0]}!</h3>
            <p>Thank you for applying for <b>{role.title}</b>. Our team will contact you on <b>+91 {f.phone}</b> if your profile is a match.</p>
            <button className="btn" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="sc-form" onSubmit={submit} noValidate>
            <h3 id="cr-mt">Apply now</h3>
            <div className="cr-ctx"><b>{role.title}</b><span>{role.type}{role.location ? ` · ${role.location}` : ''}</span></div>
            <div className="sc-grid2">
              {text('name', 'Full name', { placeholder: 'e.g. Aarav Sharma', autoComplete: 'name' })}
              {text('phone', 'Mobile number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
              {text('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
              {text('city', 'City', { placeholder: 'e.g. Gwalior', autoComplete: 'address-level2' })}
            </div>
            {text('link', 'LinkedIn, GitHub or portfolio (optional)', { placeholder: 'https://', type: 'url' })}
            <div className={`sc-field ${err.file ? 'bad' : ''}`}>
              <label htmlFor="cr-file">Resume (PDF or Word, up to 2 MB)</label>
              <input id="cr-file" className="cr-file" type="file" accept=".pdf,.doc,.docx" onChange={pick} aria-invalid={!!err.file} />
              {file && <p className="cr-fn">✓ {file.name}</p>}
              {err.file && <small role="alert">{err.file}</small>}
            </div>
            <div className="sc-field">
              <label htmlFor="cr-note">Why do you want to join? (optional)</label>
              <textarea id="cr-note" className="cr-ta" rows="3" maxLength="500" value={f.note} onChange={ev => set('note', ev.target.value)} />
            </div>
            <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
              <label className="sc-check">
                <input id="cr-agree" type="checkbox" checked={f.agree} onChange={ev => set('agree', ev.target.checked)} aria-invalid={!!err.agree} />
                <span>I agree to be contacted by Career Mantra about this application.</span>
              </label>
              {err.agree && <small role="alert">{err.agree}</small>}
            </div>
            {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
            <button className="btn sc-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit application'}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function JobBoard() {
  const [type, setType] = useState('All');
  const [dept, setDept] = useState('');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const [role, setRole] = useState(null);

  const count = t => (t === 'All' ? openings.length : openings.filter(o => o.type === t).length);
  const list = openings.filter(o => (type === 'All' || o.type === type) && (!dept || o.dept === dept) &&
    (!q || `${o.title} ${o.dept} ${o.location} ${o.summary}`.toLowerCase().includes(q.toLowerCase())));

  useEffect(() => {
    const h = e => setRole(e.detail);
    window.addEventListener('cr-apply', h);
    return () => window.removeEventListener('cr-apply', h);
  }, []);

  return (
    <>
      <div className="cr-bar" id="openings">
        <div className="cr-tabs" role="tablist" aria-label="Type">
          {['All', 'Job', 'Internship'].map(t => (
            <button key={t} role="tab" aria-selected={type === t} className={type === t ? 'on' : ''} onClick={() => setType(t)}>
              {t === 'All' ? 'All openings' : t === 'Job' ? 'Jobs' : 'Internships'} <em>{count(t)}</em>
            </button>
          ))}
        </div>
        <label className="cr-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search roles or locations" aria-label="Search roles" />
        </label>
      </div>
      <div className="cr-chips" role="group" aria-label="Team">
        <button type="button" className={!dept ? 'on' : ''} onClick={() => setDept('')}>All teams</button>
        {departments.map(d => <button type="button" key={d} className={dept === d ? 'on' : ''} onClick={() => setDept(dept === d ? '' : d)}>{d}</button>)}
      </div>

      {list.length === 0 ? (
        <div className="cr-none"><h3>No openings match</h3><p>Try another filter, or send us an open application.</p>
          <button className="btn" type="button" onClick={() => setRole({ title: 'Open application', type: 'General' })}>Send open application</button></div>
      ) : (
        <ul className="cr-list">
          {list.map(o => {
            const isOpen = open === o.id;
            return (
              <li key={o.id} className={`cr-job ${isOpen ? 'open' : ''}`}>
                <div className="cr-row">
                  <span className={`cr-type ${o.type === 'Job' ? 'j' : 'i'}`}>{o.type}</span>
                  <div className="cr-main">
                    <h3>{o.title}</h3>
                    <p>{o.summary}</p>
                    <div className="cr-meta">
                      <span>{o.dept}</span><span>📍 {o.location}</span><span>{o.mode}</span><span>{o.level}</span>{o.duration && <span>⏱ {o.duration}</span>}
                    </div>
                  </div>
                  <div className="cr-act">
                    <button className="btn" type="button" onClick={() => setRole(o)}>Apply now</button>
                    <button className="cr-more" type="button" aria-expanded={isOpen} aria-controls={`d-${o.id}`} onClick={() => setOpen(isOpen ? null : o.id)}>{isOpen ? 'Hide details' : 'View details'}</button>
                  </div>
                </div>
                {isOpen && (
                  <div className="cr-det" id={`d-${o.id}`}>
                    <div><h4>What you will do</h4><ul>{o.does.map(x => <li key={x}>{x}</li>)}</ul></div>
                    <div><h4>What we look for</h4><ul>{o.needs.map(x => <li key={x}>{x}</li>)}</ul></div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {role && <Apply role={role} onClose={() => setRole(null)} />}
    </>
  );
}