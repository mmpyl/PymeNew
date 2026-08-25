const testimonials = [
  {
    quote: "PymeN nos permitió lanzar nuestro MVP en tiempo récord. La arquitectura es sólida y el equipo de soporte es excepcional.",
    author: "María González",
    role: "CTO en TechStart",
    avatar: "MG"
  },
  {
    quote: "La mejor inversión para nuestra startup. Redujimos el tiempo de desarrollo en un 60% y la calidad del código es impresionante.",
    author: "Carlos Rodríguez",
    role: "Founder en InnovateLab",
    avatar: "CR"
  },
  {
    quote: "Escalamos de 100 a 10,000 usuarios sin problemas. La infraestructura de PymeN está diseñada para crecer contigo.",
    author: "Ana Martínez",
    role: "Lead Developer en ScaleUp",
    avatar: "AM"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              usuarios
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Desarrolladores y fundadores confían en PymeN para construir sus productos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
