'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Componente para animación de conteo
function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Componente FAQ Accordion
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <svg
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      title: 'Autenticación JWT',
      description: 'Sistema de autenticación seguro con tokens JWT, refresh tokens y roles de usuario configurables.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-100',
      title: 'PostgreSQL + Prisma',
      description: 'Base de datos robusta con ORM moderno, migraciones automáticas y soporte avanzado para JSONB.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Arquitectura Modular',
      description: 'Código organizado por módulos, fácil de escalar y mantener siguiendo las mejores prácticas de la industria.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-100',
      title: 'Alto Rendimiento',
      description: 'Next.js con renderizado optimizado, caching estratégico y bundle splitting para máxima velocidad.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-100',
      title: '100% Responsive',
      description: 'Diseño mobile-first que se adapta perfectamente a cualquier dispositivo y tamaño de pantalla.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-100',
      title: 'Seguridad Integrada',
      description: 'Validación de datos, protección CSRF, rate limiting y headers de seguridad configurados por defecto.'
    }
  ];

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

  const faqs = [
    {
      question: "¿Qué incluye el boilerplate?",
      answer: "PymeN incluye autenticación JWT completa, configuración de base de datos PostgreSQL con Prisma ORM, estructura modular de carpetas, componentes reutilizables, sistema de diseño consistente, Docker para desarrollo y producción, y documentación detallada."
    },
    {
      question: "¿Puedo usar esto para proyectos comerciales?",
      answer: "¡Absolutamente! PymeN está diseñado específicamente para acelerar el desarrollo de productos comerciales. Puedes usarlo como base para SaaS, aplicaciones empresariales, marketplaces y más."
    },
    {
      question: "¿Necesito experiencia con Next.js o NestJS?",
      answer: "Tener conocimientos básicos ayuda, pero la documentación detallada y la estructura clara del proyecto hacen que sea accesible incluso para desarrolladores con experiencia en otros frameworks."
    },
    {
      question: "¿Cómo funciona el soporte?",
      answer: "Ofrecemos soporte comunitario gratuito a través de GitHub Issues y Discord. Los planes Professional y Enterprise incluyen soporte prioritario por email y canales dedicados de comunicación."
    },
    {
      question: "¿Puedo personalizar el diseño?",
      answer: "Sí, todo el diseño está construido con Tailwind CSS, lo que hace que sea extremadamente fácil personalizar colores, tipografías, espaciado y cualquier otro aspecto visual según tus necesidades."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              PymeN
            </h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4" aria-label="Navegación principal">
            <Link 
              href="/login" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-blue-600"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="mx-auto max-w-7xl px-4 sm:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <Counter end={500} suffix="+"/>
                </div>
                <div className="text-blue-100 font-medium">Proyectos Creados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <Counter end={99} suffix="%"/>
                </div>
                <div className="text-blue-100 font-medium">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <Counter end={10} suffix="k+"/>
                </div>
                <div className="text-blue-100 font-medium">Líneas de Código</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <Counter end={24} suffix="/7"/>
                </div>
                <div className="text-blue-100 font-medium">Soporte Activo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Todo lo que necesitas para{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  construir rápido
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Características pensadas para desarrolladores que quieren enfocarse en su producto, no en la infraestructura.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                      <svg className="w-6 h-6" style={{ color: feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('emerald') ? '#10b981' : feature.color.includes('purple') ? '#8b5cf6' : feature.color.includes('amber') ? '#f59e0b' : feature.color.includes('pink') ? '#ec4899' : '#06b6d4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {feature.icon}
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
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

        {/* Testimonials Section */}
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
                  <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
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

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Preguntas{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  frecuentes
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                Todo lo que necesitas saber sobre PymeN.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
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
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white px-4 py-12 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  PymeN
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                El boilerplate definitivo para construir aplicaciones empresariales escalables.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Características</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Precios</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Documentación</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Tutoriales</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Comunidad</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Soporte</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacidad</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} PymeN Boilerplate. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
