import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import ExamExplorer from '@/components/ExamExplorer';
import exams from '@/data/exams.json';

export const metadata = {
  title: 'Entrance Exams in India – Dates, Application Form & Alerts | Career Mantra',
  description: 'Exam dates, application forms, results and alerts for MBA, engineering, law and more entrance exams.',
};

export default function Exams() {
  return (
    <>
      <header className="hero cp-hero-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cp-hero ex-hero">
          <div>
            <p className="cp-crumb"><Link href="/">Home</Link> / Exams</p>
            <h1>Entrance exams in <span className="hl">India</span></h1>
            <p className="lead">Exam dates, application forms and results for 2026–2027, all in one place. Never miss a deadline.</p>
          </div>
          <div className="art">
            <img src="/exam-hero.svg" alt="Exam calendar, answer sheet and alarm clock" />
            <div className="chip c1"><b>{exams.length}</b><span>Exams tracked<small>MBA, Law, Engineering and more</small></span></div>
            <div className="chip c2"><b>3</b><span>Key dates<small>Application · Exam · Result</small></span></div>
            <div className="chip c3"><b>🔔</b><span>Free alerts<small>Never miss a deadline</small></span></div>
          </div>
        </div>
      </header>

      <ExamExplorer exams={exams} nowISO={new Date().toISOString()} />

      <section className="wrap" style={{ paddingTop: 60 }}>
        <div className="cta" id="alerts">
          <h2>Get instant exam alerts</h2>
          <p>Application deadlines, exam dates and results straight to you. Our counsellors will call you.</p>
          <LeadForm />
        </div>
      </section>
      <Footer />
    </>
  );
}