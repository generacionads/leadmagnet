'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/app/actions/contact';

const initial: ContactState = { status: 'idle' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7f0fb' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9536B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-gray-900">¡Mensaje recibido!</h2>
        <p className="text-gray-500 font-light max-w-sm">
          Nos pondremos en contacto contigo en las próximas 24 horas.
        </p>
        <a
          href="/"
          className="mt-2 text-sm font-medium underline underline-offset-2"
          style={{ color: '#9536B6' }}
        >
          Volver al benchmark
        </a>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre *" name="nombre" type="text" placeholder="Tu nombre" required />
        <Field label="Email *" name="email" type="email" placeholder="tu@email.com" required />
      </div>

      {/* Teléfono + Empresa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Teléfono" name="telefono" type="tel" placeholder="+34 600 000 000" />
        <Field label="Empresa / web" name="empresa" type="text" placeholder="empresa.com" />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">
          Cuéntanos tu situación *
        </label>
        <textarea
          name="mensaje"
          required
          rows={4}
          placeholder="¿Qué canales usas ahora? ¿Cuáles son tus objetivos? ¿Qué está frenando tus resultados?"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none resize-none focus:border-[#9536B6] focus:ring-2 focus:ring-[#9536B6]/10 transition-all"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2.5">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-xl px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#9536B6' }}
      >
        {pending ? 'Enviando…' : 'Solicitar diagnóstico gratuito'}
      </button>

      <p className="text-xs text-gray-400 font-light">
        * Campos obligatorios. No compartimos tus datos con terceros.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-[#9536B6] focus:ring-2 focus:ring-[#9536B6]/10 transition-all"
      />
    </div>
  );
}
