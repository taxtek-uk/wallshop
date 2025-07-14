// src/hooks/useScrollPosition.ts
import { useState, useEffect } from 'react';

/**
 * Returns `true` once the page is scrolled past `offset` pixels.
 */
export default function useScrollPosition(offset = 20): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
