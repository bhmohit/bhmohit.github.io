import { useEffect, useState } from 'react';
import WifiIcon from './icons/WifiIcon.jsx';
import BatteryIcon from './icons/BatteryIcon.jsx';

function formatNow() {
  const now = new Date();
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
  const [label, setLabel] = useState(formatNow());

  useEffect(() => {
    const id = setInterval(() => setLabel(formatNow()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mac-header">
      <div className="mac-header__content">
        <div className="mac-header__left" title={leftLabel}>{leftLabel}</div>
        <div className="mac-header__center" aria-hidden>{title}</div>
        <div className="mac-header__right" aria-live="polite">
          <div className="mac-status">
            <WifiIcon className="mac-icon" />
            <BatteryIcon className="mac-icon" percent={100} />
            <span className="mac-clock">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
