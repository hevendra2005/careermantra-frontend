'use client';
import { useRouter } from 'next/navigation';

const courses = ['MBA', 'B.Tech', 'MBBS', 'Law', 'Design', 'BBA'];
const cities = ['Delhi-NCR', 'Noida', 'Greater Noida', 'Jalandhar', 'Ahmedabad', 'Chandigarh'];

export default function SearchForm() {
  const router = useRouter();
  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    router.push(`/colleges?course=${encodeURIComponent(f.get('course'))}&city=${encodeURIComponent(f.get('city'))}`);
  };
  return (
    <form className="finder" onSubmit={submit}>
      <label><small>Course</small>
        <select name="course">{courses.map(c => <option key={c}>{c}</option>)}</select></label>
      <label><small>City</small>
        <select name="city"><option value="">All cities</option>{cities.map(c => <option key={c}>{c}</option>)}</select></label>
      <button className="btn sun" type="submit">Search</button>
    </form>
  );
}
