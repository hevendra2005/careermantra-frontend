'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitLead } from '@/lib/api';

const WHO = ['MBA/PGDM aspirant', 'Fresher', 'Management institution', 'University'];

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

const EMPTY = { name: '', phone: '', email: '', city: '', who: '', test: false, agree: false };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (f.city.trim().length < 2) e.city = 'Please enter your city.';
  if (!f.who) e.who = 'Please tell us who is attending.';
  if (!f.agree) e.agree = 'Please allow us to contact you.';
  return e;
}

export default function ConclaveForm() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverErr, setServerErr] = useState('');

  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined })); setServerErr(''); };

  const submit = async ev => {
    ev.preventDefault();
    const e = validate(f);
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(`cv-${first}`)?.focus(); return; }
    setStatus('sending');
    try {
      // TODO (backend): goes to your API through lib/api.js -> submitLead
      await submitLead({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), city: f.city.trim(), course: f.who, scholarshipTest: f.test, source: 'mega-conclave' });
      setStatus('done');
    } catch (x) {
      setServerErr(x.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="sc-done" role="status">
        <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
        <h3>You are on the list, {f.name.trim().split(' ')[0]}!</h3>
        <p>Thank you for registering for the Mega MBA Conclave. A Career Mantra counsellor will contact you on <b>+91 {f.phone}</b> with the event details.</p>
        {f.test && <p>We have also noted your interest in the free Scholarship Test.</p>}
        <Link className="btn" href="/scholarship">Explore the Scholarship Test</Link>
        <button className="btn ghost-dark" type="button" onClick={() => { setF(EMPTY); setStatus('idle'); }}>Register another person</button>
      </div>
    );
  }

  const text = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`cv-${k}`}>{label}</label>
      <input id={`cv-${k}`} value={f[k]} onChange={ev => set(k, props.digits ? cleanPhone(ev.target.value) : ev.target.value)}
        type={props.type || 'text'} inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? `cv-${k}-e` : undefined} />
      {err[k] && <small id={`cv-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <form className="sc-form" onSubmit={submit} noValidate>
      <h3>Reserve your seat</h3>
      <p className="sc-fsub">Takes about a minute. We will share the event details with you.</p>
      <div className="sc-grid2">
        {text('name', 'Full name', { placeholder: 'e.g. Aarav Sharma', autoComplete: 'name' })}
        {text('phone', 'Mobile number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
        {text('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
        {text('city', 'City', { placeholder: 'e.g. Gwalior', autoComplete: 'address-level2' })}
      </div>

      <div className={`sc-field ${err.who ? 'bad' : ''}`}>
        <span className="sc-lab" id="cv-who-l">I am attending as</span>
        <div className="sc-chips" role="radiogroup" aria-labelledby="cv-who-l">
          {WHO.map((p, i) => (
            <button type="button" key={p} id={i === 0 ? 'cv-who' : undefined} role="radio" aria-checked={f.who === p}
              className={f.who === p ? 'on' : ''} onClick={() => set('who', p)}>{p}</button>
          ))}
        </div>
        {err.who && <small role="alert">{err.who}</small>}
      </div>

      <label className="sc-check">
        <input type="checkbox" checked={f.test} onChange={ev => set('test', ev.target.checked)} />
        <span>Also register me for the free Scholarship Test.</span>
      </label>

      <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
        <label className="sc-check">
          <input id="cv-agree" type="checkbox" checked={f.agree} onChange={ev => set('agree', ev.target.checked)} aria-invalid={!!err.agree} />
          <span>I agree to be contacted by Career Mantra counsellors about this conclave and admissions.</span>
        </label>
        {err.agree && <small role="alert">{err.agree}</small>}
      </div>

      {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
      <button className="btn sc-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Registering…' : 'Register for the conclave'}</button>
    </form>
  );
}