import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ConclaveForm from '@/components/ConclaveForm';
import ConclaveGallery from '@/components/ConclaveGallery';
import Countdown from '@/components/Countdown';
import ev from '@/data/event.json';

export const metadata = {
  title: `Mega MBA Conclave ${ev.edition} – Meet Top Universities | Career Mantra`,
  description: 'Meet top university delegates, get free GD/PI with your dream university, secure a seat on the spot and take the free Scholarship Test worth ₹2 crore at Career Mantra’s Mega MBA Conclave.',
};

const WHATSAPP = `https://wa.me/918800198642?text=${encodeURIComponent(`I want to know more about MBA Conclave ${ev.edition}`)}`;

const I = {
  cal: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.6" /><path d="M17 14a5 5 0 0 1 4.5 5" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  bank: <><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  cert: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M7 9h10M7 12h6" /><path d="M15 17l1 4 2-1.5 2 1.5-1-4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></>,
  grad: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  build: <><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-5h4v5" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></>,
};
const Icon = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true">{I[n]}</svg>;

const big = [
  ['100+', 'Top universities', 'Meet delegates from A++ rated colleges and universities across India.', 'linear-gradient(135deg,#2f5bff,#6d8bff)'],
  ['30+', 'Keynote speakers', 'Hear from leaders and experts and ask your questions in person.', 'linear-gradient(135deg,#8a2be2,#ff4d8d)'],
  ['₹2 Cr', 'Free Scholarship Test', 'Take the test and win up to 100% scholarship.', 'linear-gradient(135deg,#f59e0b,#ff7a3d)'],
];

const highlights = [
  ['users', 'Meet top delegates', 'Talk to A++ delegates of colleges and universities from all over India.', '#2f5bff'],
  ['chat', 'Free GD/PI process', 'Do your group discussion and personal interview with your dream university and interact directly with directors and VPs.', '#8a2be2'],
  ['bank', 'Education loans', 'Leading banks are present to guide you on education loans.', '#0ea5a4'],
  ['help', 'Counselling and doubts', 'Admission counselling and doubt-solving sessions with experts.', '#f59e0b'],
  ['bolt', 'Spot admissions', 'Secure your seat in top colleges on the spot.', '#ff4d8d'],
  ['cert', 'Certificate for everyone', 'Every participant receives a certificate.', '#0284c7'],
];

const who = [
  ['grad', 'MBA/PGDM aspirants', 'Students who want to pursue an MBA or PGDM.'],
  ['book', 'Freshers', 'Freshers who aspire for a professional degree.'],
  ['build', 'Management institutions', 'Institutions that want to meet motivated students.'],
  ['users', 'Universities', 'Universities looking to connect with the right candidates.'],
];

const faqs = [
  ['Who can attend the conclave?', 'Any student who wants to pursue an MBA or PGDM, freshers who aspire for a professional degree, and management institutions and universities.'],
  ['When and where is it happening?', `${ev.when}. ${ev.whenNote}. ${ev.where}. Register and we will share the details with you.`],
  ['Can I get admission at the event?', 'Yes. You can secure a seat in top colleges on the spot.'],
  ['What is the free GD/PI process?', 'You can complete your group discussion and personal interview with your dream university at the event, with direct interaction with directors and VPs.'],
  ['What is the Scholarship Test?', 'A free test worth ₹2 crore of scholarships for students across India. You can win up to 100% scholarship.'],
  ['Will there be help with education loans?', 'Yes. Leading banks join the conclave to guide you on education loans.'],
  ['Do I get a certificate?', 'Yes. Every participant gets a certificate.'],
];

export default function Events() {
  const hasDate = !!ev.date;
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <header className="hero cp-hero-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cp-hero ex-hero">
          <div>
            <p className="cp-crumb"><Link href="/">Home</Link> / Events</p>
            <span className="pill">🎤 Career Mantra’s Mega Education Conclave</span>
            <h1><span className="ev-hi" lang="hi">उड़ान</span> MBA Conclave <span className="hl">{ev.edition}</span></h1>
            <p className="lead">Meet delegates from top universities, secure your seat on the spot and win scholarships worth up to ₹2 crore, all under one roof.</p>
            <div className="sc-ctas">
              <a className="btn sun" href="#register">Register now →</a>
              <a className="btn ghost" href="#highlights">See highlights</a>
            </div>
            <div className="trust"><span>✔ Spot admissions</span><span>✔ Free GD/PI</span><span>✔ Certificate for every participant</span></div>
          </div>
          <div className="art">
            <img src="/events-hero.svg" alt="Conclave stage with a presenter, screen and audience" />
            <div className="chip c1"><b>100+</b><span>Universities<small>Under one roof</small></span></div>
            <div className="chip c2"><b>30+</b><span>Keynote speakers<small>Live on stage</small></span></div>
            <div className="chip c3"><b>₹2 Cr</b><span>Scholarships<small>Free test</small></span></div>
          </div>
        </div>
      </header>

      <div className="ev-ticket-wrap">
        <div className="wrap">
          <div className="ev-ticket">
            <div className="ev-tk"><i><Icon n="cal" /></i><span>When<b>{ev.when}</b><small>{ev.whenNote}</small></span></div>
            <div className="ev-tk"><i><Icon n="pin" /></i><span>Where<b>{ev.where}</b><small>Register to get the details</small></span></div>
            <div className="ev-tk last">
              {hasDate ? <Countdown date={ev.date} /> : <span className="ev-soon">Seats are filling up<small>Register to get the date and venue first</small></span>}
              <a className="btn sun" href="#register">Register now</a>
            </div>
          </div>
        </div>
      </div>

      <main className="wrap">
        <section>
          <div className="head"><h2>The conclave in <span className="or">numbers</span></h2><p>Everything an MBA aspirant needs, in one event.</p></div>
          <div className="ev-big">
            {big.map(([n, l, t, g], i) => (
              <article key={l} style={{ background: g }}>
                <b>{n}</b><h3>{l}</h3><p>{t}</p>
                {i === 2 && <Link href="/scholarship">Know about the test →</Link>}
              </article>
            ))}
          </div>
        </section>

        <section id="highlights">
          <div className="head"><h2>Why you should <span className="or">be there</span></h2><p>Six reasons to attend.</p></div>
          <div className="sc-feats">
            {highlights.map(([icon, title, text, c]) => (
              <article className="sc-feat" key={title} style={{ '--c': c }}>
                <div className="sc-ic2"><Icon n={icon} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="head"><h2>Who can <span className="or">attend</span></h2><p>The conclave is open to students and institutions.</p></div>
          <div className="ev-who">
            {who.map(([icon, t, d]) => (
              <div key={t}><i><Icon n={icon} /></i><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <div className="sch">
          <div>
            <h2>Win up to 100% scholarship</h2>
            <p>Take the free Scholarship Test worth ₹2 crore. Students from across India can attempt it.</p>
            <Link className="btn" href="/scholarship">Take the test</Link>
          </div>
          <img src="/medal.svg" alt="Medal" />
        </div>

        <section>
          <div className="head"><h2>Moments from <span className="or">past conclaves</span></h2><p>Tap a photo to see it larger.</p></div>
          <ConclaveGallery />
        </section>

        <section id="register">
          <div className="sc-reg">
            <div className="sc-pitch">
              <span className="sc-badge">🎤 Mega MBA Conclave {ev.edition}</span>
              <h2>Reserve your seat at the conclave</h2>
              <p>Register once and we will share the date, venue and everything you need to prepare.</p>
              <ul>
                <li><i>✓</i><span>Meet top university delegates</span></li>
                <li><i>✓</i><span>Free GD/PI with your dream university</span></li>
                <li><i>✓</i><span>Spot admissions in top colleges</span></li>
                <li><i>✓</i><span>Certificate for every participant</span></li>
              </ul>
              <div className="sc-pitch-foot">
                <span>Questions before you register?</span>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>
              </div>
            </div>
            <div className="sc-form-wrap"><ConclaveForm /></div>
          </div>
        </section>

        <section>
          <div className="head"><h2>Frequently asked <span className="or">questions</span></h2></div>
          <div className="sc-faq">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        <section>
          <div className="sc-help">
            <div>
              <h2>Need help with registration?</h2>
              <p>Talk to a Career Mantra counsellor. We reply quickly.</p>
              <p className="sc-addr"><svg viewBox="0 0 24 24" aria-hidden="true">{I.pin}</svg>Akash Ganga Apartment, Kailash Vihar Main Rd, City Center, Patel Nagar, Gwalior, Madhya Pradesh – 474002</p>
            </div>
            <div className="sc-help-btns">
              <a className="sc-hb wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9.5 8.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2z" /></svg><span>WhatsApp<small>+91 88001 98642</small></span></a>
              <a className="sc-hb" href="tel:+917773045555"><Icon n="phone" /><span>Call us<small>+91 77730 45555</small></span></a>
              <a className="sc-hb" href="mailto:info@careermantra.net"><Icon n="mail" /><span>Email<small>info@careermantra.net</small></span></a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}