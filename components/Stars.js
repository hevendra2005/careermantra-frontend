export const CATS = [
  ['infrastructure', 'Infrastructure'], ['placements', 'Placements'], ['academics', 'Academics'],
  ['value', 'Value for money'], ['campus', 'Campus life'],
];
export const overall = r => CATS.reduce((s, [k]) => s + r.ratings[k], 0) / CATS.length;

export default function Stars({ value }) {
  return <span className="stars" style={{ '--v': value }} role="img" aria-label={`${value.toFixed(1)} out of 5`}>★★★★★</span>;
}