'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/85 px-4 py-4 shadow-sm backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PymeN
            </h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4" aria-label="Navegación principal">
            <Link 
              href="/login" 
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600 sm:px-5"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 overflow-hidden px-4 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" aria-hidden="true" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">Listo para empresas en crecimiento</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Gestiona tu PyME<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              con una base escalable
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Frontend y backend listos para autenticar usuarios, organizar módulos y acelerar el desarrollo de productos empresariales con Next.js, NestJS, PostgreSQL JSONB y Prisma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Crear cuenta gratis
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              Iniciar sesión
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Autenticación JWT</h3>
              <p className="text-slate-600 text-sm">Sistema de autenticación seguro con tokens JWT y roles de usuario.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">PostgreSQL + Prisma</h3>
              <p className="text-slate-600 text-sm">Base de datos robusta con ORM moderno y soporte JSONB.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Arquitectura Modular</h3>
              <p className="text-slate-600 text-sm">Código organizado y escalable siguiendo mejores prácticas.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white/80 px-4 py-6 backdrop-blur-sm sm:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PymeN Boilerplate. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
