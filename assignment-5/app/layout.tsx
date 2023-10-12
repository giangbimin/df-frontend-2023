import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './loading';
import Layout from './_components/Layout';
import { ApplicationProvider } from './_contexts/ApplicationContext';
import { SessionProvider } from './_contexts/SessionContext';

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
          <ApplicationProvider>
            <SessionProvider>
              <Layout> {children} </Layout>
            </SessionProvider>
          </ApplicationProvider>
        </Suspense>
      </body>
    </html>
  );
}
