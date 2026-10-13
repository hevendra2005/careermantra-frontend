import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import NewsExplorer from '@/components/NewsExplorer';
import news from '@/data/news.json';

export const metadata = {
  title: 'Latest Education News & Updates | Career Mantra',
  description: 'Exam notifications, college admissions, scholarships and career updates from Career Mantra.',
};

const fmt = s => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function News() {
  const latest = [...news].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  const ticker = latest.slice(0, 6);
  return (
    <>
      <header className="hero nw-hero">
        <Nav />
        <div className="wrap nw-mast">
          <p className="nw-kicker">Career Mantra · News desk</p>
          <h1>Education news <em>&amp; updates</em></h1>
          <p className="lead">Exam notifications, admissions, scholarships and campus updates, written to help you decide with confidence.</p>
          <p className="nw-stat">{news.length} stories · Last updated {fmt(latest[0].date)}</p>
        </div>
      </header>
      <div className="nw-ticker" aria-label="Breaking news">
        <span>Breaking</span>
        <div><div className="nw-run">{[...ticker, ...ticker].map((n, i) => <a key={i} href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a>)}</div></div>
      </div>
      <NewsExplorer news={news} />
      <Footer />
    </>
  );
}