'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/** The Pixel snippet records the first page view; client-side navigations need their own. GA4 tracks them itself. */
export function PixelPageViews() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);
  return null;
}
