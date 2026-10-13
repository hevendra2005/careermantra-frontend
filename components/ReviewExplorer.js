'use client';
import { useState } from 'react';
import FilterSelect from '@/components/FilterSelect';
import WriteReview from '@/components/WriteReview';
import Stars, { CATS, overall } from '@/components/Stars';

const GRADS = ['linear-gradient(135deg,#2f5bff,#6d8bff)', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)', 'linear-gradient(135deg,#0ea5a4,#34d399)', 'linear-gradient(135deg,#8a2be2,#c084fc)', 'linear-gradient(135deg,#0284c7,#38bdf8)', 'linear-gradient(135deg,#e8730c,#fbbf24)'];
const TABS = [['campus', 'Campus life'], ['internships', 'Internships'], ['placement', 'Placements']];
const PAGE = 6;
const fmtDate = s => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
const SORTS = {
  newest: (a, b) => (b.date + b.id).localeCompare(a.date + a.id),
  highest: (a, b) => overall(b) - overall(a),
  lowest: (a, b) => overall(a) - overall(b),
  helpful: (a, b) => b.helpful - a.helpful,
};

function ReviewCard({ r, college, i }) {
  const [tab, setTab] = useState('campus');
  const [more, setMore] = useState(false);
  const [liked, setLiked] = useState(false);
  const o = overall(r);
  const text = r.sections[tab] || 'No details shared for this section.';
  const long = text.length > 170;
  return (
    <article className="rw-card" style={{ '--i': i }}>
      <header>
        <div className="rw-av" style={{ background: GRADS[r.id % GRADS.length] }}>{initials(r.name)}</div>
        <div className="rw-who"><h3>{r.name}</h3><p>{r.course} · Batch of {r.batch}</p></div>
        <div className="rw-score"><b>{o.toFixed(1)}</b><Stars value={o} /></div>
      </header>
      <div className="rw-college">🏛️ {college?.name}{college && <span>{college.city}</span>}</div>
      <div className="rw-cats">
        {CATS.map(([k, label]) => (
          <div key={k}><small>{label}</small><i><u style={{ width: `${(r.ratings[k] / 5) * 100}%` }} /></i><b>{r.ratings[k]}</b></div>
        ))}
      </div>
      <div className="rw-tabs" role="tablist">
        {TABS.map(([k, label]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setMore(false); }}>{label}</button>)}
      </div>
      <p className="rw-text">{more || !long ? text : `${text.slice(0, 170)}…`}</p>
      {long && <button className="rw-more" onClick={() => setMore(m => !m)}>{more ? 'Show less' : 'Read more'}</button>}
      <footer>
        <span>{r.fresh ? '🆕 Just now' : `✔ Student review · ${fmtDate(r.date)}`}</span>
        <button className={liked ? 'on' : ''} onClick={() => setLiked(l => !l)} aria-pressed={liked}>👍 Helpful ({r.helpful + (liked ? 1 : 0)})</button>
      </footer>
    </article>
  );
}

export default function ReviewExplorer({ reviews, colleges }) {
  const [extra, setExtra] = useState([]);
  const [q, setQ] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [sort, setSort] = useState('newest');
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');

  const byCollege = Object.fromEntries(colleges.map(c => [c.slug, c]));
  const all = [...extra, ...reviews];
  const pass = (r, f) =>
    (!f.college || r.college === f.college) && (!f.course || r.course === f.course) &&
    (!f.q || `${r.name} ${byCollege[r.college]?.name} ${Object.values(r.sections).join(' ')}`.toLowerCase().includes(f.q.toLowerCase()));
  const cur = { q, college, course };
  const list = all.filter(r => pass(r, cur)).sort(SORTS[sort]);

  const courses = [...new Set(all.map(r => r.course))].sort();
  const collegeOpts = colleges.filter(c => all.some(r => r.college === c.slug)).map(c => ({ value: c.slug, label: c.name, count: all.filter(r => r.college === c.slug && pass(r, { ...cur, college: '' })).length }));
  const courseOpts = courses.map(v => ({ value: v, label: v, count: all.filter(r => r.course === v && pass(r, { ...cur, course: '' })).length }));

  const n = list.length;
  const avg = n ? list.reduce((s, r) => s + overall(r), 0) / n : 0;
  const dist = [5, 4, 3, 2, 1].map(s => list.filter(r => Math.round(overall(r)) === s).length);
  const catAvg = CATS.map(([k, label]) => [label, n ? list.reduce((s, r) => s + r.ratings[k], 0) / n : 0]);

  const submit = r => {
    setExtra(e => [r, ...e]); setOpen(false); setSort('newest'); setCollege(''); setCourse(''); setQ('');
    setToast('Thank you! Your review has been added.'); setTimeout(() => setToast(''), 4000);
  };
  const clear = () => { setQ(''); setCollege(''); setCourse(''); };

  return (
    <div className="cp rw">
      <div className="wrap cp-searchwrap">
        <div className="cp-search">
          <label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search reviews by college, name or keyword" aria-label="Search reviews" />
          </label>
          <button className="btn" onClick={() => setOpen(true)}>✍️ Write a review</button>
        </div>
      </div>

      <div className="wrap rw-summary">
        <div className="rw-big">
          <b>{n ? avg.toFixed(1) : '–'}</b>
          <Stars value={avg} />
          <span>{n} {n === 1 ? 'review' : 'reviews'}</span>
        </div>
        <div className="rw-dist">
          {[5, 4, 3, 2, 1].map((s, idx) => (
            <div key={s}><span>{s} ★</span><i><u style={{ width: n ? `${(dist[idx] / n) * 100}%` : 0 }} /></i><em>{dist[idx]}</em></div>
          ))}
        </div>
        <div className="rw-catavg">
          {catAvg.map(([label, v]) => (
            <div key={label}><span>{label}</span><i><u style={{ width: `${(v / 5) * 100}%` }} /></i><b>{n ? v.toFixed(1) : '–'}</b></div>
          ))}
        </div>
      </div>

      <div className="wrap ex-toolbar">
        <FilterSelect label="College" value={college} onChange={v => { setCollege(v); setShown(PAGE); }} options={collegeOpts} placeholder="All colleges" allLabel="All colleges" searchable />
        <FilterSelect label="Course" value={course} onChange={v => { setCourse(v); setShown(PAGE); }} options={courseOpts} placeholder="All courses" allLabel="All courses" />
        <div className="fs">
          <span className="fs-label">Sort by</span>
          <select className="fs-sel" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort reviews">
            <option value="newest">Newest first</option>
            <option value="helpful">Most helpful</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>
      </div>

      <div className="wrap">
        <div className="cp-top"><b>{n} {n === 1 ? 'review' : 'reviews'}</b></div>
        {n === 0 ? (
          <div className="cp-empty">
            <span>💬</span><h3>No reviews found</h3><p>Be the first to share your experience, or clear the filters.</p>
            <button className="btn" onClick={() => setOpen(true)}>Write a review</button> <button className="btn" onClick={clear} style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' }}>Clear filters</button>
          </div>
        ) : (
          <div className="rw-grid" key={`${q}|${college}|${course}|${sort}`}>
            {list.slice(0, shown).map((r, i) => <ReviewCard key={r.id} r={r} college={byCollege[r.college]} i={i} />)}
          </div>
        )}
        {shown < n && <div className="cp-more"><button className="btn" onClick={() => setShown(s => s + PAGE)}>Show more reviews</button></div>}
      </div>

      {open && <WriteReview colleges={colleges} courses={['B.Tech', 'MBA', 'BBA', 'Law', 'Design', 'MBBS']} onClose={() => setOpen(false)} onSubmit={submit} />}
      {toast && <div className="rw-toast" role="status">{toast}</div>}
    </div>
  );
}