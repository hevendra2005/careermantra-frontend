'use client';

export function OpenApplication() {
  return (
    <button className="btn sun" type="button" onClick={() => window.dispatchEvent(new CustomEvent('cr-apply', { detail: { title: 'Open application', type: 'General' } }))}>
      Send open application
    </button>
  );
}