import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import { ReactNode } from 'react';
import { Footer } from '../components/Footer';

const inter = Inter({
  subsets: ['latin'],
});

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`bg-dark pt-8 ${inter.className}`}>
      <div
        className="pointer-events-none absolute top-0 left-0 h-64 w-full"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #050211), repeating-linear-gradient(-45deg, #041F47, #041F47 1px, transparent 1px, transparent 20px)',
        }}
      />
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col gap-32 px-4 pt-24 md:gap-64">{children}</main>
      <Footer />
    </div>
  );
};
