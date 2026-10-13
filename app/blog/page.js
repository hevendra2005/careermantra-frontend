import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogExplorer from '@/components/BlogExplorer';
import posts from '@/data/blog.json';

export const metadata = {
  title: 'Career Mantra Blog – College Guides, Admissions & Placements',
  description: 'Read college guides, admission 2026 updates, fees and placement details for MBA, PGDM, design and more from the Career Mantra team.',
};

export default function Blog() {
  const cats = new Set(posts.map(p => p.category)).size;
  return (
    <>
      <header className="hero cp-hero-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cp-hero ex-hero">
          <div>
            <p className="cp-crumb"><Link href="/">Home</Link> / Blog</p>
            <span className="pill">✍️ The Career Mantra Blog</span>
            <h1>Guides that help you pick the <span className="hl">right college</span></h1>
            <p className="lead">College guides, admission 2026 updates, fees and placement details, written by the Career Mantra team.</p>
            <div className="sc-ctas">
              <a className="btn sun" href="#articles">Read latest articles</a>
              <Link className="btn ghost" href="/colleges">Explore colleges</Link>
            </div>
            <div className="trust"><span>✔ Admission 2026 guides</span><span>✔ Fees and placements</span><span>✔ Free to read</span></div>
          </div>
          <div className="art">
            <img src="/blog-hero.svg" alt="Articles, magnifier and graduation cap" />
            <div className="chip c1"><b>{posts.length}</b><span>Articles<small>Latest on this page</small></span></div>
            <div className="chip c2"><b>{cats}</b><span>Topics<small>MBA, PGDM, Design</small></span></div>
            <div className="chip c3"><b>🎓</b><span>2026 batch<small>Admission updates</small></span></div>
          </div>
        </div>
      </header>
      <div id="articles" className="bg-anchor" />
      <BlogExplorer posts={posts} />
      <Footer />
    </>
  );
}