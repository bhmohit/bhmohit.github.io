import { useEffect, useState } from 'react';
import WifiIcon from './icons/WifiIcon.jsx';
import BatteryIcon from './icons/BatteryIcon.jsx';

function formatNow(compact = false) {
  const now = new Date();
  if (compact) {
    return now.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  const date = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const time = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${date} ${time}`;
}

export default function MacHeader({ leftLabel = 'bhmohit', title = 'Terminal' }) {
  const [isCompact, setIsCompact] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 480 : false));
  const [label, setLabel] = useState(formatNow(isCompact));

  // Update clock every second, respecting compact mode
  useEffect(() => {
    const id = setInterval(() => setLabel(formatNow(isCompact)), 1000);
    return () => clearInterval(id);
  }, [isCompact]);

  // Listen for window resizes to switch between full and compact clock
  useEffect(() => {
    function onResize() {
      const compactNow = window.innerWidth <= 480;
      setIsCompact(compactNow);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="mac-header">
      <div className="mac-header__content">
        <div className="mac-header__left" title={leftLabel}>{leftLabel}</div>
        <div className="mac-header__center" aria-hidden>{title}</div>
        <div className="mac-header__right" aria-live="polite">
          <div className="mac-status">
            <WifiIcon className="mac-icon mac-wifi" />
            <BatteryIcon className="mac-icon mac-battery" percent={100} />
            <span className="mac-clock">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
