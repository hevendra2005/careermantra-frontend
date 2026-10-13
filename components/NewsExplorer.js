'use client';
import { useEffect, useRef, useState } from 'react';

const CATS = ['All', 'Exams', 'Admissions', 'Colleges', 'Scholarships', 'Placements', 'Updates'];
const GR = {
  Exams: 'linear-gradient(135deg,#1d3bd8,#4f7bff)', Admissions: 'linear-gradient(135deg,#6d2be0,#a478ff)', Colleges: 'linear-gradient(135deg,#0b7a75,#2fc4a0)',
  Scholarships: 'linear-gradient(135deg,#c2410c,#f59e0b)', Placements: 'linear-gradient(135deg,#be185d,#f472b6)', Updates: 'linear-gradient(135deg,#334155,#64748b)',
};
const PAGE = 6;
const fmt = s => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function Thumb({ n, className = '' }) {
  const [bad, setBad] = useState(false);
  const ref = useRef(null);
  // image may fail before React hydrates, so check once on mount too
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setBad(true); }, []);
  return (
    <div className={`nw-thumb ${className}`} style={{ background: GR[n.category] }}>
      <span className="nw-ph">{n.category[0]}</span>
      {!bad && <img ref={ref} src={encodeURI(n.image)} alt="" loading="lazy" onError={() => setBad(true)} />}
    </div>
  );
}

function Share({ n }) {
  const u = encodeURIComponent(n.url), t = encodeURIComponent(n.title);
  return (
    <div className="nw-share" aria-label="Share">
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">WhatsApp</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
    </div>
  );
}

export default function NewsExplorer({ news }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  const featured = sorted.slice(0, 3);
  const trending = sorted.filter(n => n.trending).slice(0, 5);
  const showFeatured = cat === 'All' && !q;
  const filtered = sorted.filter(n => (cat === 'All' || n.category === cat) && (!q || `${n.title} ${n.excerpt}`.toLowerCase().includes(q.toLowerCase())));
  const list = filtered.filter(n => !showFeatured || !featured.includes(n));
  const count = c => (c === 'All' ? news.length : news.filter(n => n.category === c).length);

  const subscribe = e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg('Please enter a valid email address.');
    // TODO (backend): send the email to your API / newsletter provider.
    setMsg('Subscribed. You will get the latest updates.'); setEmail('');
  };

  return (
    <div className="nw">
      {showFeatured && (
        <section className="wrap nw-featured" aria-label="Top stories">
          {featured.map((n, i) => (
            <a key={n.id} className={`nw-card ${i === 0 ? 'big' : ''}`} href={n.url} target="_blank" rel="noopener noreferrer">
              <Thumb n={n} className="bg" />
              <div className="nw-over">
                <span className="nw-tag">{n.category}</span>
                <h2>{n.title}</h2>
                <p>{n.author ? `${n.author} · ` : ''}{fmt(n.date)}</p>
              </div>
            </a>
          ))}
        </section>
      )}

      <div className="wrap nw-bar">
        <div className="nw-tabs" role="tablist" aria-label="Categories">
          {CATS.map(c => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => { setCat(c); setShown(PAGE); }}>{c} <em>{count(c)}</em></button>
          ))}
        </div>
        <label className="nw-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search news" aria-label="Search news" />
        </label>
      </div>

      <div className="wrap nw-body">
        <main>
          <h2 className="nw-h">{showFeatured ? 'Latest news' : `${cat === 'All' ? 'Results' : cat} · ${filtered.length}`}</h2>
          {list.length === 0 && <p className="nw-none">No stories found. Try another category or search term.</p>}
          {list.slice(0, shown).map(n => (
            <article className="nw-row" key={n.id}>
              <a href={n.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"><Thumb n={n} /></a>
              <div>
                <span className="nw-cat">{n.category}</span>
                <h3><a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a></h3>
                {n.excerpt && <p className="nw-ex">{n.excerpt}</p>}
                <div className="nw-meta">
                  <span>{n.author ? `By ${n.author} · ` : ''}{fmt(n.date)}</span>
                  <a className="nw-read" href={n.url} target="_blank" rel="noopener noreferrer">Read more →</a>
                  <Share n={n} />
                </div>
              </div>
            </article>
          ))}
          {shown < list.length && <div className="cp-more"><button className="btn" onClick={() => setShown(s => s + PAGE)}>Load more stories</button></div>}
        </main>

        <aside className="nw-side">
          <section className="nw-box">
            <h3>Trending</h3>
            <ol className="nw-trend">
              {trending.map(n => (
                <li key={n.id}><a href={n.url} target="_blank" rel="noopener noreferrer"><b>{n.title}</b><small>{fmt(n.date)}</small></a></li>
              ))}
            </ol>
          </section>
          <section className="nw-box nw-news">
            <h3>Get exam and admission alerts</h3>
            <p>Deadlines, results and admission updates in your inbox.</p>
            <form onSubmit={subscribe}>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setMsg(''); }} placeholder="Your email address" aria-label="Email address" />
              <button className="btn" type="submit">Subscribe</button>
            </form>
            {msg && <p className="nw-msg" role="status">{msg}</p>}
          </section>
          <section className="nw-box">
            <h3>Useful tools</h3>
            <ul className="nw-links">
              <li><a href="https://careermantra.net/college-predictor/" target="_blank" rel="noopener noreferrer">College Predictor <span>→</span></a></li>
              <li><a href="https://careermantra.net/scholarship-test/" target="_blank" rel="noopener noreferrer">Scholarship Test <span>→</span></a></li>
              <li><a href="https://careermantra.net/education-loan/" target="_blank" rel="noopener noreferrer">Education Loan <span>→</span></a></li>
              <li><a href="https://careermantra.net/student_dashboard/cap" target="_blank" rel="noopener noreferrer">Common Application <span>→</span></a></li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}