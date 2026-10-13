import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import OnlineCourseExplorer from '@/components/OnlineCourseExplorer';
import { HeroSearch, Tiles } from '@/components/CourseHooks';
import data from '@/data/onlineCourses.json';

export const metadata = {
  title: 'Online & Distance Courses – MBA, MCA, BBA, B.Com, BCA | Career Mantra',
  description: 'Explore online and distance UG and PG programs from top universities. Compare MBA, MCA, BBA, B.Com, BCA and more, and talk to a counsellor.',
};

const WHATSAPP = `https://wa.me/919975324074?text=${encodeURIComponent('I want to know more about online courses')}`;
const colors = ['#2f5bff', '#8a2be2', '#ff4d8d', '#0ea5a4', '#f59e0b', '#0284c7'];
const why = [
  ['Flexibility', 'Study at your own pace and fit learning around work or other commitments.', '🕒'],
  ['Accessibility', 'Learn from anywhere with a laptop and an internet connection.', '🌍'],
  ['Affordability', 'Online programs can cost less than on-campus study. Ask us for current fees.', '💰'],
  ['Live and recorded learning', 'Videos, cases and projects, assignments and live sessions from faculty and industry leaders.', '🎥'],
];

export default function OnlineCourses() {
  const unis = Object.values(data.providers);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const first = data.programs[0], second = data.programs[6];
  return (
    <>
      <header className="hero oc-bar-h">
        <div className="dots" />
        <Nav />
        <div className="wrap oc-hero">
          <div className="oc-float l" aria-hidden="true">
            <span className="oc-mono" style={{ background: `linear-gradient(135deg,${data.providers[first.provider].c[0]},${data.providers[first.provider].c[1]})` }}>{data.providers[first.provider].short}</span>
            <b>{first.title.replace(' Degree Programme', '')}</b><small>{first.duration}</small>
          </div>
          <div className="oc-float r" aria-hidden="true">
            <span className="oc-mono" style={{ background: `linear-gradient(135deg,${data.providers[second.provider].c[0]},${data.providers[second.provider].c[1]})` }}>{data.providers[second.provider].short}</span>
            <b>Online MCA</b><small>{second.duration}</small>
          </div>
          <p className="cp-crumb"><Link href="/">Home</Link> / Online Courses</p>
          <h1>Learn from anywhere.<br /><span className="hl">Earn a degree</span> that counts.</h1>
          <p className="lead">The best platform for enhancing your skills. Explore online and distance UG and PG programs from leading universities.</p>
          <HeroSearch suggestions={['MBA', 'MCA', 'BBA', 'B.Com', 'BCA']} />
          <div className="oc-stats">
            <div><b>{data.programs.length}</b><span>Programs</span></div>
            <div><b>{unis.length}</b><span>Universities</span></div>
            <div><b>UG + PG</b><span>Online and distance</span></div>
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="oc-sec">
          <div className="head"><h2>Explore online <span className="or">courses</span></h2><p>Pick a degree to see the programs.</p></div>
          <Tiles tiles={data.tiles} icons={colors} />
        </section>

        <section className="oc-sec">
          <div className="head"><h2>Programs from <span className="or">top universities</span></h2><p>Filter by level, degree or university, then ask for details or the syllabus.</p></div>
          <OnlineCourseExplorer />
        </section>

        <section className="oc-sec">
          <div className="head"><h2>Why study <span className="or">online</span></h2></div>
          <div className="oc-why">
            {why.map(([t, d, e]) => <div key={t}><span aria-hidden="true">{e}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>

        <section className="oc-sec">
          <div className="head"><h2>Our university <span className="or">partners</span></h2><p>Programs on this page are offered by these institutions.</p></div>
          <div className="oc-unis">
            {unis.map(u => (
              <div key={u.name}><span className="oc-mono" style={{ background: `linear-gradient(135deg,${u.c[0]},${u.c[1]})` }}>{u.short}</span><b>{u.name}</b></div>
            ))}
          </div>
        </section>

        <section className="oc-sec">
          <div className="head"><h2>Frequently asked <span className="or">questions</span></h2></div>
          <div className="sc-faq">
            {data.faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        <section className="oc-sec">
          <div className="oc-end">
            <div>
              <h2>Not sure which program to pick?</h2>
              <p>Talk to a Career Mantra counsellor about fees, syllabus and the right university for you.</p>
            </div>
            <div className="oc-end-b">
              <a className="btn sun" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <a className="btn ghost" href="tel:+917773045555">Call +91 77730 45555</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}