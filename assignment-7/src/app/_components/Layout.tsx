'use client';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900 h-full p-3 sm:p-5">
      <div id="book-store" className="mx-auto max-w-screen-xl">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
