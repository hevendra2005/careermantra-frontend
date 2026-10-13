'use client';
import { useEffect, useState } from 'react';
import { CATS } from '@/components/Stars';

function StarInput({ value, onChange, label }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="rw-starin" role="radiogroup" aria-label={label} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map(n => (
        <button type="button" key={n} role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={n <= (hover || value) ? 'on' : ''} onMouseEnter={() => setHover(n)} onClick={() => onChange(n)}>★</button>
      ))}
    </div>
  );
}

export default function WriteReview({ colleges, courses, onClose, onSubmit }) {
  const [f, setF] = useState({ name: '', college: '', course: '', batch: '2025', campus: '', internships: '', placement: '' });
  const [ratings, setRatings] = useState({});
  const [err, setErr] = useState('');

  useEffect(() => {
    const key = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [onClose]);

  const set = k => e => { setErr(''); setF(s => ({ ...s, [k]: e.target.value })); };
  const submit = e => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Please enter your name.');
    if (!f.college || !f.course) return setErr('Please choose your college and course.');
    if (CATS.some(([k]) => !ratings[k])) return setErr('Please rate all 5 categories.');
    // TODO (backend): POST this review to your API instead of only adding it on the page.
    onSubmit({
      id: Date.now(), college: f.college, name: f.name.trim(), course: f.course, batch: f.batch,
      date: new Date().toISOString().slice(0, 10), ratings,
      sections: { campus: f.campus, internships: f.internships, placement: f.placement }, helpful: 0, fresh: true,
    });
  };

  return (
    <div className="rw-modal" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <form className="rw-form" role="dialog" aria-modal="true" aria-label="Write a review" onSubmit={submit}>
        <button type="button" className="rw-x" onClick={onClose} aria-label="Close">✕</button>
        <h2>Write a review</h2>
        <p className="rw-sub">Help other students with your honest experience.</p>
        <div className="rw-grid2">
          <label>Your name<input value={f.name} onChange={set('name')} placeholder="e.g. Aarav Sharma" autoFocus /></label>
          <label>Batch<select value={f.batch} onChange={set('batch')}>{[2027, 2026, 2025, 2024, 2023, 2022, 2021].map(y => <option key={y}>{y}</option>)}</select></label>
          <label>College<select value={f.college} onChange={set('college')}><option value="">Select college</option>{colleges.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
          <label>Course<select value={f.course} onChange={set('course')}><option value="">Select course</option>{courses.map(c => <option key={c}>{c}</option>)}</select></label>
        </div>
        <div className="rw-rate">
          {CATS.map(([k, label]) => (
            <div key={k}><span>{label}</span><StarInput label={label} value={ratings[k] || 0} onChange={v => { setErr(''); setRatings(r => ({ ...r, [k]: v })); }} /></div>
          ))}
        </div>
        <label>Campus life<textarea rows={2} value={f.campus} onChange={set('campus')} placeholder="Faculty, hostel, clubs, environment…" /></label>
        <label>Internship opportunities<textarea rows={2} value={f.internships} onChange={set('internships')} placeholder="Internship support and exposure…" /></label>
        <label>Placement experience<textarea rows={2} value={f.placement} onChange={set('placement')} placeholder="Companies, training, packages…" /></label>
        {err && <p className="rw-err" role="alert">{err}</p>}
        <button className="btn" type="submit">Submit review</button>
      </form>
    </div>
  );
}