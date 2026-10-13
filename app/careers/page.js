import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JobBoard from '@/components/JobBoard';
import { OpenApplication } from '@/components/CareersHooks';
import data from '@/data/jobs.json';

export const metadata = {
  title: 'Careers & Internships at Career Mantra',
  description: 'Join Career Mantra. See open jobs and internships in counselling, technology, content and marketing, and apply online.',
};

export default function Careers() {
  const jobs = data.openings.filter(o => o.type === 'Job');
  const interns = data.openings.filter(o => o.type === 'Internship');
  const WA = `https://wa.me/${data.whatsapp}?text=${encodeURIComponent('I want to know about careers at Career Mantra')}`;
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <>
      <header className="hero cr-bar-h">
        <div className="dots" />
        <Nav />
        <div className="wrap cr-hero">
          <div>
            <p className="cp-crumb"><Link href="/">Home</Link> / Careers</p>
            <span className="pill">🚀 We are hiring</span>
            <h1>Help students choose <span className="hl">better futures</span></h1>
            <p className="lead">Join the Career Mantra team. Work on real projects that help thousands of students find the right college and course.</p>
            <div className="sc-ctas">
              <a className="btn sun" href="#openings">See open roles</a>
              <a className="btn ghost" href="#internships">Internships</a>
            </div>
          </div>
          <div className="cr-peek" aria-label="Open roles">
            <div className="cr-peek-h"><b>{data.openings.length} open roles</b><span>{jobs.length} jobs · {interns.length} internships</span></div>
            {data.openings.slice(0, 4).map(o => (
              <a key={o.id} href="#openings"><span className={`cr-type ${o.type === 'Job' ? 'j' : 'i'}`}>{o.type}</span><b>{o.title}</b><small>{o.location}</small></a>
            ))}
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="cr-sec">
          <div className="head"><h2>Current <span className="or">openings</span></h2><p>Pick a role and apply in two minutes.</p></div>
          <JobBoard />
        </section>

        <section className="cr-sec" id="internships">
          <div className="cr-intern">
            <div>
              <span className="cr-badge">🎓 Internship program</span>
              <h2>Start your career with us</h2>
              <p>Our internships are for students and freshers who want to learn by doing. You work with the team on live projects and build skills you can show.</p>
              <ul>
                {interns.map(i => <li key={i.id}><i>✓</i>{i.title}{i.duration ? ` · ${i.duration}` : ''}</li>)}
              </ul>
              <a className="btn sun" href="#openings">View internships</a>
            </div>
            <div className="cr-steps2">
              <h3>How hiring works</h3>
              <ol>
                {data.steps.map(([t, d], i) => <li key={t}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="cr-sec">
          <div className="head"><h2>What we <span className="or">value</span></h2></div>
          <div className="oc-why">
            {data.values.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>

        <section className="cr-sec">
          <div className="head"><h2>Frequently asked <span className="or">questions</span></h2></div>
          <div className="sc-faq">
            {data.faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        <section className="cr-sec">
          <div className="oc-end">
            <div>
              <h2>Do not see your role?</h2>
              <p>Send an open application with your resume. We keep it and reach out when a suitable role opens.</p>
            </div>
            <div className="oc-end-b">
              <OpenApplication />
              <a className="btn ghost" href={WA} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <a className="cr-mail" href={`mailto:${data.email}`}>{data.email}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}