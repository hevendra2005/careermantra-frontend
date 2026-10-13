# Careermantra – Frontend (Next.js)

Next.js 14 (App Router) + React 18. No backend needed yet.

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where things are
- `app/page.js` – home page · `app/colleges/page.js` – college list (filters: course, city)
- `components/` – Nav, SearchForm, CollegeCard, LeadForm, Effects
- `data/colleges.json` – sample college data (edit or add colleges here)
- `lib/api.js` – all data access in one place. Swap these two functions for fetch() calls when the backend is ready.
- `app/globals.css` – all styles (colors are CSS variables at the top)
- `public/` – illustrations (hero, medal, campus SVGs). Put real photos here and use them in `CollegeCard.js`.
