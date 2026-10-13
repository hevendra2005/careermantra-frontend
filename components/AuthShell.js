import Link from 'next/link';

const perks = {
  login: {
    title: 'Welcome back to Career Mantra',
    text: 'Pick up where you left off. Your shortlist, applications and counsellor chats are waiting.',
    rows: [['Shortlisted colleges', 'Saved from the predictor and college pages'], ['Common application', 'Track the colleges you applied to'], ['Scholarship test', 'Attempt it and download your certificate'], ['Counsellor support', 'Talk to an expert any time']],
  },
  register: {
    title: 'Create your free student account',
    text: 'One account for colleges, exams, scholarships and your common application.',
    rows: [['Predict your colleges', 'Safe, Moderate and Ambitious matches'], ['Apply once', 'One common form for many colleges'], ['Win a scholarship', 'Take the free Scholarship Test'], ['Expert guidance', 'A counsellor helps you at every step']],
  },
};

export default function AuthShell({ mode, children }) {
  const p = perks[mode];
  return (
    <div className="au">
      <aside className="au-side" aria-hidden={false}>
        <div className="au-dots" />
        <Link className="au-brand" href="/"><b>CM</b><span><strong>CAREER MANTRA</strong><small>Unlock hidden potential</small></span></Link>
        <div className="au-copy">
          <h1>{p.title}</h1>
          <p>{p.text}</p>
        </div>
        <div className="au-mock" aria-hidden="true">
          <div className="au-mock-h"><i /><i /><i /><span>Student dashboard</span></div>
          {p.rows.map(([t, d], k) => (
            <div className="au-row" key={t} style={{ '--k': k }}>
              <span className="au-ok">✓</span>
              <div><b>{t}</b><small>{d}</small></div>
            </div>
          ))}
        </div>
        <p className="au-foot">Trusted by students across India</p>
      </aside>
      <main className="au-main">
        <div className="au-top">
          <Link href="/" className="au-back">← Back to home</Link>
          <span>{mode === 'login' ? <>New here? <Link href="/register">Create account</Link></> : <>Already registered? <Link href="/login">Log in</Link></>}</span>
        </div>
        <div className="au-card">{children}</div>
        <p className="au-legal">By continuing you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>.</p>
      </main>
    </div>
  );
}