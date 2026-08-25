'use client';

import { useState } from 'react';
import FAQItem from './FAQItem';

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

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
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
  );
}
