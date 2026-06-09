'use server';

import { Resend } from 'resend';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const nombre = formData.get('nombre')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const telefono = formData.get('telefono')?.toString().trim() ?? '';
  const empresa = formData.get('empresa')?.toString().trim() ?? '';
  const mensaje = formData.get('mensaje')?.toString().trim() ?? '';

  if (!nombre || !email || !mensaje) {
    return { status: 'error', message: 'Por favor rellena los campos obligatorios.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'El email no es válido.' };
  }

  // Requires RESEND_API_KEY and CONTACT_EMAIL in .env.local
  // RESEND_API_KEY → tu clave de https://resend.com
  // CONTACT_EMAIL  → el email donde quieres recibir los formularios
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL env vars');
    return { status: 'error', message: 'Error de configuración del servidor.' };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: 'Benchmark Tool <noreply@resend.dev>',
    to: toEmail,
    replyTo: email,
    subject: `Nuevo diagnóstico de ${nombre} — ${empresa || 'sin empresa'}`,
    text: [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Teléfono: ${telefono || '—'}`,
      `Empresa / web: ${empresa || '—'}`,
      '',
      `Mensaje:`,
      mensaje,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return { status: 'error', message: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' };
  }

  return { status: 'success' };
}
