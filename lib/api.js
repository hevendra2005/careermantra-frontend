// import local from '@/data/colleges.json';

// // Frontend-only for now: data comes from data/colleges.json.
// // When the backend is ready, replace the bodies below with fetch() calls to your API.

// export async function getColleges({ course, city, q } = {}) {
//   return local.filter(c =>
//     (!course || c.courses.includes(course)) &&
//     (!city || c.city.toLowerCase() === city.toLowerCase()) &&
//     (!q || c.name.toLowerCase().includes(q.toLowerCase())));
// }

// export async function submitLead({ name = '', phone = '' }) {
//   if (name.trim().length < 2) throw new Error('Enter your name');
//   if (!/^[6-9]\d{9}$/.test(phone)) throw new Error('Enter a valid 10 digit mobile number');
//   // TODO (backend): await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, { method: 'POST', ... })
//   return { ok: true };
// }


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

// ---- Student account (frontend-only for now) ----
// TODO (backend): replace the bodies with real calls, e.g. POST /api/auth/login, /api/auth/register, /api/auth/otp/send, /api/auth/otp/verify.
// Never store passwords in the browser. Use an httpOnly cookie session from your server.
export async function loginStudent({ id = '', password = '' }) {
  if (!id.trim() || !password) throw new Error('Enter your email or mobile number and password');
  return { ok: true };
}
export async function sendLoginOtp({ phone = '' }) {
  if (!/^[6-9]\d{9}$/.test(phone)) throw new Error('Enter a valid 10 digit mobile number');
  return { ok: true };
}
export async function verifyLoginOtp({ phone = '', otp = '' }) {
  if (!/^[6-9]\d{9}$/.test(phone) || !/^\d{4}$/.test(otp)) throw new Error('Enter the 4 digit code');
  return { ok: true };
}
export async function registerStudent({ name = '', phone = '', email = '', password = '' }) {
  if (name.trim().length < 2) throw new Error('Enter your name');
  if (!/^[6-9]\d{9}$/.test(phone)) throw new Error('Enter a valid 10 digit mobile number');
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address');
  if (password.length < 8) throw new Error('Password must be at least 8 characters');
  return { ok: true };
}