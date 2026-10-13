// 'use client';
// import Link from 'next/link';

// export default function Nav() {
//   const toggle = () => {
//     const r = document.documentElement;
//     const dark = r.getAttribute('data-theme') === 'dark' ||
//       (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
//     r.setAttribute('data-theme', dark ? 'light' : 'dark');
//   };
//   return (
//     <nav><div className="wrap">
//       <Link className="logo" href="/"><i>C</i>Careermantra</Link>
//       <div className="links">
//         <Link href="/colleges">Colleges</Link>
//         <a href="https://careermantra.net/exams/">Exams</a>
//         <a href="https://careermantra.net/college-predictor/">Predictor</a>
//         <a href="https://careermantra.net/scholarship-test/">Scholarship</a>
//         <a href="https://careermantra.net/blog/">Blog</a>
//       </div>
//       <div className="tools">
//         <button className="btn ghost" id="theme" onClick={toggle} aria-label="Toggle dark mode">🌓</button>
//         <a className="btn sun" href="/#apply">Apply free</a>
//       </div>
//     </div></nav>
//   );
// }
// 'use client';
// import Link from 'next/link';

// // [label, href, showNewBadge]
// const topLinks = [
//   ['Colleges', '/colleges'],
//   ['Exams', 'https://careermantra.net/exams/', true],
//   ['Reviews', '#'],
//   ['News', 'https://careermantra.net/news.php'],
//   ['Apply for Scholarship', 'https://careermantra.net/scholarship-test/'],
//   ['Events', 'https://careermantra.net/mega-education-conclave/'],
//   ['Blog', 'https://careermantra.net/blog/'],
//   ['Common Application Process', 'https://careermantra.net/student_dashboard/cap'],
//   ['Online Courses', 'https://careermantra.net/online-courses.php'],
//   ['College Predictor', 'https://careermantra.net/college-predictor/'],
// ];
// const courses = ['B.Tech', 'MBA', 'MBBS', 'Design', 'Law'];

// function TopLink({ href, children }) {
//   return href.startsWith('/')
//     ? <Link href={href}>{children}</Link>
//     : <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>{children}</a>;
// }

// export default function Nav() {
//   const toggle = () => {
//     const r = document.documentElement;
//     const dark = r.getAttribute('data-theme') === 'dark' ||
//       (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
//     r.setAttribute('data-theme', dark ? 'light' : 'dark');
//   };
//   return (
//     <header className="sh">
//       <div className="sh-top">
//         <div className="sh-in" role="navigation" aria-label="Main menu">
//           {topLinks.map(([label, href, isNew]) => (
//             <TopLink key={label} href={href}>{label}{isNew && <span className="new">NEW</span>}</TopLink>
//           ))}
//         </div>
//       </div>
//       <div className="sh-main">
//         <div className="sh-pill">
//           <Link className="sh-brand" href="/">
//             <b>CM</b>
//             <span><strong>CAREER MANTRA</strong><small>Unlock hidden potential</small></span>
//           </Link>
//           <div className="sh-courses" role="navigation" aria-label="Courses">
//             {courses.map(c => <Link key={c} href={`/colleges?course=${encodeURIComponent(c)}`}>{c}</Link>)}
//           </div>
//           <button className="sh-theme" onClick={toggle} aria-label="Toggle dark mode">🌓</button>
//           <a className="sh-cta" href="/#interest">Choose Your Interest</a>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';
import Link from 'next/link';


const topLinks = [
  ['Colleges', '/colleges'],
  ['Exams', '/exams', true],
  ['Reviews', '/reviews'],
  ['News', '/news'],
  ['Apply for Scholarship', '/scholarship'],
  ['Events', '/events'],
  ['Blog', '/blog'],
  ['Common Application Process', '/cap'],
  ['Online Courses', '/online-courses'],
  ['College Predictor', '/college-predictor'],
  // ['Careers', '/careers'],
];
// Put your real profile links here (replace '#').
const socials = [
  { name: 'Instagram', href: '#', cls: 'ig', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { name: 'Facebook', href: '#', cls: 'fb', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
  { name: 'LinkedIn', href: '#', cls: 'in', icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
  { name: 'WhatsApp', href: '#', cls: 'wa', icon: <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9.5 8.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2z" /></> },
];
const courses = ['B.Tech', 'MBA', 'MBBS', 'Design', 'Law'];

function TopLink({ href, children }) {
  return href.startsWith('/')
    ? <Link href={href}>{children}</Link>
    : <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>{children}</a>;
}

export default function Nav() {
  const toggle = () => {
    const r = document.documentElement;
    const dark = r.getAttribute('data-theme') === 'dark' ||
      (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    r.setAttribute('data-theme', dark ? 'light' : 'dark');
  };
  return (
    <header className="sh">
      <div className="sh-top">
        <div className="sh-in" role="navigation" aria-label="Main menu">
          {topLinks.map(([label, href, isNew]) => (
            <TopLink key={label} href={href}>{label}{isNew && <span className="new">NEW</span>}</TopLink>
          ))}
          <div className="sh-social">
            {socials.map(s => (
              <a key={s.name} className={s.cls} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="sh-main">
        <div className="sh-pill">
          <Link className="sh-brand" href="/">
            <b>CM</b>
            <span><strong>CAREER MANTRA</strong><small>Unlock hidden potential</small></span>
          </Link>
          <div className="sh-courses" role="navigation" aria-label="Courses">
            {courses.map(c => <Link key={c} href={`/colleges?course=${encodeURIComponent(c)}`}>{c}</Link>)}
          </div>
          <button className="sh-theme" onClick={toggle} aria-label="Toggle dark mode">🌓</button>
          <a className="sh-login" href="/login">Login</a>
          <a className="sh-cta" href="/#interest">Choose Your Interest</a>
        </div>
      </div>
    </header>
  );
}