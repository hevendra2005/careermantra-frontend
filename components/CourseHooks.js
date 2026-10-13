'use client';
import { useState } from 'react';

const go = (name, detail) => {
  window.dispatchEvent(new CustomEvent(name, { detail }));
  document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export function HeroSearch({ suggestions }) {
  const [q, setQ] = useState('');
  const submit = e => { e.preventDefault(); go('oc-search', q.trim()); };
  return (
    <>
      <form className="oc-hs" onSubmit={submit} role="search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search MBA, MCA, BCA or a university" aria-label="Search online programs" />
        <button className="btn sun" type="submit">Search</button>
      </form>
      <div className="oc-sug">
        <span>Popular:</span>
        {suggestions.map(s => <button type="button" key={s} onClick={() => { setQ(s); go('oc-search', s); }}>{s}</button>)}
      </div>
    </>
  );
}

export function Tiles({ tiles, icons }) {
  return (
    <div className="oc-tiles">
      {tiles.map(([label, deg, mode], i) => (
        <button type="button" key={label} onClick={() => go('oc-tile', deg)} style={{ '--c': icons[i % icons.length] }}>
          <span className="oc-ti"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg></span>
          <b>{label}</b>
          <small>{mode} · tap to see programs</small>
        </button>
      ))}
    </div>
  );
}