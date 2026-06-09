import Logo from '@/components/Logo';
import BenchmarkTool from '@/components/BenchmarkTool';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Logo size={36} />
          <span className="font-medium text-gray-900 text-lg tracking-tight">
            Herramientas
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <BenchmarkTool />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-4">
        <p className="text-center text-xs text-gray-400 font-light">
          Datos de referencia basados en análisis de cuentas activas en España (2024–2025).
        </p>
      </footer>
    </div>
  );
}
