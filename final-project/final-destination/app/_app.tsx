'use client';

import type { AppProps } from 'next/app'
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('preline');
  }, [])

  return <Component {...pageProps} />
}