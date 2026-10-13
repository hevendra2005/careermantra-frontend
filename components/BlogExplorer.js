'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const CATS = ['All', 'MBA Colleges', 'PGDM Colleges', 'Design Colleges', 'University Guides'];
const GR = {
  'MBA Colleges': ['#1d3bd8', '#6d8bff'],
  'PGDM Colleges': ['#6d2be0', '#c084fc'],
  'Design Colleges': ['#be185d', '#ff8a5c'],
  'University Guides': ['#0b7a75', '#34d399'],
};
const IC = {
  'MBA Colleges': <><path d="M3 20h18" /><path d="M6 20V10M12 20V4M18 20v-7" /></>,
  'PGDM Colleges': <><path d="M4 7h16v12H4z" /><path d="M9 7V5h6v2M4 12h16" /></>,
  'Design Colleges': <><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" /></>,
  'University Guides': <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>,
};
const PAGE = 9;

function Cover({ p, className = '' }) {
  const [a, b] = GR[p.category];
  return (
    <div className={`bg-cover ${className}`} style={{ background: `linear-gradient(135deg,${a},${b})` }} aria-hidden="true">
      <svg viewBox="0 0 24 24">{IC[p.category]}</svg>
      <span>{p.cover}</span>
    </div>
  );
}

export default function BlogExplorer({ posts }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const [shown, setShown] = useState(PAGE);

  const topTags = useMemo(() => {
    const c = {};
    posts.forEach(p => p.tags.forEach(t => { const k = t.toLowerCase(); c[k] = c[k] || { t, n: 0 }; c[k].n++; }));
    return Object.values(c).sort((x, y) => y.n - x.n).slice(0, 10);
  }, [posts]);

  const filtered = posts.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (!tag || p.tags.some(t => t.toLowerCase() === tag.toLowerCase())) &&
    (!q || `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())));
  const plain = cat === 'All' && !q && !tag;
  const feat = plain ? posts[1] : null; // a design-colleges guide as the lead story
  const list = filtered.filter(p => p !== feat);
  const count = c => (c === 'All' ? posts.length : posts.filter(p => p.category === c).length);
  const reset = () => { setCat('All'); setQ(''); setTag(''); setShown(PAGE); };

  return (
    <div className="wrap bg">
      <div className="bg-bar">
        <div className="bg-tabs" role="tablist" aria-label="Categories">
          {CATS.map(c => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => { setCat(c); setShown(PAGE); }}>{c} <em>{count(c)}</em></button>
          ))}
        </div>
        <label className="bg-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search articles" aria-label="Search articles" />
        </label>
      </div>

      <div className="bg-body">
        <main>
          {feat && (
            <a className="bg-feat" href={feat.url} target="_blank" rel="noopener noreferrer">
              <Cover p={feat} className="big" />
              <div>
                <span className="bg-pill">Featured guide</span>
                <h2>{feat.title}</h2>
                <p>{feat.excerpt}</p>
                <span className="bg-go">Read article →</span>
              </div>
            </a>
          )}

          <div className="bg-head">
            <h2>{plain ? 'Latest articles' : `${filtered.length} article${filtered.length === 1 ? '' : 's'} found`}</h2>
            {tag && <button type="button" className="bg-clear" onClick={() => setTag('')}>Topic: {tag} ✕</button>}
          </div>

          {list.length === 0 && (
            <div className="bg-none"><p>No articles match your search.</p><button className="btn" type="button" onClick={reset}>Clear filters</button></div>
          )}
          <div className="bg-grid">
            {list.slice(0, shown).map(p => (
              <article className="bg-post" key={p.id}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.title}><Cover p={p} /></a>
                <div className="bg-pb">
                  <span className="bg-cat" style={{ color: GR[p.category][0] }}>{p.category}</span>
                  <h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
                  <p>{p.excerpt}</p>
                  <div className="bg-meta"><span><i>CM</i>{p.author}</span><a href={p.url} target="_blank" rel="noopener noreferrer">Read →</a></div>
                </div>
              </article>
            ))}
          </div>
          {list.length > shown && (
            <div className="bg-more"><button className="btn ghost-dark" type="button" onClick={() => setShown(s => s + PAGE)}>Show more articles</button></div>
          )}
          <div className="bg-archive">
            <p>Looking for older articles? The full archive is on our main blog.</p>
            <a className="btn" href="https://careermantra.net/blog/page/2/" target="_blank" rel="noopener noreferrer">Browse the full archive</a>
          </div>
        </main>

        <aside className="bg-side">
          <div className="bg-box">
            <h3>Latest posts</h3>
            <ol>
              {posts.slice(0, 5).map(p => (
                <li key={p.id}><a href={p.url} target="_blank" rel="noopener noreferrer"><b>{p.title}</b><small>{p.category}</small></a></li>
              ))}
            </ol>
          </div>
          <div className="bg-box">
            <h3>Popular topics</h3>
            <div className="bg-tags">
              {topTags.map(({ t, n }) => (
                <button type="button" key={t} className={tag.toLowerCase() === t.toLowerCase() ? 'on' : ''} onClick={() => { setTag(tag.toLowerCase() === t.toLowerCase() ? '' : t); setShown(PAGE); }}>{t} <em>{n}</em></button>
              ))}
            </div>
          </div>
          <div className="bg-cta">
            <h3>Not sure which college fits you?</h3>
            <p>Compare colleges, fees and placements, or talk to a counsellor.</p>
            <Link className="btn sun" href="/colleges">Explore colleges</Link>
            <Link className="bg-cta-l" href="/scholarship">Win up to 100% scholarship →</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}