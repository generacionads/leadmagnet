'use client';

import { useState } from 'react';
import { benchmarks, SECTORS, CHANNELS, type MetricKey } from '@/data/benchmarks';
import MetricBar from './MetricBar';

const METRIC_ORDER: MetricKey[] = ['ROAS', 'CPL', 'CPA', 'CTR', 'CPM'];

export default function BenchmarkTool() {
  const [sector, setSector] = useState('');
  const [channel, setChannel] = useState('');
  const [values, setValues] = useState<Record<MetricKey, string>>({
    ROAS: '', CPL: '', CPA: '', CTR: '', CPM: '',
  });

  const data = sector && channel ? benchmarks[sector]?.[channel] : null;

  const handleValueChange = (key: MetricKey, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSectorChange = (val: string) => {
    setSector(val);
    setValues({ ROAS: '', CPL: '', CPA: '', CTR: '', CPM: '' });
  };

  const handleChannelChange = (val: string) => {
    setChannel(val);
    setValues({ ROAS: '', CPL: '', CPA: '', CTR: '', CPM: '' });
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10 flex flex-col gap-8">
      {/* Intro */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
          Benchmark de Publicidad Digital
        </h1>
        <p className="text-gray-500 text-lg font-light max-w-xl mx-auto">
          Compara tus métricas con los rangos de mercado según tu sector y canal publicitario.
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Sector</label>
          <select
            value={sector}
            onChange={(e) => handleSectorChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 text-sm outline-none focus:border-[#9536B6] focus:ring-2 focus:ring-[#9536B6]/10 transition-all cursor-pointer"
          >
            <option value="">Selecciona un sector…</option>
            {Object.entries(SECTORS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Canal</label>
          <select
            value={channel}
            onChange={(e) => handleChannelChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 text-sm outline-none focus:border-[#9536B6] focus:ring-2 focus:ring-[#9536B6]/10 transition-all cursor-pointer"
          >
            <option value="">Selecciona un canal…</option>
            {Object.entries(CHANNELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Empty state */}
      {!data && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-400 font-light">
            Selecciona un sector y un canal para ver los rangos de referencia.
          </p>
        </div>
      )}

      {/* Results */}
      {data && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* Source note */}
          <p className="text-xs text-gray-400 text-center">
            Rangos P25–P75 basados en cuentas activas en España (2024–2025). La variabilidad depende del presupuesto, segmentación y estacionalidad.
          </p>

          {/* ROAS featured */}
          <MetricBar
            metricKey="ROAS"
            config={data.ROAS}
            featured
            value={values.ROAS}
            onChange={(v) => handleValueChange('ROAS', v)}
          />

          {/* Other metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {METRIC_ORDER.filter((k) => k !== 'ROAS').map((key) => (
              <MetricBar
                key={key}
                metricKey={key}
                config={data[key]}
                value={values[key]}
                onChange={(v) => handleValueChange(key, v)}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {data && (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <p className="font-medium text-gray-900">¿Quieres mejorar tus resultados?</p>
            <p className="text-sm text-gray-500 font-light">Reserva un diagnóstico gratuito y te contamos qué está frenando tu rendimiento.</p>
          </div>
          <a
            href="/contacto"
            className="shrink-0 rounded-xl px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#9536B6' }}
          >
            Reservar diagnóstico
          </a>
        </div>
      )}
    </div>
  );
}
