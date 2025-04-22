'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export default function Tracker() {
  const pathname = usePathname();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: pathname,  // Opcional: título de la página
      href: window.location.href,
    });
  }, [pathname, trackPageView]);

  return null; // No renderiza nada
}