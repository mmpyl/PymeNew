import Counter from './Counter';

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <Counter end={500} suffix="+" />
            </div>
            <div className="text-blue-100 font-medium">Proyectos Creados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <Counter end={99} suffix="%" />
            </div>
            <div className="text-blue-100 font-medium">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <Counter end={10} suffix="k+" />
            </div>
            <div className="text-blue-100 font-medium">Líneas de Código</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <Counter end={24} suffix="/7" />
            </div>
            <div className="text-blue-100 font-medium">Soporte Activo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
