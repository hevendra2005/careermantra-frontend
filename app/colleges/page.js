import Link from 'next/link';
import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CollegeExplorer from '@/components/CollegeExplorer';
import { getColleges } from '@/lib/api';

export const metadata = { title: 'Colleges – Careermantra', description: 'Compare ratings, placements and courses of top colleges.' };

export default async function Colleges() {
  const colleges = await getColleges();
  return (
    <>
      <header className="hero cp-hero-bar">
        <div className="dots" />
        <Nav />
        <div className="wrap cp-hero">
          <p className="cp-crumb"><Link href="/">Home</Link> / Colleges</p>
          <h1>Find your perfect <span className="hl">college</span></h1>
          <p className="lead">Compare ratings, placements and courses of {colleges.length}+ colleges. Apply to many with one form.</p>
        </div>
      </header>
      <Suspense fallback={null}>
        <CollegeExplorer colleges={colleges} />
      </Suspense>
      <Footer />
    </>
  );
}
