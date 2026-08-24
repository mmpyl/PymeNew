'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-lg font-semibold text-slate-900">Verificando autenticación</h1>
          <p className="mt-2 text-sm text-slate-600">
            Estamos revisando tu sesión antes de mostrar el panel.
          </p>
          {!isAuthLoading && (
            <Link href="/login" className="mt-5 inline-flex text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ir a inicio de sesión
            </Link>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
