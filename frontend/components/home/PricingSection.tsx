const pricingPlans = [
  {
    name: 'Starter',
    price: 'Gratis',
    period: '',
    description: 'Perfecto para proyectos personales',
    features: ['Hasta 3 proyectos', 'Autenticación básica', 'Soporte comunitario', 'Documentación completa'],
    highlighted: false,
    cta: 'Comenzar gratis'
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/mes',
    description: 'Ideal para startups en crecimiento',
    features: ['Proyectos ilimitados', 'Autenticación avanzada', 'Soporte prioritario', 'API personalizada', 'Analytics básico', 'Backups diarios'],
    highlighted: true,
    cta: 'Prueba gratuita 14 días'
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    period: '',
    description: 'Para equipos y organizaciones',
    features: ['Todo lo de Professional', 'SLA garantizado', 'Soporte 24/7', 'Deploy dedicado', 'SSO & SAML', 'Auditoría de logs'],
    highlighted: false,
    cta: 'Contactar ventas'
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 px-4 sm:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Planes simples y{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              transparentes
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comienza gratis y escala según tus necesidades. Sin costos ocultos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-600 to-blue-700 border-blue-500 text-white shadow-2xl shadow-blue-500/30 scale-105'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-sm font-semibold rounded-full shadow-lg">
                  Más Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
