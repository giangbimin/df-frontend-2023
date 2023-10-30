import { ReactNode } from 'react';
import { AuthProvider } from '../_contexts/AuthContext';
import Layout from '../_components/Layout';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}
