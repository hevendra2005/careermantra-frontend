'use client';
import { useEffect, useId, useRef, useState } from 'react';

// options: [{ value, label, count }]
export default function FilterSelect({ label, value, onChange, options, placeholder = 'All', allLabel = 'All', disabled = false, hint = '', searchable }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const id = useId();
  const showSearch = searchable ?? options.length > 6;

  useEffect(() => {
    if (!open) return;
    const away = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const shown = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
  const pick = v => { onChange(v); setOpen(false); setQuery(''); };

  return (
    <div className={`fs ${value ? 'has' : ''}`} ref={ref} onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
      <span className="fs-label" id={id}>{label}</span>
      <button type="button" className="fs-btn" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} aria-labelledby={id}
        onClick={() => setOpen(o => !o)}>
        <span className={value ? 'v' : 'v ph'}>{value || placeholder}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {value && !disabled && <button type="button" className="fs-clear" aria-label={`Clear ${label}`} onClick={() => pick('')}>✕</button>}
      {hint && disabled && <p className="fs-hint">{hint}</p>}
      {open && (
        <div className="fs-pop">
          {showSearch && <input className="fs-q" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${label.toLowerCase()}`} />}
          <ul role="listbox" aria-label={label}>
            {!query && <li><button type="button" role="option" aria-selected={!value} onClick={() => pick('')}>{allLabel}</button></li>}
            {shown.map(o => (
              <li key={o.value}>
                <button type="button" role="option" aria-selected={value === o.value} disabled={!o.count && value !== o.value} onClick={() => pick(o.value)}>
                  <span>{o.label}</span><em>{o.count}</em>
                </button>
              </li>
            ))}
            {query && !shown.length && <li className="fs-empty">No match</li>}
          </ul>
        </div>
      )}
    </div>
  );
}