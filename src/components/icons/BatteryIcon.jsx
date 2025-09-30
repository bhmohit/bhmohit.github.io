import React from 'react';

export default function BatteryIcon({ percent = 100, charging = false, ...props }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const width = Math.round((clamped / 100) * 16);
  return (
    <svg width="22" height="16" viewBox="0 0 30 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-label={`Battery ${clamped}%`} {...props}>
      <rect x="2" y="2" width="22" height="12" rx="2" ry="2" />
      <rect x="25" y="5" width="3" height="6" rx="1" />
      <rect x="4" y="4" width={width} height="8" fill="currentColor" stroke="none" />
      {charging ? (
        <path d="M14 5l-3 4h3l-2 4 6-6h-4z" fill="#000" stroke="none" />
      ) : null}
    </svg>
  );
}
