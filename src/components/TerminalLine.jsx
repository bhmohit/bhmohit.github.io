import React from 'react';

export default function TerminalLine({ line }) {
  const cls = line.className || undefined;
  if (!line.html && line.className === 'xx') {
    return (
      <pre className={cls}>{line.text}</pre>
    );
  }
  if (line.jsx) {
    return (
      <p className={cls}>{line.jsx}</p>
    );
  }
  return (
    <p className={cls}>{line.text}</p>
  );
}
