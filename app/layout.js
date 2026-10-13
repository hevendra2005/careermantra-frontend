import './globals.css';

export const metadata = {
  title: 'Careermantra – Find your dream college',
  description: 'Compare fees, placements and ratings. Apply to many colleges with one form.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Nunito+Sans:wght@400;600;700&family=Montserrat:wght@400;500&display=swap&family=Newsreader:wght@500;700" />
      </head>
      <body>{children}</body>
    </html>
  );
}
