'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterSelect from '@/components/FilterSelect';

const ICONS = { MBA: '💼', 'B.Tech': '💻', MBBS: '🩺', Law: '⚖️', Design: '🎨', BBA: '📈' };
const lpa = s => (/cr/i.test(s) ? parseFloat(s) * 100 : parseFloat(s)); // "2.5 Cr" -> 250
const PAGE = 6;
const SORTS = {
  rating: (a, b) => b.rating - a.rating,
  package: (a, b) => lpa(b.package) - lpa(a.package),
  name: (a, b) => a.name.localeCompare(b.name),
};

const ok = (c, f) =>
  (!f.state || c.state === f.state) && (!f.city || c.city === f.city) && (!f.course || c.courses.includes(f.course)) &&
  (!f.spec || (c.specializations?.[f.course] || []).includes(f.spec)) && c.rating >= (f.minRating || 0) &&
  (!f.q || `${c.name} ${c.city} ${c.state}`.toLowerCase().includes(f.q.toLowerCase()));

export default function CollegeExplorer({ colleges }) {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [stateSel, setStateSel] = useState(sp.get('state') || '');
  const [city, setCity] = useState(sp.get('city') || '');
  const [course, setCourse] = useState(sp.get('course') || '');
  const [spec, setSpec] = useState(sp.get('spec') || '');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('rating');
  const [shown, setShown] = useState(PAGE);
  const [saved, setSaved] = useState([]);
  const [open, setOpen] = useState(false);

  const f = { state: stateSel, city, course, spec, minRating, q };
  // counts are "faceted": each dropdown counts results ignoring its own filter
  const pool = ex => colleges.filter(c => ok(c, { ...f, [ex]: ex === 'minRating' ? 0 : '' }));
  const sorted = a => [...new Set(a)].sort((x, y) => x.localeCompare(y));

  const stateOpts = sorted(colleges.map(c => c.state)).map(v => ({ value: v, label: v, count: pool('state').filter(c => c.state === v).length }));
  const cityOpts = sorted(colleges.filter(c => !stateSel || c.state === stateSel).map(c => c.city)).map(v => ({ value: v, label: v, count: pool('city').filter(c => c.city === v).length }));
  const courseList = [...new Set(colleges.flatMap(c => c.courses))];
  const courseOpts = courseList.map(v => ({ value: v, label: v, count: pool('course').filter(c => c.courses.includes(v)).length }));
  const specOpts = !course ? [] : sorted(colleges.flatMap(c => c.specializations?.[course] || []))
    .map(v => ({ value: v, label: v, count: pool('spec').filter(c => (c.specializations?.[course] || []).includes(v)).length }));

  const changeState = v => { setStateSel(v); if (v && city && !colleges.some(c => c.state === v && c.city === city)) setCity(''); };
  const changeCity = v => { setCity(v); const st = colleges.find(c => c.city === v)?.state; if (v && st) setStateSel(st); };
  const changeCourse = v => { setCourse(v); setSpec(''); };

  useEffect(() => {
    const p = new URLSearchParams();
    [['q', q], ['state', stateSel], ['city', city], ['course', course], ['spec', spec]].forEach(([k, v]) => v && p.set(k, v));
    const str = p.toString();
    window.history.replaceState(null, '', str ? `?${str}` : window.location.pathname);
    setShown(PAGE);
  }, [q, stateSel, city, course, spec, minRating, sort]);

  const list = colleges.filter(c => ok(c, f)).sort(SORTS[sort]);

  const active = [stateSel && ['state', stateSel], city && ['city', city], course && ['course', course], spec && ['spec', spec],
    minRating && ['rating', `${minRating}+ rating`], q && ['q', `“${q}”`]].filter(Boolean);
  const clear = () => { setQ(''); setStateSel(''); setCity(''); setCourse(''); setSpec(''); setMinRating(0); };
  const drop = k => ({ state: () => setStateSel(''), city: () => setCity(''), course: () => changeCourse(''), spec: () => setSpec(''), rating: () => setMinRating(0), q: () => setQ('') })[k]();
  const toggleSave = slug => setSaved(s => (s.includes(slug) ? s.filter(x => x !== slug) : [...s, slug]));
  const sig = `${q}|${stateSel}|${city}|${course}|${spec}|${minRating}|${sort}`;

  return (
    <div className="cp">
      <div className="wrap cp-searchwrap">
        <div className="cp-search">
          <label>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search college, city or state" aria-label="Search colleges" />
          </label>
          <button className="cp-filter-btn btn" onClick={() => setOpen(o => !o)}>Filters{active.length ? ` (${active.length})` : ''}</button>
        </div>
      </div>

      <div className="wrap cp-tabs" role="tablist" aria-label="Courses">
        <button className={!course ? 'on' : ''} onClick={() => changeCourse('')}>🎓 All <em>{colleges.length}</em></button>
        {courseList.map(c => (
          <button key={c} className={course === c ? 'on' : ''} onClick={() => changeCourse(course === c ? '' : c)}>
            {ICONS[c] || '📘'} {c} <em>{colleges.filter(x => x.courses.includes(c)).length}</em>
          </button>
        ))}
      </div>

      <div className="wrap cp-body">
        <aside className={`cp-filters ${open ? 'open' : ''}`}>
          <h3>Filters <button onClick={clear}>Clear all</button></h3>
          <FilterSelect label="State" value={stateSel} onChange={changeState} options={stateOpts} placeholder="All states" allLabel="All states" />
          <FilterSelect label="City" value={city} onChange={changeCity} options={cityOpts} placeholder="All cities" allLabel="All cities" />
          <FilterSelect label="Course" value={course} onChange={changeCourse} options={courseOpts} placeholder="All courses" allLabel="All courses" />
          <FilterSelect label="Specialization" value={spec} onChange={setSpec} options={specOpts} placeholder={course ? 'All specializations' : 'Select a course first'}
            allLabel="All specializations" disabled={!course} hint="Choose a course to see its specializations" />
          <div className="cp-group">
            <h4>Student rating</h4>
            <div className="cp-chips">
              {[[0, 'Any'], [8, '8+'], [9, '9+']].map(([v, l]) => (
                <button key={v} className={minRating === v ? 'on' : ''} onClick={() => setMinRating(v)}>{v ? '★ ' : ''}{l}</button>
              ))}
            </div>
          </div>
          <div className="cp-group">
            <h4>Sort by</h4>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rating">Top rated</option>
              <option value="package">Highest package</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </aside>

        <div className="cp-results">
          <div className="cp-top">
            <b>{list.length} {list.length === 1 ? 'college' : 'colleges'} found</b>
            <div className="cp-active">
              {active.map(([k, label]) => <button key={k} onClick={() => drop(k)}>{label} ✕</button>)}
            </div>
          </div>

          {list.length === 0 ? (
            <div className="cp-empty">
              <span>🔍</span>
              <h3>No colleges found</h3>
              <p>Try a different course or city, or clear the filters.</p>
              <button className="btn" onClick={clear}>Clear all filters</button>
            </div>
          ) : (
            <div key={sig}>
              {list.slice(0, shown).map((c, i) => (
                <article className="cr" key={c.slug} style={{ '--i': i }}>
                  <div className="cr-img">
                    <img src={c.image || `/campus/${c.slug}.svg`} alt={`${c.name} campus`} />
                    <span className="cr-rate">★ {c.rating}</span>
                    <button className="cr-save" onClick={() => toggleSave(c.slug)} aria-label="Save college" aria-pressed={saved.includes(c.slug)}>
                      {saved.includes(c.slug) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="cr-main">
                    <div className="cr-tags">
                      {c.rating >= 9 && <span className="cr-tag top">★ Top rated</span>}
                      {c.placementVerified !== false && <span className="cr-tag">✔ Placement verified</span>}
                    </div>
                    <h3>{c.name}</h3>
                    <p className="cr-loc">📍 {c.city}, {c.state}</p>
                    <div className="cr-pills">
                      {c.courses.slice(0, 4).map(x => <em key={x}>{x}</em>)}
                      {c.courses.length > 4 && <em>+{c.courses.length - 4}</em>}
                    </div>
                    <div className="cr-stats">
                      <div><small>Highest package</small><b>{c.package}</b></div>
                      <div><small>Student rating</small><b>{c.rating}/10</b></div>
                      <div><small>Courses</small><b>{c.courses.length}</b></div>
                    </div>
                  </div>
                  <div className="cr-actions">
                    <a className="cr-apply" href={c.url} target="_blank" rel="noopener noreferrer">Apply now</a>
                    <a className="cr-view" href={c.url} target="_blank" rel="noopener noreferrer">View details</a>
                  </div>
                </article>
              ))}
              {shown < list.length && (
                <div className="cp-more"><button className="btn" onClick={() => setShown(s => s + PAGE)}>Show more colleges</button></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}