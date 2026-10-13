// import Link from 'next/link';
// import Nav from '@/components/Nav';
// import Footer from '@/components/Footer';
// import Effects from '@/components/Effects';
// import SearchForm from '@/components/SearchForm';
// import CollegeCard from '@/components/CollegeCard';
// import LeadForm from '@/components/LeadForm';
// import { getColleges } from '@/lib/api';

// const exams = ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAT', 'CMAT', 'ATMA', 'IIFT', 'JEE Main', 'NEET', 'CLAT', 'NIFT'];
// const tiles = [
//   ['MBA', '💼', 'linear-gradient(135deg,#2f5bff,#6d8bff)'], ['B.Tech', '💻', 'linear-gradient(135deg,#8a2be2,#c084fc)'],
//   ['MBBS', '🩺', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)'], ['Law', '⚖️', 'linear-gradient(135deg,#0ea5a4,#34d399)'],
//   ['Design', '🎨', 'linear-gradient(135deg,#f59e0b,#fbbf24)'], ['BBA', '📈', 'linear-gradient(135deg,#0284c7,#38bdf8)'],
// ];
// const why = [
//   ['📝', '#2f5bff22', 'One form, many colleges', 'Fill the common application once and apply to every college on your list.'],
//   ['🎯', '#ff4d8d22', 'College predictor', 'Enter your score and see which colleges you can get into.'],
//   ['💬', '#ffc53144', 'Free counselling', 'Talk to a counsellor and get clear answers on fees and placements.'],
// ];

// export default async function Home() {
//   const colleges = await getColleges();
//   return (
//     <>
//       <Effects />
//       <header className="hero">
//         <div className="dots" />
//         <Nav />
//         <div className="wrap">
//           <div>
//             <span className="pill">🎓 Up to 100% scholarship on top colleges</span>
//             <h1>Find your <span className="hl">dream college</span> in minutes</h1>
//             <p className="lead">Compare fees, placements and ratings. Apply to many colleges with one simple form.</p>
//             <SearchForm />
//             <div className="trust"><span>✔ Free counselling</span><span>✔ One common form</span><span>✔ Verified colleges</span></div>
//           </div>
//           <div className="art">
//             <img src="/hero.svg" alt="Graduate student in front of a university building" />
//             <div className="chip c1"><b>9.5</b><span>Top student rating<small>Lovely Professional University</small></span></div>
//             <div className="chip c2"><b>2.5 Cr</b><span>Highest package<small>MBA placements</small></span></div>
//             <div className="chip c3"><b>100%</b><span>Scholarship<small>Through the scholarship test</small></span></div>
//           </div>
//         </div>
//         <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40C240 80 480 0 720 25s480 55 720 5V70H0z" fill="var(--bg)" /></svg>
//       </header>

//       <div className="marq" aria-hidden="true"><div className="track">{[...exams, ...exams].map((x, i) => <span key={i}>{x}</span>)}</div></div>

//       <main className="wrap">
//         <section className="rv">
//           <div className="head"><h2>What do you want to study?</h2><p>Pick a course and see the best colleges for it.</p></div>
//           <div className="grid tiles">
//             {tiles.map(([name, icon, bg]) => (
//               <Link key={name} className="tile" style={{ background: bg, color: name === 'Design' ? '#2a1500' : undefined }} href={`/colleges?course=${encodeURIComponent(name)}`}><s>{icon}</s>{name}</Link>
//             ))}
//           </div>
//         </section>

//         <section className="rv">
//           <div className="head"><h2>Colleges students love</h2><p>Top rated for teaching and placements.</p></div>
//           <div className="grid g3">{colleges.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
//         </section>

//         <div className="sch rv">
//           <div><h2>Win up to 100% scholarship</h2><p>Take the scholarship test, score well and cut your UG or PG fees.</p><a className="btn" href="https://careermantra.net/scholarship-test/">Take the test</a></div>
//           <img src="/medal.svg" alt="100% scholarship medal" />
//         </div>

//         <section className="rv">
//           <div className="head"><h2>Admission made simple</h2><p>Everything you need, without visiting ten websites.</p></div>
//           <div className="grid why">
//             {why.map(([icon, bg, title, text]) => (
//               <div className="w" key={title}><div className="i" style={{ background: bg }}>{icon}</div><h3>{title}</h3><p>{text}</p></div>
//             ))}
//           </div>
//           <div className="cta" id="apply">
//             <h2>Ready to find your college?</h2>
//             <p>Share your details and get a free call from our counsellor.</p>
//             <LeadForm />
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
    
//   );
  
// }
// import Link from 'next/link';
// import Nav from '@/components/Nav';
// import Footer from '@/components/Footer';
// import Effects from '@/components/Effects';
// import SearchForm from '@/components/SearchForm';
// import CollegeCard from '@/components/CollegeCard';
// import LeadForm from '@/components/LeadForm';
// import { getColleges } from '@/lib/api';

// const exams = ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAT', 'CMAT', 'ATMA', 'IIFT', 'JEE Main', 'NEET', 'CLAT', 'NIFT'];
// const tiles = [
//   ['MBA', '💼', 'linear-gradient(135deg,#2f5bff,#6d8bff)'], ['B.Tech', '💻', 'linear-gradient(135deg,#8a2be2,#c084fc)'],
//   ['MBBS', '🩺', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)'], ['Law', '⚖️', 'linear-gradient(135deg,#0ea5a4,#34d399)'],
//   ['Design', '🎨', 'linear-gradient(135deg,#f59e0b,#fbbf24)'], ['BBA', '📈', 'linear-gradient(135deg,#0284c7,#38bdf8)'],
// ];
// const CITY_IMG_EXT = 'webp'; // change to 'jpg' after you put real photos in public/cities/
// const favCities = [['Pune', 'Pune'], ['Mumbai', 'Mumbai'], ['Delhi', 'Delhi-NCR'], ['Bangalore', 'Bangalore'], ['Chennai', 'Chennai'], ['Hyderabad', 'Hyderabad'], ['Kolkata', 'Kolkata'], ['Ahmedabad', 'Ahmedabad']]; // [label, value used in the filter]
// const helpdesk = [
//   ['📝', 'Common Application', 'Fill one form and apply to many colleges.', 'https://careermantra.net/student_dashboard/cap'],
//   ['💳', 'Education Loan', 'Get help to fund your course.', 'https://careermantra.net/education-loan/'],
//   ['⚖️', 'Compare College', 'Compare fees, placements and ratings side by side.', 'https://careermantra.net/compare_colleges/'],
//   ['🎯', 'College Predictor', 'See which colleges match your score.', 'https://careermantra.net/college-predictor/'],
//   ['🎓', 'Scholarship Test', 'Score well and win up to 100% scholarship.', 'https://careermantra.net/scholarship-test/'],
//   ['🔁', 'Re-Admission', 'Switch colleges with guided support.', 'https://careermantra.net/re-admission/'],
// ];
// // Fill real dates in `date` when you have them.
// const upcomingExams = [
//   { name: 'CAT', type: 'MBA', date: '' }, { name: 'XAT', type: 'MBA', date: '' }, { name: 'SNAP', type: 'MBA', date: '' },
//   { name: 'NMAT', type: 'MBA', date: '' }, { name: 'CMAT', type: 'MBA', date: '' }, { name: 'MAT', type: 'MBA', date: '' },
// ];
// const lpa = s => (/cr/i.test(s) ? parseFloat(s) * 100 : parseFloat(s)); // "2.5 Cr" -> 250, "62 LPA" -> 62

// function Head({ title, sub }) {
//   return <div className="head"><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
// }

// export default async function Home() {
//   const colleges = await getColleges();
//   const byPlacement = [...colleges].sort((a, b) => lpa(b.package) - lpa(a.package)).slice(0, 3);
//   const studentChoice = [...colleges].sort((a, b) => b.rating - a.rating).slice(0, 3);
//   const applyOpen = colleges.filter(c => c.applicationsOpen !== false);   // set "applicationsOpen": false in colleges.json to hide
//   const verified = colleges.filter(c => c.placementVerified !== false);   // set "placementVerified": false to hide

//   return (
//     <>
//       <Effects />
//       <header className="hero">
//         <div className="dots" />
//         <Nav />
//         <div className="wrap">
//           <div>
//             <span className="pill">🎓 Up to 100% scholarship on top colleges</span>
//             <h1>Find your <span className="hl">dream college</span> in minutes</h1>
//             <p className="lead">Compare fees, placements and ratings. Apply to many colleges with one simple form.</p>
//             <SearchForm />
//             <div className="trust"><span>✔ Free counselling</span><span>✔ One common form</span><span>✔ Verified colleges</span></div>
//           </div>
//           <div className="art">
//             <img src="/hero.svg" alt="Graduate student in front of a university building" />
//             <div className="chip c1"><b>9.5</b><span>Top student rating<small>Lovely Professional University</small></span></div>
//             <div className="chip c2"><b>2.5 Cr</b><span>Highest package<small>MBA placements</small></span></div>
//             <div className="chip c3"><b>100%</b><span>Scholarship<small>Through the scholarship test</small></span></div>
//           </div>
//         </div>
//         <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40C240 80 480 0 720 25s480 55 720 5V70H0z" fill="var(--bg)" /></svg>
//       </header>

//       <div className="marq" aria-hidden="true"><div className="track">{[...exams, ...exams].map((x, i) => <span key={i}>{x}</span>)}</div></div>

//       <main className="wrap">
//         {/* <section className="rv" id="interest">
//           <Head title="What do you want to study?" sub="Pick a course and see the best colleges for it." />
//           <div className="grid tiles">
//             {tiles.map(([name, icon, bg]) => (
//               <Link key={name} className="tile" style={{ background: bg, color: name === 'Design' ? '#2a1500' : undefined }} href={`/colleges?course=${encodeURIComponent(name)}`}><s>{icon}</s>{name}</Link>
//             ))}
//           </div>
//         </section> */}

//         {/* 1. Choose Your Favourite City */}
//         <section className="rv">
//           <div className="head"><h2>Choose Your Favourite <span className="or">City</span></h2></div>
//           <div className="favs">
//             {favCities.map(([label, value]) => (
//               <Link key={label} className="fav" href={`/colleges?city=${encodeURIComponent(value)}`}>
//                 <img src={`/cities/${label.toLowerCase()}.${CITY_IMG_EXT}`} alt={label} />
//                 <span>{label}</span>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* 2. Student's Help Desk */}
//         <section className="rv">
//           <Head title="Student's Help Desk" sub="Everything you need for your admission, in one place." />
//           <div className="grid help">
//             {helpdesk.map(([icon, title, text, href]) => (
//               <a key={title} className="hd" href={href} target="_blank" rel="noopener noreferrer">
//                 <i>{icon}</i><div><h3>{title}</h3><p>{text}</p></div>
//               </a>
//             ))}
//           </div>
//         </section>

//         {/* 3. Best Placement Wise Universities */}
//         <section className="rv">
//           <Head title="Best Placement Wise Universities" sub="Ranked by highest package." />
//           <div className="grid g3">{byPlacement.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
//         </section>

//         {/* 4. Applications Open For Universities 2026 Batch */}
//         <section className="rv">
//           <Head title="Applications Open For Universities 2026 Batch" sub="Apply now before seats fill up." />
//           <div className="apply-list">
//             {applyOpen.map(c => (
//               <div className="apply" key={c.slug}>
//                 <div>
//                   <span className="open">Applications open · 2026 batch</span>
//                   <h3>{c.name}</h3><p>{c.city}, {c.state}</p>
//                   <div className="pills">{c.courses.map(x => <em key={x}>{x}</em>)}</div>
//                 </div>
//                 <a className="btn" href={c.url} target="_blank" rel="noopener noreferrer">Apply now</a>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 5. Student Choice Colleges */}
//         <section className="rv">
//           <Head title="Student Choice Colleges" sub="Highest rated by students." />
//           <div className="grid g3">{studentChoice.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
//         </section>

//         {/* 6. Top Colleges / Universities */}
//         <section className="rv">
//           <Head title="Top Colleges / Universities" sub="Top rated for teaching and placements." />
//           <div className="grid g3">{colleges.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
//         </section>

//         {/* 7. Placement verified Colleges */}
//         <section className="rv">
//           <Head title="Placement Verified Colleges" sub="Placement figures checked by our team." />
//           <div className="grid g3">
//             {verified.map(c => (
//               <a key={c.slug} className="pv" href={c.url} target="_blank" rel="noopener noreferrer">
//                 <span className="ok">✔ Placement verified</span>
//                 <h3>{c.name}</h3><p>{c.city}, {c.state}</p>
//                 <div className="pk"><b>{c.package}</b><small>Highest package</small></div>
//               </a>
//             ))}
//           </div>
//         </section>

//         {/* 8. Upcoming Exams */}
//         <section className="rv">
//           <Head title="Upcoming Exams" sub="Stay ready for your entrance exams." />
//           <div className="grid exams">
//             {upcomingExams.map(e => (
//               <div className="ex" key={e.name}>
//                 <span className="tag">{e.type}</span>
//                 <h3>{e.name}</h3>
//                 <p>{e.date || 'Dates to be announced'}</p>
//                 <a className="btn line" href="https://careermantra.net/exams/" target="_blank" rel="noopener noreferrer">View details</a>
//               </div>
//             ))}
//           </div>
//         </section>

//         <div className="sch rv">
//           <div><h2>Win up to 100% scholarship</h2><p>Take the scholarship test, score well and cut your UG or PG fees.</p><a className="btn" href="https://careermantra.net/scholarship-test/">Take the test</a></div>
//           <img src="/medal.svg" alt="100% scholarship medal" />
//         </div>

//         {/* <section className="rv">
//           <div className="cta" id="apply">
//             <h2>Ready to find your college?</h2>
//             <p>Share your details and get a free call from our counsellor.</p>
//             <LeadForm />
//           </div>
//         </section> */}
//       </main>
//       <Footer />
//     </>
//   );
// }

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import SearchForm from '@/components/SearchForm';
import CollegeCard from '@/components/CollegeCard';
// import LeadForm from '@/components/LeadForm';
import { getColleges } from '@/lib/api';

const exams = ['CAT', 'XAT', 'SNAP', 'NMAT', 'MAT', 'CMAT', 'ATMA', 'IIFT', 'JEE Main', 'NEET', 'CLAT', 'NIFT'];
const tiles = [
  ['MBA', '💼', 'linear-gradient(135deg,#2f5bff,#6d8bff)'], ['B.Tech', '💻', 'linear-gradient(135deg,#8a2be2,#c084fc)'],
  ['MBBS', '🩺', 'linear-gradient(135deg,#ff4d8d,#ff8a5c)'], ['Law', '⚖️', 'linear-gradient(135deg,#0ea5a4,#34d399)'],
  ['Design', '🎨', 'linear-gradient(135deg,#f59e0b,#fbbf24)'], ['BBA', '📈', 'linear-gradient(135deg,#0284c7,#38bdf8)'],
];
const CITY_IMG_EXT = 'webp'; // change to 'jpg' after you put real photos in public/cities/
const favCities = [['Pune', 'Pune'], ['Mumbai', 'Mumbai'], ['Delhi', 'Delhi-NCR'], ['Bangalore', 'Bangalore'], ['Chennai', 'Chennai'], ['Hyderabad', 'Hyderabad'], ['Kolkata', 'Kolkata'], ['Ahmedabad', 'Ahmedabad']]; // [label, value used in the filter]
const helpIcons = {
  doc: <><path d="M14 10h14l6 6v22H14z" /><path d="M28 10v6h6" /><path d="M19 22h10M19 27h7" /><path d="M26 36l12-12 3 3-12 12-4 1z" /></>,
  checklist: <><rect x="12" y="9" width="24" height="30" rx="2" /><path d="M17 17h3M23 17h8M17 24h3M23 24h8M17 31h3M23 31h5" /><path d="M28 38l11-11 3 3-11 11-4 1z" /></>,
  campus: <><path d="M24 7l11 5-11 5-11-5z" /><path d="M17 14v4a7 3 0 0 0 14 0v-4" /><rect x="12" y="22" width="24" height="18" /><path d="M17 27h2M23 27h2M29 27h2M17 33h2M23 33h2M29 33h2M22 40v-4h4v4" /></>,
  predictor: <><rect x="11" y="9" width="12" height="16" rx="1" /><rect x="25" y="9" width="12" height="16" rx="1" /><path d="M14 14h6M14 18h6M28 14h6M28 18h6" /><circle cx="24" cy="31" r="6" /><path d="M28.5 35.5L35 42" /></>,
  loan: <><path d="M13 9h16l4 4v22H13z" /><path d="M17 17h10M17 22h10" /><rect x="22" y="28" width="16" height="11" rx="2" /><path d="M22 32h16" /></>,
  institution: <><path d="M24 8l16 8H8z" /><path d="M12 19v14M19 19v14M29 19v14M36 19v14" /><path d="M9 36h30v4H9z" /><path d="M20 27l3 3 5-6" /></>,
};
// [icon, title, short text, link]
const helpdesk = [
  ['doc', 'Common Application Process', 'Apply Multiple Colleges Using ...', 'https://careermantra.net/student_dashboard/cap'],
  ['checklist', 'Scholarship Test', 'Get upto 100% UG & PG Scholarship', 'https://careermantra.net/scholarship-test/'],
  ['campus', 'Campus Rockstar', 'Earn More, Shine Brighter ...', '#'],
  ['predictor', 'College Predictor', 'Your personalized guide to ...', 'https://careermantra.net/college-predictor/'],
  ['loan', 'Education Loan', 'Empowering Dreams, Fueling ...', 'https://careermantra.net/education-loan/'],
  ['institution', 'Re-Admissions', 'College readmission services ...', 'https://careermantra.net/re-admission/'],
];
// Fill real dates in `date` when you have them.
const upcomingExams = [
  { name: 'CAT', type: 'MBA', date: '' }, { name: 'XAT', type: 'MBA', date: '' }, { name: 'SNAP', type: 'MBA', date: '' },
  { name: 'NMAT', type: 'MBA', date: '' }, { name: 'CMAT', type: 'MBA', date: '' }, { name: 'MAT', type: 'MBA', date: '' },
];
const lpa = s => (/cr/i.test(s) ? parseFloat(s) * 100 : parseFloat(s)); // "2.5 Cr" -> 250, "62 LPA" -> 62

function Head({ title, sub }) {
  return <div className="head"><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

export default async function Home() {
  const colleges = await getColleges();
  const byPlacement = [...colleges].sort((a, b) => lpa(b.package) - lpa(a.package)).slice(0, 3);
  const studentChoice = [...colleges].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const applyOpen = colleges.filter(c => c.applicationsOpen !== false);   // set "applicationsOpen": false in colleges.json to hide
  const verified = colleges.filter(c => c.placementVerified !== false);   // set "placementVerified": false to hide

  return (
    <>
      <Effects />
      <header className="hero">
        <div className="dots" />
        <Nav />
        <div className="wrap">
          <div>
            <span className="pill">🎓 Up to 100% scholarship on top colleges</span>
            <h1>Find your <span className="hl">dream college</span> in minutes</h1>
            <p className="lead">Compare fees, placements and ratings. Apply to many colleges with one simple form.</p>
            <SearchForm />
            <div className="trust"><span>✔ Free counselling</span><span>✔ One common form</span><span>✔ Verified colleges</span></div>
          </div>
          <div className="art">
            <img src="/hero.svg" alt="Graduate student in front of a university building" />
            <div className="chip c1"><b>9.5</b><span>Top student rating<small>Lovely Professional University</small></span></div>
            <div className="chip c2"><b>2.5 Cr</b><span>Highest package<small>MBA placements</small></span></div>
            <div className="chip c3"><b>100%</b><span>Scholarship<small>Through the scholarship test</small></span></div>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40C240 80 480 0 720 25s480 55 720 5V70H0z" fill="var(--bg)" /></svg>
      </header>

      <div className="marq" aria-hidden="true"><div className="track">{[...exams, ...exams].map((x, i) => <span key={i}>{x}</span>)}</div></div>

      <main className="wrap">
        {/* <section className="rv" id="interest">
          <Head title="What do you want to study?" sub="Pick a course and see the best colleges for it." />
          <div className="grid tiles">
            {tiles.map(([name, icon, bg]) => (
              <Link key={name} className="tile" style={{ background: bg, color: name === 'Design' ? '#2a1500' : undefined }} href={`/colleges?course=${encodeURIComponent(name)}`}><s>{icon}</s>{name}</Link>
            ))}
          </div>
        </section> */}

        {/* 1. Choose Your Favourite City */}
        <section className="rv">
          <div className="head"><h2>Choose Your Favourite <span className="or">City</span></h2></div>
          <div className="favs">
            {favCities.map(([label, value]) => (
              <Link key={label} className="fav" href={`/colleges?city=${encodeURIComponent(value)}`}>
                <img src={`/cities/${label.toLowerCase()}.${CITY_IMG_EXT}`} alt={label} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Student's Help Desk */}
        <section className="rv">
          <div className="head"><h2>{"Student's"} <span className="or">Help Desk</span></h2></div>
          <div className="hdgrid">
            {helpdesk.map(([icon, title, text, href]) => (
              <a key={title} className="hdc" href={href} target="_blank" rel="noopener noreferrer">
                <i><svg viewBox="0 0 48 48" aria-hidden="true">{helpIcons[icon]}</svg></i>
                <div><h3>{title}</h3><p>{text}</p><span className="reg">Register Now →</span></div>
              </a>
            ))}
          </div>
        </section>

        {/* 3. Best Placement Wise Universities */}
        <section className="rv">
          <Head title="Best Placement Wise Universities" sub="Ranked by highest package." />
          <div className="grid g3">{byPlacement.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
        </section>

        {/* 4. Applications Open For Universities 2026 Batch */}
        <section className="rv">
          <Head title="Applications Open For Universities 2026 Batch" sub="Apply now before seats fill up." />
          <div className="apply-list">
            {applyOpen.map(c => (
              <div className="apply" key={c.slug}>
                <div>
                  <span className="open">Applications open · 2026 batch</span>
                  <h3>{c.name}</h3><p>{c.city}, {c.state}</p>
                  <div className="pills">{c.courses.map(x => <em key={x}>{x}</em>)}</div>
                </div>
                <a className="btn" href={c.url} target="_blank" rel="noopener noreferrer">Apply now</a>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Student Choice Colleges */}
        <section className="rv">
          <Head title="Student Choice Colleges" sub="Highest rated by students." />
          <div className="grid g3">{studentChoice.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
        </section>

        {/* 6. Top Colleges / Universities */}
        <section className="rv">
          <Head title="Top Colleges / Universities" sub="Top rated for teaching and placements." />
          <div className="grid g3">{colleges.map(c => <CollegeCard key={c.slug} c={c} />)}</div>
        </section>

        {/* 7. Placement verified Colleges */}
        <section className="rv">
          <Head title="Placement Verified Colleges" sub="Placement figures checked by our team." />
          <div className="grid g3">
            {verified.map(c => (
              <a key={c.slug} className="pv" href={c.url} target="_blank" rel="noopener noreferrer">
                <span className="ok">✔ Placement verified</span>
                <h3>{c.name}</h3><p>{c.city}, {c.state}</p>
                <div className="pk"><b>{c.package}</b><small>Highest package</small></div>
              </a>
            ))}
          </div>
        </section>

        {/* 8. Upcoming Exams */}
        <section className="rv">
          <Head title="Upcoming Exams" sub="Stay ready for your entrance exams." />
          <div className="grid exams">
            {upcomingExams.map(e => (
              <div className="ex" key={e.name}>
                <span className="tag">{e.type}</span>
                <h3>{e.name}</h3>
                <p>{e.date || 'Dates to be announced'}</p>
                <a className="btn line" href="https://careermantra.net/exams/" target="_blank" rel="noopener noreferrer">View details</a>
              </div>
            ))}
          </div>
        </section>

        <div className="sch rv">
          <div><h2>Win up to 100% scholarship</h2><p>Take the scholarship test, score well and cut your UG or PG fees.</p><a className="btn" href="https://careermantra.net/scholarship-test/">Take the test</a></div>
          <img src="/medal.svg" alt="100% scholarship medal" />
        </div>

        {/* <section className="rv">
          <div className="cta" id="apply">
            <h2>Ready to find your college?</h2>
            <p>Share your details and get a free call from our counsellor.</p>
            <LeadForm />
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}