import Link from 'next/link';
import { footerColumns, footerBrand, footerSocials } from '@/data/footerLinks';

const icons = {
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  WhatsApp: <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9.5 8.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2z" /></>,
  LinkedIn: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
};

function FooterLink({ href, children }) {
  if (!href) return <span>{children}</span>;
  return href.startsWith('/')
    ? <Link href={href}>{children}</Link>
    : <a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>{children}</a>;
}

// Usage: <Footer />   or   <Footer columns={myColumns} brand={myBrand} socials={mySocials} />
export default function Footer({ columns = footerColumns, brand = footerBrand, socials = footerSocials }) {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="ft-logo">
              <b>{brand.short}</b>
              <div><strong>{brand.name}</strong><small>{brand.tagline}</small></div>
            </div>
            <p>{brand.about}</p>
            {brand.branches?.length > 0 && (
              <div className="ft-branches">
                {brand.branches.map(b => (
                  <div key={b.city}>
                    <h5>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                      {b.city}
                    </h5>
                    <p>{b.address}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="ft-social">
              {socials.map(s => (
                <a key={s.name} className={s.name.toLowerCase()} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{icons[s.name]}</svg>
                </a>
              ))}
            </div>
          </div>
          {columns.map(col => (
            <div className="ft-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map(l => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
            </div>
          ))}
        </div>
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Career Mantra · All rights reserved</span>
          <span>{brand.note}</span>
        </div>
      </div>
    </footer>
  );
}