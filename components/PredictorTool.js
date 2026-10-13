'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitLead } from '@/lib/api';
import colleges from '@/data/colleges.json';
import P from '@/data/predictor.json';

const STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
const STEPS = ['Select a course', 'Select exams', 'Enter scores', 'Finish'];
const BAND = { safe: { label: 'Safe', pct: 90 }, moderate: { label: 'Moderate', pct: 60 }, ambitious: { label: 'Ambitious', pct: 30 } };
const ORDER = { safe: 0, moderate: 1, ambitious: 2 };

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}
const bandOf = diff => (diff >= 6 ? 'safe' : diff >= -3 ? 'moderate' : diff >= -10 ? 'ambitious' : null);

// For each college keep the best match across all exams the student took.
function predict(course, scores, relax, home) {
  const out = [];
  for (const c of colleges) {
    const cut = P.cutoffs[c.slug]?.[course.key];
    if (cut == null) continue;
    let best = null;
    for (const [exam, s] of Object.entries(scores)) {
      const diff = s + relax - cut;
      if (best === null || diff > best.diff) best = { diff, exam };
    }
    const band = bandOf(best.diff);
    if (band) out.push({ c, cut, diff: best.diff, exam: best.exam, band, homeState: !!home && c.state === home });
  }
  return out.sort((a, b) => ORDER[a.band] - ORDER[b.band] || Number(b.homeState) - Number(a.homeState) || b.cut - a.cut);
}

const EMPTY = { first: '', last: '', email: '', phone: '', category: '', state: '', agree: false };

export default function PredictorTool() {
  const [step, setStep] = useState(0);
  const [courseId, setCourseId] = useState('');
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState({});
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverErr, setServerErr] = useState('');
  const [res, setRes] = useState(null);
  const [filter, setFilter] = useState('all');
  const [short, setShort] = useState([]);

  const course = P.courses.find(c => c.id === courseId);
  const setField = (k, v) => { setF(s => ({ ...s, [k]: v })); setErr(e => ({ ...e, [k]: undefined })); setServerErr(''); };
  const goTop = () => setTimeout(() => document.getElementById('predictor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);

  const pickCourse = id => { if (id !== courseId) { setExams([]); setScores({}); } setCourseId(id); setErr({}); };
  const toggleExam = e => { setExams(x => (x.includes(e) ? x.filter(y => y !== e) : [...x, e])); setErr({}); };

  const next = () => {
    if (step === 0) { if (!course) return setErr({ course: 'Please select a course.' }); }
    if (step === 1) { if (exams.length === 0) return setErr({ exams: 'Select at least one exam.' }); }
    if (step === 2) {
      const e = {};
      for (const x of exams) { const v = scores[x]; const n = Number(v); if (v === undefined || v === '' || Number.isNaN(n) || n < 0 || n > 100) e[x] = 'Enter a percentile between 0 and 100.'; }
      if (Object.keys(e).length) return setErr(e);
    }
    setErr({}); setStep(s => s + 1); goTop();
  };
  const back = () => { setErr({}); setStep(s => s - 1); };

  const submit = async ev => {
    ev.preventDefault();
    const e = {};
    if (f.first.trim().length < 2) e.first = 'Please enter your first name.';
    if (!f.last.trim()) e.last = 'Please enter your last name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10 digit mobile number.';
    if (!f.category) e.category = 'Please select your category.';
    if (!f.state) e.state = 'Please choose your domicile state.';
    if (!f.agree) e.agree = 'Please allow us to contact you.';
    setErr(e);
    const k = Object.keys(e)[0];
    if (k) { document.getElementById(`pw-${k}`)?.focus(); return; }
    setStatus('sending');
    try {
      const num = Object.fromEntries(exams.map(x => [x, Number(scores[x])]));
      // TODO (backend): goes to your API through lib/api.js -> submitLead (add OTP verification here if you want it)
      await submitLead({ name: `${f.first.trim()} ${f.last.trim()}`, phone: f.phone, email: f.email.trim(), course: course.label, exams: num, category: f.category, state: f.state, source: 'college-predictor' });
      const relax = P.categories.find(c => c[0] === f.category)[1];
      setRes(predict(course, num, relax, f.state));
      setFilter('all'); setShort([]); setStatus('idle'); goTop();
    } catch (x) { setServerErr(x.message || 'Something went wrong. Please try again.'); setStatus('idle'); }
  };

  const restart = () => { setStep(0); setCourseId(''); setExams([]); setScores({}); setF(EMPTY); setErr({}); setRes(null); setShort([]); goTop(); };
  const toggleShort = slug => setShort(s => (s.includes(slug) ? s.filter(x => x !== slug) : [...s, slug]));
  const counts = res ? { safe: res.filter(r => r.band === 'safe').length, moderate: res.filter(r => r.band === 'moderate').length, ambitious: res.filter(r => r.band === 'ambitious').length } : null;
  const shown = res ? res.filter(r => filter === 'all' || r.band === filter) : [];
  const wa = res ? `https://wa.me/918800198642?text=${encodeURIComponent(`Hi, I used the College Predictor for ${course.label} (${exams.join(', ')}). ${short.length ? `I shortlisted: ${colleges.filter(c => short.includes(c.slug)).map(c => c.name).join(', ')}.` : ''} Please help me with admissions.`)}` : '';

  const field = (k, label, props = {}) => (
    <div className={`sc-field ${err[k] ? 'bad' : ''}`}>
      <label htmlFor={`pw-${k}`}>{label}</label>
      {props.select ? (
        <select id={`pw-${k}`} value={f[k]} onChange={e => setField(k, e.target.value)} aria-invalid={!!err[k]}>
          <option value="">{props.ph}</option>
          {props.options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={`pw-${k}`} value={f[k]} onChange={e => setField(k, props.digits ? cleanPhone(e.target.value) : e.target.value)} type={props.type || 'text'}
          inputMode={props.inputMode} placeholder={props.placeholder} autoComplete={props.autoComplete} aria-invalid={!!err[k]} />
      )}
      {err[k] && <small role="alert">{err[k]}</small>}
    </div>
  );

  return (
    <div className="pw" id="predictor">
      {!res && (
        <ol className="pw-prog" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? 'ok' : i === step ? 'now' : ''} aria-current={i === step ? 'step' : undefined}>
              <i>{i < step ? '✓' : i + 1}</i><span>{s}</span>
            </li>
          ))}
        </ol>
      )}

      {!res && step === 0 && (
        <div className="pw-pane">
          <h2>Select your course</h2>
          <p className="pw-sub">Which course are you aiming for?</p>
          <div className="pw-courses" role="radiogroup" aria-label="Course">
            {P.courses.map(c => {
              const off = c.exams.length === 0;
              return (
                <button type="button" key={c.id} role="radio" aria-checked={courseId === c.id} disabled={off} className={courseId === c.id ? 'on' : ''} onClick={() => pickCourse(c.id)}>
                  <span aria-hidden="true">{c.icon}</span><b>{c.label}</b><small>{off ? 'Coming soon' : `${c.exams.length} exam${c.exams.length > 1 ? 's' : ''}`}</small>
                </button>
              );
            })}
          </div>
          {err.course && <small className="pw-err" role="alert">{err.course}</small>}
          <div className="pw-nav"><button className="btn" type="button" onClick={next}>Next</button></div>
        </div>
      )}

      {!res && step === 1 && (
        <div className="pw-pane">
          <h2>Select the exams you have taken</h2>
          <p className="pw-sub">For {course.label}. You can choose more than one.</p>
          <div className="pw-exams">
            {course.exams.map(x => (
              <label key={x} className={exams.includes(x) ? 'on' : ''}>
                <input type="checkbox" checked={exams.includes(x)} onChange={() => toggleExam(x)} />
                <span className="pw-box" aria-hidden="true">✓</span><b>{x}</b>
              </label>
            ))}
          </div>
          {err.exams && <small className="pw-err" role="alert">{err.exams}</small>}
          <div className="pw-nav"><button className="btn ghost-dark" type="button" onClick={back}>Previous</button><button className="btn" type="button" onClick={next}>Next</button></div>
        </div>
      )}

      {!res && step === 2 && (
        <div className="pw-pane">
          <h2>Enter your exam scores</h2>
          <p className="pw-sub">Enter your percentile for each exam (0 to 100).</p>
          <div className="pw-scores">
            {exams.map(x => (
              <div key={x} className={`pw-sc ${err[x] ? 'bad' : ''}`}>
                <label htmlFor={`sc-${x}`}>{x}</label>
                <div><input id={`sc-${x}`} type="number" inputMode="decimal" min="0" max="100" step="0.1" placeholder="e.g. 78.5" value={scores[x] ?? ''}
                  onChange={e => { setScores(s => ({ ...s, [x]: e.target.value })); setErr(v => ({ ...v, [x]: undefined })); }} aria-invalid={!!err[x]} /><span>/ 100</span></div>
                <input className="pw-range" type="range" min="0" max="100" step="0.5" value={Number(scores[x]) || 0}
                  onChange={e => { setScores(s => ({ ...s, [x]: e.target.value })); setErr(v => ({ ...v, [x]: undefined })); }} aria-label={`${x} percentile slider`} />
                {err[x] && <small role="alert">{err[x]}</small>}
              </div>
            ))}
          </div>
          <div className="pw-nav"><button className="btn ghost-dark" type="button" onClick={back}>Previous</button><button className="btn" type="button" onClick={next}>Next</button></div>
        </div>
      )}

      {!res && step === 3 && (
        <form className="pw-pane" onSubmit={submit} noValidate>
          <h2>Fill the details</h2>
          <p className="pw-sub">Last step. We show your colleges right after this.</p>
          <div className="sc-grid2">
            {field('first', 'First name', { placeholder: 'e.g. Aarav', autoComplete: 'given-name' })}
            {field('last', 'Last name', { placeholder: 'e.g. Sharma', autoComplete: 'family-name' })}
            {field('email', 'Email', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
            {field('phone', 'Phone number', { placeholder: '10 digit mobile', digits: true, inputMode: 'numeric', autoComplete: 'tel-national' })}
            {field('category', 'Category', { select: true, ph: 'Select category', options: P.categories.map(c => c[0]) })}
            {field('state', 'Domicile state', { select: true, ph: 'Choose domicile state', options: STATES })}
          </div>
          <div className={`sc-field ${err.agree ? 'bad' : ''}`}>
            <label className="sc-check">
              <input id="pw-agree" type="checkbox" checked={f.agree} onChange={e => setField('agree', e.target.checked)} aria-invalid={!!err.agree} />
              <span>I agree to be contacted by Career Mantra counsellors about my admission.</span>
            </label>
            {err.agree && <small role="alert">{err.agree}</small>}
          </div>
          {serverErr && <p className="sc-servererr" role="alert">{serverErr}</p>}
          <div className="pw-nav"><button className="btn ghost-dark" type="button" onClick={back}>Previous</button><button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Predicting…' : 'Submit'}</button></div>
        </form>
      )}

      {res && (
        <div className="pw-res">
          <div className="pw-top">
            <div>
              <h2>Your college matches</h2>
              <p>{course.label} · {exams.map(x => `${x} ${Number(scores[x])}`).join(', ')} · {f.category} · {f.state}</p>
            </div>
            <button className="pw-edit" type="button" onClick={restart}>Start over</button>
          </div>
          <div className="pw-sumrow">
            {['safe', 'moderate', 'ambitious'].map(b => (
              <button type="button" key={b} className={`pw-sum ${b} ${filter === b ? 'on' : ''}`} onClick={() => setFilter(filter === b ? 'all' : b)} aria-pressed={filter === b}>
                <b>{counts[b]}</b><span>{BAND[b].label}</span>
              </button>
            ))}
          </div>
          {res.length === 0 ? (
            <div className="pw-none"><h3>No close matches in our list yet</h3><p>A counsellor can suggest colleges that fit your scores, including ones not shown here.</p></div>
          ) : (
            <ul className="pw-list">
              {shown.map(({ c, cut, diff, exam, band, homeState }) => (
                <li key={c.slug} className={`pw-card ${band}`}>
                  <span className="pw-mono" style={{ background: `linear-gradient(135deg,${c.colors[1]},${c.colors[0]})` }}>{c.name.split(/[\s,]+/).filter(w => /^[A-Z]/.test(w)).slice(0, 3).map(w => w[0]).join('')}</span>
                  <div className="pw-info">
                    <h3>{c.name} {homeState && <em>Home state</em>}</h3>
                    <p>{c.city}, {c.state} · {course.label}</p>
                    <div className="pw-meter" aria-label={`${BAND[band].label} chance`}><i style={{ width: `${BAND[band].pct}%` }} /></div>
                    <small>Cutoff about {cut} · Best match: {exam} ({diff >= 0 ? `${diff.toFixed(1)} above` : `${Math.abs(diff).toFixed(1)} below`}, after category relaxation)</small>
                  </div>
                  <div className="pw-side">
                    <span className={`pw-badge ${band}`}>{BAND[band].label}</span>
                    <button type="button" className={`pw-star ${short.includes(c.slug) ? 'on' : ''}`} onClick={() => toggleShort(c.slug)} aria-pressed={short.includes(c.slug)}>{short.includes(c.slug) ? '★ Shortlisted' : '☆ Shortlist'}</button>
                    <a href={c.url} target="_blank" rel="noopener noreferrer">View college</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="pw-thanks">
            <div>
              <h3>Thank you, {f.first.trim()}!</h3>
              <p>A Career Mantra counsellor will contact you on +91 {f.phone}{short.length ? ` about your ${short.length} shortlisted college${short.length > 1 ? 's' : ''}` : ''}. You can also chat with us right now.</p>
            </div>
            <a className="btn sun" href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
          <p className="pw-disc">Indicative result based on sample cutoffs. Confirm the latest cutoffs with each college. <Link href="/exams">See exam dates</Link></p>
        </div>
      )}
    </div>
  );
}