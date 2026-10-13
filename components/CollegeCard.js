export default function CollegeCard({ c }) {
  return (
    <a className="col" href={c.url} target="_blank" rel="noopener noreferrer">
      <div className="ph">
        {/* <img src={`/campus/${c.slug}.svg`} alt={`${c.name} campus illustration`} /> */}
        <img src={c.image || `/campus/${c.slug}.svg`} alt={`${c.name} campus`} />
        <span className="rt">★ {c.rating}</span>
      </div>
      <div className="b">
        <h3>{c.name}</h3>
        <p>{c.city}, {c.state}</p>
        <div className="kv"><span>Highest package<b>{c.package}</b></span><span>Courses<b>{c.courses.length}+</b></span></div>
      </div>
    </a>
  );
}
