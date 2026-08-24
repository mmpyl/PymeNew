import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'PymeN - Enterprise Boilerplate',
  description: 'Base enterprise modular con NestJS, Next.js, PostgreSQL JSONB y Prisma.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
