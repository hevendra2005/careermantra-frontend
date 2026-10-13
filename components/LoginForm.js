'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import PasswordField from '@/components/PasswordField';
import { loginStudent, sendLoginOtp, verifyLoginOtp } from '@/lib/api';

function cleanPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d.length >= 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

export default function LoginForm() {
  const [tab, setTab] = useState('password');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState(['', '', '', '']);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');
  const boxes = useRef([]);
  const clear = k => setErr(e => ({ ...e, [k]: undefined, form: undefined }));

  const switchTab = t => { setTab(t); setErr({}); setSent(false); setDigits(['', '', '', '']); };

  const loginPw = async ev => {
    ev.preventDefault();
    const e = {};
    if (!id.trim()) e.id = 'Enter your email or mobile number.';
    else if (!/^\S+@\S+\.\S+$/.test(id.trim()) && !/^[6-9]\d{9}$/.test(cleanPhone(id.trim()))) e.id = 'Enter a valid email or 10 digit mobile number.';
    if (!pw) e.pw = 'Enter your password.';
    setErr(e);
    const k = Object.keys(e)[0];
    if (k) return document.getElementById(`lg-${k}`)?.focus();
    setBusy(true);
    try { await loginStudent({ id: id.trim(), password: pw }); setDone(id.trim()); }
    catch (x) { setErr({ form: x.message || 'Could not log in. Please try again.' }); }
    setBusy(false);
  };

  const sendOtp = async ev => {
    ev.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) { setErr({ phone: 'Enter a valid 10 digit mobile number.' }); return document.getElementById('lg-phone')?.focus(); }
    setBusy(true);
    try { await sendLoginOtp({ phone }); setSent(true); setErr({}); setTimeout(() => boxes.current[0]?.focus(), 50); }
    catch (x) { setErr({ form: x.message }); }
    setBusy(false);
  };

  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    setDigits(a => a.map((x, k) => (k === i ? d : x))); clear('otp');
    if (d && i < 3) boxes.current[i + 1]?.focus();
  };
  const keyDigit = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 3) boxes.current[i + 1]?.focus();
  };
  const pasteDigits = e => {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (t.length) { e.preventDefault(); setDigits(['', '', '', ''].map((_, k) => t[k] || '')); boxes.current[Math.min(t.length, 3)]?.focus(); }
  };
  const verify = async ev => {
    ev.preventDefault();
    const otp = digits.join('');
    if (otp.length < 4) return setErr({ otp: 'Enter the 4 digit code.' });
    setBusy(true);
    try { await verifyLoginOtp({ phone, otp }); setDone(`+91 ${phone}`); }
    catch (x) { setErr({ otp: x.message }); }
    setBusy(false);
  };

  if (done) {
    return (
      <div className="sc-done" role="status">
        <div className="sc-tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
        <h2>You are logged in</h2>
        <p>Signed in as <b>{done}</b>. Continue where you left off.</p>
        <div className="au-next"><Link className="btn" href="/college-predictor">Predict my colleges</Link><Link className="btn ghost-dark" href="/cap">Common application</Link></div>
      </div>
    );
  }

  return (
    <div>
      <h2>Log in</h2>
      <p className="au-sub">Welcome back. Log in to your student account.</p>
      <div className="au-tabs" role="tablist" aria-label="Login method">
        <button role="tab" aria-selected={tab === 'password'} className={tab === 'password' ? 'on' : ''} onClick={() => switchTab('password')}>Password</button>
        <button role="tab" aria-selected={tab === 'otp'} className={tab === 'otp' ? 'on' : ''} onClick={() => switchTab('otp')}>Mobile OTP</button>
      </div>

      {tab === 'password' ? (
        <form className="sc-form" onSubmit={loginPw} noValidate>
          <div className={`sc-field ${err.id ? 'bad' : ''}`}>
            <label htmlFor="lg-id">Email or mobile number</label>
            <input id="lg-id" value={id} onChange={e => { setId(e.target.value); clear('id'); }} autoComplete="username" placeholder="you@example.com or 10 digit mobile" aria-invalid={!!err.id} />
            {err.id && <small role="alert">{err.id}</small>}
          </div>
          <PasswordField id="lg-pw" label="Password" value={pw} onChange={v => { setPw(v); clear('pw'); }} error={err.pw} autoComplete="current-password" placeholder="Enter your password" />
          <div className="au-line"><label className="sc-check"><input type="checkbox" defaultChecked /><span>Keep me logged in</span></label><a href="#" onClick={e => { e.preventDefault(); switchTab('otp'); }}>Forgot password?</a></div>
          {err.form && <p className="sc-servererr" role="alert">{err.form}</p>}
          <button className="btn sc-submit" type="submit" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
        </form>
      ) : !sent ? (
        <form className="sc-form" onSubmit={sendOtp} noValidate>
          <div className={`sc-field ${err.phone ? 'bad' : ''}`}>
            <label htmlFor="lg-phone">Mobile number</label>
            <div className="au-ph"><span>+91</span><input id="lg-phone" value={phone} onChange={e => { setPhone(cleanPhone(e.target.value)); clear('phone'); }} inputMode="numeric" autoComplete="tel-national" placeholder="10 digit mobile" aria-invalid={!!err.phone} /></div>
            {err.phone && <small role="alert">{err.phone}</small>}
          </div>
          {err.form && <p className="sc-servererr" role="alert">{err.form}</p>}
          <button className="btn sc-submit" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send OTP'}</button>
          <p className="au-hint">We will send a 4 digit code to this number.</p>
        </form>
      ) : (
        <form className="sc-form" onSubmit={verify} noValidate>
          <p className="au-hint left">Enter the 4 digit code sent to <b>+91 {phone}</b>. <button type="button" className="au-link" onClick={() => { setSent(false); setDigits(['', '', '', '']); }}>Change number</button></p>
          <div className={`au-otp ${err.otp ? 'bad' : ''}`} role="group" aria-label="One time password" onPaste={pasteDigits}>
            {digits.map((d, i) => (
              <input key={i} ref={el => (boxes.current[i] = el)} value={d} onChange={e => setDigit(i, e.target.value)} onKeyDown={e => keyDigit(i, e)}
                inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} maxLength={1} aria-label={`Digit ${i + 1}`} />
            ))}
          </div>
          {err.otp && <small className="au-otp-e" role="alert">{err.otp}</small>}
          <button className="btn sc-submit" type="submit" disabled={busy}>{busy ? 'Verifying…' : 'Verify and log in'}</button>
          <p className="au-hint">Did not get the code? <button type="button" className="au-link" onClick={() => sendLoginOtp({ phone })}>Resend code</button></p>
        </form>
      )}
      <p className="au-switch">New to Career Mantra? <Link href="/register">Create a free account</Link></p>
    </div>
  );
}