import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benchmark de Publicidad Digital',
  description: 'Compara tus métricas con los rangos de mercado según tu sector y canal publicitario.',
  icons: {
    icon: '/Group 6 (2).png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@300,400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
