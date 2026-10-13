import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ReviewExplorer from '@/components/ReviewExplorer';
import { overall } from '@/components/Stars';
import reviews from '@/data/reviews.json';
import colleges from '@/data/colleges.json';

export const metadata = {
  title: 'College Reviews by Students | Career Mantra',
  description: 'Read student reviews on campus life, internships and placements, and share your own experience.',
};

export default function Reviews() {
  const avg = reviews.reduce((s, r) => s + overall(r), 0) / reviews.length;
  const reviewed = new Set(reviews.map(r => r.college)).size;
  return (
    <>
      <header className="hero cp-hero-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cp-hero ex-hero">
          <div>
            <p className="cp-crumb"><Link href="/">Home</Link> / Reviews</p>
            <h1>College reviews from <span className="hl">students</span></h1>
            <p className="lead">Read honest experiences on campus life, internships and placements, then share your own.</p>
          </div>
          <div className="art">
            <img src="/reviews-hero.svg" alt="Student review cards with star ratings" />
            <div className="chip c1"><b>{avg.toFixed(1)}</b><span>Average rating<small>Across {reviews.length} reviews</small></span></div>
            <div className="chip c2"><b>{reviewed}</b><span>Colleges reviewed<small>Campus, placements and more</small></span></div>
            <div className="chip c3"><b>💬</b><span>Student voices<small>Share your experience</small></span></div>
          </div>
        </div>
      </header>
      <ReviewExplorer reviews={reviews} colleges={colleges} />
      <Footer />
    </>
  );
}