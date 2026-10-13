import local from '@/data/colleges.json';

// Frontend-only for now: data comes from data/colleges.json.
// When the backend is ready, replace the bodies below with fetch() calls to your API.

export async function getColleges({ course, city, q } = {}) {
  return local.filter(c =>
    (!course || c.courses.includes(course)) &&
    (!city || c.city.toLowerCase() === city.toLowerCase()) &&
    (!q || c.name.toLowerCase().includes(q.toLowerCase())));
}

export async function submitLead({ name = '', phone = '' }) {
  if (name.trim().length < 2) throw new Error('Enter your name');
  if (!/^[6-9]\d{9}$/.test(phone)) throw new Error('Enter a valid 10 digit mobile number');
  // TODO (backend): await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, { method: 'POST', ... })
  return { ok: true };
}
