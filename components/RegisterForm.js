'use client';
import { useState } from 'react';
import Link from 'next/link';
import PasswordField from '@/components/PasswordField';
import { registerStudent } from '@/lib/api';

const COURSES = ['B.Tech', 'MBA', 'MBBS', 'Design', 'Law', 'Other'];
function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}
const EMPTY = { first: '', last: '', phone: '', email: '', password: '', confirm: '', course: '', agree: false };

export default function RegisterForm() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined, form: undefined })); };

  const submit = async ev => {
    ev.preventDefault();
    const e = {};
    if (f.first.trim().length < 2) e.first = 'Please enter your first name.';
    if (!f.last.trim()) e.last = 'Please enter your last name.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (f.password.length < 8) e.password = 'Use at least 8 characters.';
    else if (!/\d/.test(f.password) || !/[A-Za-z]/.test(f.password)) e.password = 'Include letters and at least one number.';
    if (f.confirm !== f.password) e.confirm = 'Passwords do not match.';
    if (!f.course) e.course = 'Choose the course you are interested in.';
    if (!f.agree) e.agree = 'Please accept the terms to continue.';
    setErr(e);
    const k = Object.keys(e)[0];
    if (k) return document.getElementById(`rg-${k}`)?.focus();
    setBusy(true);
    try {
      // TODO (backend): create the account on your server (hash the password there) and send an OTP/email verification.
      await registerStudent({ name: `${f.first.trim()} ${f.last.trim()}`, phone: f.phone, email: f.email.trim(), password: f.password, course: f.course });
      setDone(true);
    } catch (x) { setErr({ form: x.message || 'Could not create your account. Please try again.' }); }
    setBusy(false);
  };

  if (done) {
    return (
      <div className="sc-done" role="status">
        <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
        <h2>Welcome, {f.first.trim()}!</h2>
        <p>Your account is ready. A Career Mantra counsellor may contact you on <b>+91 {f.phone}</b> to help with {f.course === 'Other' ? 'your goals' : f.course}.</p>
        <div className="au-next"><Link className="btn" href="/college-predictor">Predict my colleges</Link><Link className="btn ghost-dark" href="/scholarship">Scholarship test</Link></div>
      </div>
    );
  }

  const text = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`rg-${k}`}>{label}</label>
      {props.phone ? (
        <div className="au-ph"><span>+91</span><input id={`rg-${k}`} value={f[k]} onChange={e => set(k, cleanPhone(e.target.value))} inputMode="numeric" autoComplete="tel-national" placeholder="10 digit mobile" aria-invalid={!!err[k]} /></div>
      ) : (
        <input id={`rg-${k}`} value={f[k]} onChange={e => set(k, e.target.value)} type={props.type || 'text'} placeholder={props.placeholder} autoComplete={props.autoComplete} aria-invalid={!!err[k]} aria-describedby={err[k] ? `rg-${k}-e` : undefined} />
      )}
      {err[k] && <small id={`rg-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <div>
      <h2>Create your account</h2>
      <p className="au-sub">It is free and takes about a minute.</p>
      <form className="sc-form" onSubmit={submit} noValidate>
        <div className="sc-grid2">
          {text('first', 'First name', { placeholder: 'e.g. Aarav', autoComplete: 'given-name' })}
          {text('last', 'Last name', { placeholder: 'e.g. Sharma', autoComplete: 'family-name' })}
          {text('phone', 'Mobile number', { phone: true })}
          {text('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
        </div>
        <div className="sc-grid2">
          <PasswordField id="rg-password" label="Password" value={f.password} onChange={v => set('password', v)} error={err.password} autoComplete="new-password" placeholder="At least 8 characters" meter />
          <PasswordField id="rg-confirm" label="Confirm password" value={f.confirm} onChange={v => set('confirm', v)} error={err.confirm} autoComplete="new-password" placeholder="Repeat password" />
        </div>
        <div className={`sc-field ${err.course ? 'bad' : ''}`}>
          <span className="sc-lab" id="rg-course-l">I am interested in</span>
          <div className="sc-chips" role="radiogroup" aria-labelledby="rg-course-l">
            {COURSES.map((c, i) => <button type="button" key={c} id={i === 0 ? 'rg-course' : undefined} role="radio" aria-checked={f.course === c} className={f.course === c ? 'on' : ''} onClick={() => set('course', c)}>{c}</button>)}
          </div>
          {err.course && <small role="alert">{err.course}</small>}
        </div>
        <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
          <label className="sc-check">
            <input id="rg-agree" type="checkbox" checked={f.agree} onChange={e => set('agree', e.target.checked)} aria-invalid={!!err.agree} />
            <span>I agree to the Terms &amp; Conditions and Privacy Policy, and to be contacted by Career Mantra counsellors.</span>
          </label>
          {err.agree && <small role="alert">{err.agree}</small>}
        </div>
        {err.form && <p className="sc-servererr" role="alert">{err.form}</p>}
        <button className="btn sc-submit" type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="au-switch">Already have an account? <Link href="/login">Log in</Link></p>
    </div>
  );
}