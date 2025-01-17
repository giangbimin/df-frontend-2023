import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './loading';
import Layout from './_components/Layout';
import { ApplicationProvider } from './_contexts/ApplicationContext';

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
        <ApplicationProvider>
          <Suspense fallback={<Loading text="Book Store" />}>
            <Layout> {children} </Layout>
          </Suspense>
        </ApplicationProvider>
      </body>
    </html>
  );
}
