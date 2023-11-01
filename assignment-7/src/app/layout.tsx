import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loading from './loading';
import { ApplicationProvider } from './_contexts/ApplicationContext';
import { SessionProvider } from './_contexts/SessionContext';
import Navbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookStore',
  description: 'this is Assignment 4 NextJS Project ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading text="Book Store" />}>
          <div className="antialiased bg-gray-50 dark:bg-gray-900 h-full p-3 sm:p-5">
            <div id="book-store" className="mx-auto max-w-screen-xl">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <ApplicationProvider>
                  <SessionProvider>
                    <Navbar />
                    <Toaster />
                    {children}
                  </SessionProvider>
                </ApplicationProvider>
              </div>
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
