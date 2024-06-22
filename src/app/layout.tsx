import type { Metadata } from 'next';
import { Open_Sans as FontSans } from 'next/font/google';

import './globals.css';
import { cn } from '@/libs/utils';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Gerenciador de despesas',
  description: 'Gerencie suas despesas com a ajuda de um gerenciador de despesas',
};

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body className={cn('bg-background text-foreground', fontSans.className)}>{children}</body>
    </html>
  );
};

export default RootLayout;
