import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PredictorTool from '@/components/PredictorTool';
import P from '@/data/predictor.json';

export const metadata = {
  title: 'College Predictor | Find Your Best Fit College | Career Mantra',
  description: 'Select your course and exams, enter your scores and see Safe, Moderate and Ambitious colleges matched to your scores, category and home state.',
};

const steps = [
  ['Select a course', 'Choose B.Tech, MBA, Medical, M.Tech, Design or Law.'],
  ['Select exams', 'Pick every exam you have taken for that course.'],
  ['Enter scores', 'Add your percentile for each exam.'],
  ['Finish', 'Share your details and see your matched colleges.'],
];
const WHATSAPP = `https://wa.me/918800198642?text=${encodeURIComponent('I want help with the College Predictor')}`;

export default function CollegePredictor() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: P.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <>
      <header className="hero pr-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap pr-hero">
          <p className="cp-crumb"><Link href="/">Home</Link> / College Predictor</p>
          <h1>College <span className="hl">Predictor</span></h1>
          <p className="lead">Find colleges matched to your scores, preferences and career goals. Four quick steps, no guesswork.</p>
          <div className="trust">{P.features.map(([t]) => <span key={t}>✔ {t}</span>)}</div>
        </div>
      </header>

      <main className="wrap">
        <PredictorTool />

        <section className="pr-sec">
          <div className="head"><h2>Why use the <span className="or">College Predictor</span></h2></div>
          <div className="oc-why pr-feat">
            {P.features.map(([t, d, e]) => <div key={t}><span aria-hidden="true">{e}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>

        <section className="pr-sec">
          <div className="head"><h2>How the predictor <span className="or">works</span></h2><p>Four quick steps from course to colleges.</p></div>
          <ol className="pr-steps">
            {steps.map(([t, d], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </section>

        <section className="pr-sec">
          <div className="head"><h2>Frequently asked <span className="or">questions</span></h2></div>
          <div className="sc-faq">
            {P.faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        <section className="pr-sec">
          <div className="oc-end">
            <div>
              <h2>Want a counsellor to read the result with you?</h2>
              <p>Get help choosing between colleges, checking fees and planning your applications.</p>
            </div>
            <div className="oc-end-b">
              <Link className="btn sun" href="/cap">Start common application</Link>
              <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}