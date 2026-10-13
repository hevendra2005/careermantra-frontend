import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScholarshipForm from '@/components/ScholarshipForm';

export const metadata = {
  title: 'Scholarship Test – Win up to 100% Scholarship | Career Mantra',
  description: 'Take the Career Mantra Scholarship Test for UG and PG programs. Secure a top rank and win scholarships in top colleges. Free to attempt, two attempts, downloadable certificate.',
};

const WHATSAPP = `https://wa.me/918800198642?text=${encodeURIComponent('I want to know more about Scholarship Test')}`;

const I = {
  form: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  pencil: <><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H4v2a3 3 0 0 0 3 3M16 6h4v2a3 3 0 0 1-3 3" /><path d="M12 13v4M8 21h8M10 17h4" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" /></>,
  chart: <><path d="M3 21h18" /><path d="M6 21V11M12 21V4M18 21v-7" /></>,
  repeat: <><path d="M17 2l4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></>,
  cert: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M7 9h10M7 12h6" /><path d="M15 17l1 4 2-1.5 2 1.5-1-4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
};
const Icon = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true">{I[n]}</svg>;

const stats = [
  ['2 Cr+', 'Scholarships up for grabs'],
  ['25,000+', 'Students trust Career Mantra'],
  ['Up to 100%', 'Scholarship in top MBA colleges'],
  ['2', 'Attempts for every test'],
];

const steps = [
  ['form', 'Basic details', 'Fill out the registration form and submit it.', 'linear-gradient(135deg,#2f5bff,#6d8bff)'],
  ['target', 'Select your exam', 'Choose the exam you want and fill in the details.', 'linear-gradient(135deg,#8a2be2,#c084fc)'],
  ['pencil', 'Complete your exam', 'Attempt the test online and finish the exam.', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)'],
  ['trophy', 'Get your scholarship', 'Download your certificate. A counsellor helps you redeem your scholarship.', 'linear-gradient(135deg,#0ea5a4,#34d399)'],
];

const features = [
  ['layout', 'Latest exam pattern', 'Questions follow the latest exam pattern, so practice feels like the real thing.', '#2f5bff'],
  ['bulb', 'Fresh questions', 'Every question is created by expert faculty.', '#f59e0b'],
  ['chart', 'Solutions and analysis', 'Get detailed solutions and a performance analysis after the test.', '#8a2be2'],
  ['repeat', 'Two attempts', 'You get two attempts at the test to improve your score.', '#0ea5a4'],
  ['cert', 'Downloadable certificate', 'Download your certificate from the website after you attend the exam.', '#ff4d8d'],
  ['headset', 'Easy redemption', 'A Career Mantra counsellor contacts you to redeem your scholarship.', '#0284c7'],
];

const benefits = [
  ['book', 'Best quality content', 'Content that stays up to date through continuous research.'],
  ['trend', 'Adaptive learning', 'Starts at your current level and takes you higher, step by step.'],
  ['video', 'Expert counselling', 'Personalised video counselling on exams, courses, colleges and career choice.'],
  ['compass', 'College predictors', 'Estimate your chances at course level using domicile, category, gender and more.'],
];

const faqs = [
  ['How do I register for the Scholarship Test?', 'Fill in the registration form on this page, select your exam and start the test.'],
  ['Who can enroll?', 'Any student who is eligible for the exam can enroll.'],
  ['How much scholarship can I win?', 'You can get up to 100% scholarship in top MBA colleges. Secure a top rank to stand a chance to win scholarships.'],
  ['Is the scholarship test free?', 'Yes. The mock test and the scholarship test are free.'],
  ['How many attempts do I get?', 'There are two attempts for the test.'],
  ['Where do I get my certificate?', 'You can download your certificate from the website after you attend the exam.'],
  ['How do I redeem my scholarship?', 'A Career Mantra counsellor will contact you and help you redeem it.'],
];

export default function Scholarship() {
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
            <p className="cp-crumb"><Link href="/">Home</Link> / Scholarship Test</p>
            <h1>Win up to <span className="hl">100%</span> scholarship</h1>
            <p className="lead">Take the Career Mantra Scholarship Test Series for UG and PG programs. Practise free, secure a top rank and unlock scholarships in top colleges.</p>
            <div className="sc-ctas">
              <a className="btn sun" href="#register">Register now →</a>
              <a className="btn ghost" href="#how">How it works</a>
            </div>
            <div className="trust"><span>✔ Free to attempt</span><span>✔ Two attempts</span><span>✔ Certificate included</span></div>
            <p className="sc-note">Up to 100% scholarship applies to top MBA colleges.</p>
          </div>
          <div className="art">
            <img src="/scholarship-hero.svg" alt="Scholarship trophy, certificate and coins" />
            <div className="chip c1"><b>2 Cr+</b><span>Scholarships<small>Up for grabs</small></span></div>
            <div className="chip c2"><b>25,000+</b><span>Students<small>Trust Career Mantra</small></span></div>
            <div className="chip c3"><b>🎓</b><span>UG and PG<small>Programs covered</small></span></div>
          </div>
        </div>
      </header>

      <div className="sc-stats">
        <div className="wrap">
          <div className="sc-statbar">
            {stats.map(([n, l]) => <div className="sc-stat" key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
      </div>

      <main className="wrap">
        <section id="how">
          <div className="head"><h2>How it <span className="or">works</span></h2><p>Four simple steps from registration to scholarship.</p></div>
          <ol className="sc-steps">
            {steps.map(([icon, title, text, g], i) => (
              <li className="sc-step" key={title}>
                <span className="no" aria-hidden="true">0{i + 1}</span>
                <div className="sc-ic" style={{ background: g }}><Icon n={icon} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <div className="head"><h2>Built to help you <span className="or">score higher</span></h2><p>Everything in the test is designed for real exam practice.</p></div>
          <div className="sc-feats">
            {features.map(([icon, title, text, c]) => (
              <article className="sc-feat" key={title} style={{ '--c': c }}>
                <div className="sc-ic2"><Icon n={icon} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="register">
          <div className="sc-reg">
            <div className="sc-pitch">
              <span className="sc-badge">🎓 Scholarship Test</span>
              <h2>Your scholarship starts with one form</h2>
              <p>Register once and attempt the test online. Our counsellors stay with you until you redeem your scholarship.</p>
              <ul>
                <li><i>✓</i><span>Free to register and attempt</span></li>
                <li><i>✓</i><span>Two attempts to improve your rank</span></li>
                <li><i>✓</i><span>Detailed solutions and performance analysis</span></li>
                <li><i>✓</i><span>Certificate you can download</span></li>
              </ul>
              <div className="sc-pitch-foot">
                <span>Questions before you register?</span>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>
              </div>
            </div>
            <div className="sc-form-wrap"><ScholarshipForm /></div>
          </div>
        </section>
      </main>

      <section className="sc-why">
        <div className="wrap">
          <div className="sc-why-in">
            <div>
              <span className="sc-kicker">Why Career Mantra</span>
              <h2>More than a test. A complete admission partner.</h2>
              <p>Practise with quality content, get guided by experts and pick the college that fits you.</p>
              <a className="btn sun" href="https://careermantra.net/college-predictor/" target="_blank" rel="noopener noreferrer">Try the College Predictor</a>
            </div>
            <div className="sc-why-grid">
              {benefits.map(([icon, title, text]) => (
                <div className="sc-ben" key={title}><div><Icon n={icon} /></div><h3>{title}</h3><p>{text}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
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
              <h2>Still have a question?</h2>
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
      </div>

      <Footer />
    </>
  );
}