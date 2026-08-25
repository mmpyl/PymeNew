import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
      <div className="mx-auto max-w-4xl text-center relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para comenzar?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Únete a cientos de desarrolladores que ya están construyendo con PymeN. Comienza gratis hoy mismo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Crear cuenta gratis
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-transparent border-2 border-white/50 rounded-xl hover:bg-white/10 transition-all hover:-translate-y-1"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
