import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Solicitar diagnóstico gratuito',
  description: 'Cuéntanos tu situación y te diremos qué está frenando tu rendimiento en publicidad digital.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/Group 6 (2).png" alt="Generación Ads" width={36} height={36} priority />
            <span className="font-medium text-gray-900 text-lg tracking-tight">Generación Ads</span>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-2xl mx-auto w-full px-4 py-10 flex flex-col gap-8">
          {/* Intro */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" style={{ color: '#9536B6' }}>
              Diagnóstico gratuito
            </span>
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
              Cuéntanos cómo estás invirtiendo en publicidad
            </h1>
            <p className="text-gray-500 text-lg font-normal">
              Analizamos tus cuentas y te decimos exactamente qué está frenando tu rendimiento — sin compromiso.
            </p>
          </div>

          {/* What to expect */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🔍', title: 'Análisis real', desc: 'Revisamos tus métricas actuales contra el benchmark de tu sector.' },
              { icon: '🎯', title: 'Recomendaciones', desc: 'Te damos acciones concretas y priorizadas, no informes genéricos.' },
              { icon: '⏱️', title: '24h de respuesta', desc: 'Nos ponemos en contacto en menos de 24 horas.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400 font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-4">
        <p className="text-center text-xs text-gray-400 font-normal">
          Datos de referencia basados en análisis de cuentas activas en España (2024–2025).
        </p>
      </footer>
    </div>
  );
}
