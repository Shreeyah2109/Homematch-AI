
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
