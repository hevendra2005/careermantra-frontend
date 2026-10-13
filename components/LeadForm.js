'use client';
import { useState } from 'react';
import { submitLead } from '@/lib/api';

export default function LeadForm() {
  const [msg, setMsg] = useState('');
  const submit = async e => {
    e.preventDefault();
    const form = e.target;
    try {
      await submitLead(Object.fromEntries(new FormData(form)));
      form.reset();
      setMsg('Thank you! Our counsellor will call you soon.');
    } catch (err) {
      setMsg(err.message);
    }
  };
  return (
    <>
      <form className="lead" onSubmit={submit}>
        <input name="name" placeholder="Your name" required />
        <input name="phone" placeholder="Mobile number" inputMode="numeric" maxLength={10} required />
        <select name="course"><option>MBA</option><option>B.Tech</option><option>MBBS</option><option>Law</option><option>Design</option><option>BBA</option></select>
        <button className="btn sun" type="submit">Get free counselling</button>
      </form>
      {msg && <p className="msg" role="status">{msg}</p>}
    </>
  );
}
