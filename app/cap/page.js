import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CapWizard from '@/components/CapWizard';
import cap from '@/data/cap.json';

export const metadata = {
  title: 'Common Application Process – One Form, Many Colleges | Career Mantra',
  description: 'Fill one common application and apply to multiple colleges and programs. No separate form for every college. Start with B.Tech, MBA, MBBS, Design or Law.',
};

const WHATSAPP = `https://wa.me/918800198642?text=${encodeURIComponent('I want to know more about the Common Application Process')}`;
const perks = [
  ['Fill your details once', 'Your details go in a single form, not one form per college.'],
  ['Apply to many colleges', 'Choose several institutions and programs in one go.'],
  ['No repeated paperwork', 'Skip the separate application every college would ask for.'],
];

export default function Cap() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cap.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <>
      <header className="hero cap-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cap-hero" id="apply">
          <div className="cap-copy">
            <p className="cp-crumb"><Link href="/">Home</Link> / Common Application Process</p>
            <h1>One form.<br />Every college<br />on your list.</h1>
            <p className="lead">The Common Application Process lets you apply to multiple colleges and programs with a single application.</p>
            <ul className="cap-ticks">
              <li>Fill your details once</li>
              <li>Apply to more than one college</li>
              <li>A counsellor guides every step</li>
            </ul>
          </div>
          <div className="cap-stage">
            <span className="cap-tag">1 form → many colleges</span>
            <CapWizard />
          </div>
        </div>
      </header>

      <main>
        <section className="wrap cap-vs">
          <div className="head"><h2>Stop filling the same form <span className="or">again and again</span></h2><p>A common application replaces many forms with one.</p></div>
          <div className="cap-vs-grid">
            <div className="cap-old" aria-label="Without a common application">
              <h3>Without it</h3>
              <div className="cap-stack">
                {['College A', 'College B', 'College C', 'College D'].map((n, i) => (
                  <div key={n} style={{ '--i': i }}><b>{n}</b><i /><i /><i /></div>
                ))}
              </div>
              <p>A separate form, with the same details, for every college.</p>
            </div>
            <div className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 48 24"><path d="M2 12h40M32 3l11 9-11 9" /></svg></div>
            <div className="cap-new" aria-label="With the common application">
              <h3>With the common application</h3>
              <div className="cap-one"><b>Common form</b><i /><i /><i /><i />
                <div className="cap-chips">{cap.colleges.map(c => <span key={c.id}>{c.short}</span>)}</div>
              </div>
              <p>One form, filled once, reaches all the colleges you choose.</p>
            </div>
          </div>
          <div className="cap-perks">
            {perks.map(([t, d]) => <div key={t}><i>✓</i><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </section>

        <section className="cap-flow">
          <div className="wrap">
            <div className="head"><h2>How the common application <span className="or">works</span></h2><p>Five steps from your first choice to admission.</p></div>
            <ol className="cap-line">
              {cap.steps.map(([t, d], i) => (
                <li key={t} className={i % 2 ? 'r' : ''}>
                  <span className="cap-n" aria-hidden="true">{i + 1}</span>
                  <div className="cap-st"><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wrap">
          <div className="head"><h2>Featured <span className="or">colleges</span></h2><p>Start with these institutions and add more with your counsellor.</p></div>
          <div className="cap-feat">
            {cap.colleges.map(c => (
              <article key={c.id}>
                <span className="cap-mono lg" style={{ background: `linear-gradient(135deg,${c.c[0]},${c.c[1]})` }}>{c.short}</span>
                <h3>{c.name}</h3>
                <p>{c.place}</p>
                <a href="#apply">Apply with one form →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap">
          <div className="head"><h2>Frequently asked <span className="or">questions</span></h2></div>
          <div className="sc-faq">
            {cap.faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        <section className="wrap">
          <div className="cap-end">
            <div>
              <h2>Ready to apply once and be done?</h2>
              <p>Start your common application now, or talk to a counsellor first.</p>
            </div>
            <div className="cap-end-b">
              <a className="btn sun" href="#apply">Start application</a>
              <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <a className="cap-call" href="tel:+917773045555">Call +91 77730 45555</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}