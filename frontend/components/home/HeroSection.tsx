import Link from 'next/link';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 sm:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/50 via-transparent to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-40 left-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-blue-700">Listo para empresas en crecimiento 🚀</span>
            </div>
            
            <h2 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Gestiona tu PyME{' '}
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                con una base escalable
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Frontend y backend listos para autenticar usuarios, organizar módulos y acelerar el desarrollo de productos empresariales con Next.js, NestJS, PostgreSQL JSONB y Prisma.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                Crear cuenta gratis
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all hover:-translate-y-1"
              >
                Iniciar sesión
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sin tarjeta requerida</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup en 5 minutos</span>
              </div>
            </div>
          </div>

          {/* Right illustration */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl transform rotate-6" />
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-200 p-6">
                {/* Dashboard mockup */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                      <div className="text-sm opacity-80">Usuarios Totales</div>
                      <div className="text-2xl font-bold mt-1">12,847</div>
                      <div className="text-xs opacity-80 mt-2">+23% esta semana</div>
                    </div>
                    <div className="flex-1 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
                      <div className="text-sm opacity-80">Ingresos</div>
                      <div className="text-2xl font-bold mt-1">$48,295</div>
                      <div className="text-xs opacity-80 mt-2">+15% este mes</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-end justify-between h-full gap-2">
                      {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
