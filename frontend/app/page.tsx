'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          <nav className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/dashboard" 
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-700">Enterprise Ready</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Base Enterprise<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Modular & Escalable
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Boilerplate profesional con NestJS, Next.js 14, PostgreSQL JSONB y Prisma. 
            Diseñado para acelerar el desarrollo de aplicaciones empresariales modernas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Ir al Dashboard
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              Comenzar Ahora
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <footer className="w-full py-6 px-8 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PymeN Boilerplate. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
