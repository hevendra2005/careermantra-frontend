'use client';
import { useState } from 'react';

export default function PasswordField({ id, label, value, onChange, error, autoComplete, placeholder, meter }) {
  const [show, setShow] = useState(false);
  let score = 0;
  if (meter) {
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score++;
  }
  const label4 = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][value ? score : 0];
  return (
    <div className={`sc-field ${error ? 'bad' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="au-pw">
        <input id={id} type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete}
          placeholder={placeholder} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} />
        <button type="button" onClick={() => setShow(s => !s)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>{show ? 'Hide' : 'Show'}</button>
      </div>
      {meter && value && (
        <div className="au-meter" aria-live="polite"><div>{[1, 2, 3, 4].map(n => <i key={n} className={n <= score ? `on s${score}` : ''} />)}</div><span>{label4}</span></div>
      )}
      {error && <small id={`${id}-e`} role="alert">{error}</small>}
    </div>
  );
}