'use client';
import { useState } from 'react';
import { submitLead } from '@/lib/api';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];
const PROGRAMS = ['MBA/PGDM', 'BBA', 'B.Tech', 'MBBS', 'BCA', 'MCA', 'B.Com', 'B.Sc', 'M.Sc', 'BA', 'MA', 'BAMS', 'BHMS', 'BDS', 'FPM', 'EFPM', 'MDP'];

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

const EMPTY = { name: '', phone: '', email: '', state: '', city: '', program: '', agree: false };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (!f.state) e.state = 'Please select your state.';
  if (f.city.trim().length < 2) e.city = 'Please enter your city.';
  if (!f.program) e.program = 'Please choose the program you want.';
  if (!f.agree) e.agree = 'Please allow us to contact you.';
  return e;
}

export default function ScholarshipForm() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [serverErr, setServerErr] = useState('');

  const set = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined })); setServerErr(''); };

  const submit = async ev => {
    ev.preventDefault();
    const e = validate(f);
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) { document.getElementById(`sc-${first}`)?.focus(); return; }
    setStatus('sending');
    try {
      // TODO (backend): this goes to your API through lib/api.js -> submitLead
      await submitLead({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), state: f.state, city: f.city.trim(), course: f.program, source: 'scholarship-test' });
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
        <h3>You are registered, {f.name.trim().split(' ')[0]}!</h3>
        <p>Thank you for registering for the Scholarship Test. A Career Mantra counsellor will contact you on <b>+91 {f.phone}</b> with the next steps.</p>
        <button className="btn ghost-dark" type="button" onClick={() => { setF(EMPTY); setStatus('idle'); }}>Register another student</button>
      </div>
    );
  }

  const field = (k, label, props) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`sc-${k}`}>{label}</label>
      {props.select ? (
        <select id={`sc-${k}`} value={f[k]} onChange={ev => set(k, ev.target.value)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `sc-${k}-e` : undefined}>
          <option value="">Select {label.toLowerCase()}</option>
          {props.options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={`sc-${k}`} value={f[k]} onChange={ev => set(k, props.digits ? cleanPhone(ev.target.value) : ev.target.value)}
          type={props.type || 'text'} inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete}
          aria-invalid={!!err[k]} aria-describedby={err[k] ? `sc-${k}-e` : undefined} />
      )}
      {err[k] && <small id={`sc-${k}-e`} role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <form className="sc-form" onSubmit={submit} noValidate>
      <h3>Register for the test</h3>
      <p className="sc-fsub">Takes about two minutes. It is free.</p>
      <div className="sc-grid2">
        {field('name', 'Full name', { placeholder: 'e.g. Aarav Sharma', autoComplete: 'name' })}
        {field('phone', 'Mobile number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
        {field('email', 'Email address', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
        {field('state', 'State', { select: true, options: STATES })}
        {field('city', 'City', { placeholder: 'e.g. Gwalior', autoComplete: 'address-level2' })}
      </div>

      <div className={`sc-field ${err.program ? 'bad' : ''}`}>
        <span className="sc-lab" id="sc-program-l">Program you want to join</span>
        <div className="sc-chips" role="radiogroup" aria-labelledby="sc-program-l">
          {PROGRAMS.map((p, i) => (
            <button type="button" key={p} id={i === 0 ? 'sc-program' : undefined} role="radio" aria-checked={f.program === p}
              className={f.program === p ? 'on' : ''} onClick={() => set('program', p)}>{p}</button>
          ))}
        </div>
        {err.program && <small role="alert">{err.program}</small>}
      </div>

      <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
        <label className="sc-check">
          <input id="sc-agree" type="checkbox" checked={f.agree} onChange={ev => set('agree', ev.target.checked)} aria-invalid={!!err.agree} />
          <span>I agree to be contacted by Career Mantra counsellors about the scholarship test and admissions.</span>
        </label>
        {err.agree && <small role="alert">{err.agree}</small>}
      </div>

      {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
      <button className="btn sc-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Registering…' : 'Register now'}</button>
    </form>
  );
}