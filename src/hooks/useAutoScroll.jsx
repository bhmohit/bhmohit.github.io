import { useEffect } from 'react';

export default function useAutoScroll(selector, deps = []) {
  useEffect(() => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el && 'scrollTop' in el) {
      el.scrollTop = el.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
