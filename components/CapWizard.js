'use client';
import { useState } from 'react';
import { submitLead } from '@/lib/api';
import cap from '@/data/cap.json';

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}
const EMPTY = { goal: '', picks: [], name: '', phone: '', email: '', city: '', agree: false };
const LABELS = ['Goal', 'Colleges', 'Details'];

export default function CapWizard() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverErr, setServerErr] = useState('');
  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined })); setServerErr(''); };
  const toggle = id => set('picks', f.picks.includes(id) ? f.picks.filter(x => x !== id) : [...f.picks, id]);
  const all = f.picks.length === cap.colleges.length;

  const next = () => {
    if (step === 0 && !f.goal) return setErr({ goal: 'Please choose a course to continue.' });
    if (step === 1 && f.picks.length === 0) return setErr({ picks: 'Select at least one college.' });
    setErr({}); setStep(s => s + 1);
  };

  const submit = async ev => {
    ev.preventDefault();
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (f.city.trim().length < 2) e.city = 'Please enter your city.';
    if (!f.agree) e.agree = 'Please allow us to contact you.';
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(`cap-${first}`)?.focus(); return; }
    setStatus('sending');
    try {
      // TODO (backend): goes to your API through lib/api.js -> submitLead
      await submitLead({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), city: f.city.trim(), course: f.goal, colleges: f.picks, source: 'common-application' });
      setStatus('done');
    } catch (x) { setServerErr(x.message || 'Something went wrong. Please try again.'); setStatus('idle'); }
  };

  if (status === 'done') {
    const names = cap.colleges.filter(c => f.picks.includes(c.id)).map(c => c.name);
    return (
      <div className="cap-card cap-done" role="status">
        <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
        <h3>Application started, {f.name.trim().split(' ')[0]}!</h3>
        <p>You chose <b>{f.goal}</b> and {names.length} {names.length === 1 ? 'college' : 'colleges'}. A Career Mantra counsellor will contact you on <b>+91 {f.phone}</b> with the next steps.</p>
        <ul>{names.map(n => <li key={n}>{n}</li>)}</ul>
        <button className="btn ghost-dark" type="button" onClick={() => { setF(EMPTY); setStep(0); setStatus('idle'); }}>Start another application</button>
      </div>
    );
  }

  const text = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`cap-${k}`}>{label}</label>
      <input id={`cap-${k}`} value={f[k]} onChange={ev => set(k, props.digits ? cleanPhone(ev.target.value) : ev.target.value)}
        type={props.type || 'text'} inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? `cap-${k}-e` : undefined} />
      {err[k] && <small id={`cap-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <form className="cap-card" onSubmit={submit} noValidate>
      <div className="cap-prog" aria-label={`Step ${step + 1} of 3`}>
        {LABELS.map((l, i) => (
          <div key={l} className={i < step ? 'ok' : i === step ? 'now' : ''}><i>{i < step ? '✓' : i + 1}</i><span>{l}</span></div>
        ))}
      </div>

      {step === 0 && (
        <div className="cap-pane">
          <h3>What do you want to study?</h3>
          <p className="sc-fsub">Pick one course to begin your common application.</p>
          <div className="cap-goals" role="radiogroup" aria-label="Course">
            {cap.goals.map(g => (
              <button type="button" key={g} role="radio" aria-checked={f.goal === g} className={f.goal === g ? 'on' : ''} onClick={() => set('goal', g)}>{g}</button>
            ))}
          </div>
          {err.goal && <small className="cap-err" role="alert">{err.goal}</small>}
          <button className="btn cap-next" type="button" onClick={next}>Continue</button>
        </div>
      )}

      {step === 1 && (
        <div className="cap-pane">
          <h3>Where do you want to apply?</h3>
          <p className="sc-fsub">Select every college you are interested in. One form covers them all.</p>
          <div className="cap-cols">
            {cap.colleges.map(c => (
              <label key={c.id} className={`cap-col ${f.picks.includes(c.id) ? 'on' : ''}`}>
                <input type="checkbox" checked={f.picks.includes(c.id)} onChange={() => toggle(c.id)} />
                <span className="cap-mono" style={{ background: `linear-gradient(135deg,${c.c[0]},${c.c[1]})` }}>{c.short}</span>
                <span className="cap-cn"><b>{c.name}</b><small>{c.place}</small></span>
                <span className="cap-tick" aria-hidden="true">✓</span>
              </label>
            ))}
          </div>
          <button type="button" className="cap-all" onClick={() => set('picks', all ? [] : cap.colleges.map(c => c.id))}>{all ? 'Clear selection' : 'Select all colleges'}</button>
          {err.picks && <small className="cap-err" role="alert">{err.picks}</small>}
          <div className="cap-nav"><button type="button" className="btn ghost-dark" onClick={() => setStep(0)}>Back</button><button type="button" className="btn" onClick={next}>Continue</button></div>
        </div>
      )}

      {step === 2 && (
        <div className="cap-pane">
          <h3>Fill your details once</h3>
          <p className="sc-fsub">Applying for <b>{f.goal}</b> to {f.picks.length} {f.picks.length === 1 ? 'college' : 'colleges'}.</p>
          <div className="sc-grid2">
            {text('name', 'Full name', { placeholder: 'e.g. Aarav Sharma', autoComplete: 'name' })}
            {text('phone', 'Mobile number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
            {text('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
            {text('city', 'City', { placeholder: 'e.g. Gwalior', autoComplete: 'address-level2' })}
          </div>
          <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
            <label className="sc-check">
              <input id="cap-agree" type="checkbox" checked={f.agree} onChange={ev => set('agree', ev.target.checked)} aria-invalid={!!err.agree} />
              <span>I agree to be contacted by Career Mantra counsellors about my application.</span>
            </label>
            {err.agree && <small role="alert">{err.agree}</small>}
          </div>
          {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
          <div className="cap-nav"><button type="button" className="btn ghost-dark" onClick={() => setStep(1)}>Back</button><button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Submit application'}</button></div>
        </div>
      )}
    </form>
  );
}