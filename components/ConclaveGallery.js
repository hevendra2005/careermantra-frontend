'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const BASE = 'https://careermantra.net/mega-education-conclave/images/';
const SHOTS = [
  ['event-12.jpg', 'Students meeting university delegates at a Career Mantra conclave', 'linear-gradient(135deg,#2f5bff,#8a2be2)'],
  ['event-8.jpg', 'Counselling session at a Career Mantra conclave', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)'],
  ['event-13.jpg', 'Keynote on stage at a Career Mantra conclave', 'linear-gradient(135deg,#0ea5a4,#34d399)'],
  ['event-17.jpg', 'Participants at a Career Mantra conclave', 'linear-gradient(135deg,#f59e0b,#ffc531)'],
];

function Pic({ src, alt, g, ...rest }) {
  const [bad, setBad] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setBad(true); }, []);
  if (bad) return <div className="ev-fallback" style={{ background: g }} role="img" aria-label={alt}><span>🎓</span></div>;
  return <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} {...rest} />;
}

export default function ConclaveGallery() {
  const [open, setOpen] = useState(null);
  const btn = useRef(null);
  const close = useCallback(() => { setOpen(null); btn.current?.focus(); }, []);
  const step = useCallback(d => setOpen(i => (i + d + SHOTS.length) % SHOTS.length), []);

  useEffect(() => {
    if (open === null) return;
    const k = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); };
    document.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [open, close, step]);

  return (
    <>
      <div className="ev-gal">
        {SHOTS.map(([f, alt, g], i) => (
          <button key={f} type="button" className={`ev-shot s${i + 1}`} onClick={e => { btn.current = e.currentTarget; setOpen(i); }} aria-label={`Open photo ${i + 1}: ${alt}`}>
            <Pic src={BASE + f} alt={alt} g={g} />
            <span className="ev-zoom" aria-hidden="true">⤢</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="ev-lb" role="dialog" aria-modal="true" aria-label="Past event photos" onClick={close}>
          <button className="ev-x" type="button" onClick={close} aria-label="Close">✕</button>
          <button className="ev-nav prev" type="button" onClick={e => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
          <figure onClick={e => e.stopPropagation()}>
            <Pic key={open} src={BASE + SHOTS[open][0]} alt={SHOTS[open][1]} g={SHOTS[open][2]} />
            <figcaption>{SHOTS[open][1]} <i>{open + 1}/{SHOTS.length}</i></figcaption>
          </figure>
          <button className="ev-nav next" type="button" onClick={e => { e.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
        </div>
      )}
    </>
  );
}