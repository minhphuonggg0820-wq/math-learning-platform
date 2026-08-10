import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import { AppProvider } from '@/lib/store';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import { MobileHeader } from '@/components/layout/mobile-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MathVerse - Interactive Math Learning',
  description: 'Learn math interactively with gamification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <AppProvider>
          <LayoutWrapper>
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 md:ml-56 pb-20 md:pb-0">
              <MobileHeader />
              <main className="flex-1 w-full">
                {children}
              </main>
            </div>
            <MobileNav />
          </LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
