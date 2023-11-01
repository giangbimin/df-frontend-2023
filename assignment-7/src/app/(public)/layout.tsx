'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useSessionContext } from '../_contexts/SessionContext';

export default function SecureLayout({ children }: { children: ReactNode }) {
  const routers = useRouter();
  const { isLogin } = useSessionContext();

  useEffect(() => {
    if (isLogin) routers.push('/books');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);
  return children;
}
