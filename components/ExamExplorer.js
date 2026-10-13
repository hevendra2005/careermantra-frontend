'use client';
import { useEffect, useState } from 'react';
import FilterSelect from '@/components/FilterSelect';

const GRADS = ['linear-gradient(135deg,#2f5bff,#6d8bff)', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)', 'linear-gradient(135deg,#0ea5a4,#34d399)', 'linear-gradient(135deg,#8a2be2,#c084fc)', 'linear-gradient(135deg,#0284c7,#38bdf8)', 'linear-gradient(135deg,#e8730c,#fbbf24)'];
const MODES = { online: 'Online', offline: 'Offline', both: 'Online & Offline' };
const ICONS = { Management: '💼', Engineering: '💻', Law: '⚖️', University: '🎓' };
const RANK = { open: 0, soon: 1, upcoming: 2, result: 3, done: 4 };
const PAGE = 6;

const toDate = s => (s ? new Date(`${s}T00:00:00Z`) : null);
const fmt = s => (s ? toDate(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'To be announced');

function getStatus(e, now) {
  const a = toDate(e.applicationDate), x = toDate(e.examDate), r = toDate(e.resultDate);
  if (x && now > x) return r && now <= r ? { key: 'result', label: 'Result awaited' } : { key: 'done', label: 'Completed' };
  if (a && now >= a) return { key: 'open', label: 'Application open' };
  if (a && now < a) return { key: 'soon', label: 'Application soon' };
  return { key: 'upcoming', label: 'Upcoming' };
}
const isUpcoming = e => ['open', 'soon', 'upcoming'].includes(e.st.key);
const t = s => (toDate(s) || 0) * 1;
const SORTS = {
  upcoming: (a, b) => RANK[a.st.key] - RANK[b.st.key] || (RANK[a.st.key] < 3 ? t(a.examDate) - t(b.examDate) : t(b.examDate) - t(a.examDate)),
  'date-desc': (a, b) => t(b.examDate) - t(a.examDate),
  name: (a, b) => a.name.localeCompare(b.name),
};

export default function ExamExplorer({ exams, nowISO }) {
  const [now, setNow] = useState(() => new Date(nowISO));
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('all');
  const [stream, setStream] = useState('');
  const [mode, setMode] = useState('');
  const [sort, setSort] = useState('upcoming');
  const [shown, setShown] = useState(PAGE);
  useEffect(() => setNow(new Date()), []);
  useEffect(() => setShown(PAGE), [q, tab, stream, mode, sort]);

  const all = exams.map(e => ({ ...e, st: getStatus(e, now) }));
  const pass = (e, f) =>
    (!f.q || `${e.name} ${e.fullName}`.toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.stream || e.stream === f.stream) && (!f.mode || e.mode === f.mode) &&
    (f.tab === 'all' || (f.tab === 'open' ? e.st.key === 'open' : isUpcoming(e)));
  const cur = { q, tab, stream, mode };
  const list = all.filter(e => pass(e, cur)).sort(SORTS[sort]);

  const streamOpts = [...new Set(exams.map(e => e.stream))].sort().map(v => ({ value: v, label: `${ICONS[v] || ''} ${v}`.trim(), count: all.filter(e => e.stream === v && pass(e, { ...cur, stream: '' })).length }));
  const modeOpts = Object.entries(MODES).map(([v, label]) => ({ value: v, label, count: all.filter(e => e.mode === v && pass(e, { ...cur, mode: '' })).length })).filter(o => o.count || mode === o.value);
  const tabCount = k => all.filter(e => pass(e, { ...cur, tab: k })).length;

  const active = [stream && ['stream', stream], mode && ['mode', MODES[mode]], q && ['q', `“${q}”`]].filter(Boolean);
  const drop = k => ({ stream: () => setStream(''), mode: () => setMode(''), q: () => setQ('') })[k]();
  const clear = () => { setQ(''); setStream(''); setMode(''); setTab('all'); };

  return (
    <div className="cp ex">
      <div className="wrap cp-searchwrap">
        <div className="cp-search">
          <label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search exam (CAT, XAT, CLAT…)" aria-label="Search exams" />
          </label>
        </div>
      </div>

      <div className="wrap cp-tabs" role="tablist" aria-label="Exam stage">
        {[['all', '📚 All exams'], ['open', '📝 Application open'], ['upcoming', '⏳ Upcoming exams']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label} <em>{tabCount(k)}</em></button>
        ))}
      </div>

      <div className="wrap ex-toolbar">
        <FilterSelect label="Stream" value={stream} onChange={setStream} options={streamOpts} placeholder="All streams" allLabel="All streams" />
        <FilterSelect label="Exam mode" value={mode} onChange={setMode} options={modeOpts} placeholder="Any mode" allLabel="Any mode" />
        <div className="fs">
          <span className="fs-label">Sort by</span>
          <select className="fs-sel" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort exams">
            <option value="upcoming">Upcoming first</option>
            <option value="date-desc">Latest exam date</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="wrap">
        <div className="cp-top">
          <b>{list.length} {list.length === 1 ? 'exam' : 'exams'}</b>
          <div className="cp-active">{active.map(([k, label]) => <button key={k} onClick={() => drop(k)}>{label} ✕</button>)}</div>
        </div>

        {list.length === 0 ? (
          <div className="cp-empty">
            <span>🗓️</span>
            <h3>No exams here right now</h3>
            <p>{tab !== 'all' ? 'Nothing is in this stage at the moment. Check all exams or set alerts below.' : 'Try a different search or clear the filters.'}</p>
            <button className="btn" onClick={clear}>Show all exams</button>
          </div>
        ) : (
          <div className="ex-grid" key={`${q}|${tab}|${stream}|${mode}|${sort}`}>
            {list.slice(0, shown).map((e, i) => {
              const steps = [['Application', e.applicationDate], ['Exam', e.examDate], ['Result', e.resultDate]];
              const done = steps.map(([, d]) => !!d && toDate(d) <= now);
              const next = done.findIndex((d, idx) => !d && steps[idx][1]);
              return (
                <article className="ex-card" key={e.slug} style={{ '--i': i }}>
                  <div className="ex-top">
                    <div className="ex-logo" style={{ background: GRADS[i % GRADS.length] }}>{e.short}</div>
                    <div className="ex-title"><h3>{e.name}</h3><p>{e.fullName}</p></div>
                  </div>
                  <div className="ex-meta">
                    <span className={`ex-st ${e.st.key}`}>{e.st.label}</span>
                    <span>{ICONS[e.stream]} {e.stream}</span>
                    {e.mode && <span>{MODES[e.mode]}</span>}
                  </div>
                  <ol className="ex-tl">
                    {steps.map(([label, d], idx) => (
                      <li key={label} className={`${done[idx] ? 'done' : ''} ${idx === next ? 'next' : ''} ${done[idx + 1] ? 'line' : ''}`}>
                        <small>{label}</small><b>{fmt(d)}</b>
                      </li>
                    ))}
                  </ol>
                  <div className="ex-actions">
                    <a className="ex-btn" href={e.url} target="_blank" rel="noopener noreferrer">View details</a>
                    <a className="ex-btn ghost" href="#alerts">🔔 Get alerts</a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {shown < list.length && <div className="cp-more"><button className="btn" onClick={() => setShown(s => s + PAGE)}>Show more exams</button></div>}
      </div>
    </div>
  );
}