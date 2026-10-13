'use client';
import { useEffect, useState } from 'react';

const pad = n => String(Math.max(0, n)).padStart(2, '0');

// Renders only when a valid future date is passed (ISO string, e.g. "2026-11-21T10:00:00+05:30").
export default function Countdown({ date }) {
  const target = date ? new Date(date).getTime() : NaN;
  const [left, setLeft] = useState(null); // null on server + first paint -> no hydration mismatch

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (Number.isNaN(target)) return null;
  const done = left !== null && left <= 0;
  const s = left === null ? null : Math.floor(left / 1000);
  const parts = [
    ['Days', s === null ? '--' : pad(Math.floor(s / 86400))],
    ['Hours', s === null ? '--' : pad(Math.floor((s % 86400) / 3600))],
    ['Mins', s === null ? '--' : pad(Math.floor((s % 3600) / 60))],
    ['Secs', s === null ? '--' : pad(s % 60)],
  ];
  if (done) return <p className="ev-live">The conclave is on now!</p>;
  return (
    <div className="ev-count" role="timer" aria-label="Time left for the conclave">
      {parts.map(([l, v]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
    </div>
  );
}