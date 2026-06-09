'use client';

import { useState } from 'react';
import type { MetricConfig } from '@/data/benchmarks';

type Props = {
  metricKey: string;
  config: MetricConfig;
  featured?: boolean;
  value: string;
  onChange: (val: string) => void;
};

function getStatus(
  value: number,
  config: MetricConfig
): 'good' | 'average' | 'bad' | null {
  if (isNaN(value)) return null;
  if (config.higherIsBetter) {
    if (value >= config.p75) return 'good';
    if (value >= config.p25) return 'average';
    return 'bad';
  } else {
    if (value <= config.p25) return 'good';
    if (value <= config.p75) return 'average';
    return 'bad';
  }
}

function getNeedlePercent(value: number, config: MetricConfig): number {
  const pct = ((value - config.scaleMin) / (config.scaleMax - config.scaleMin)) * 100;
  return Math.min(100, Math.max(0, pct));
}

function formatValue(val: number, config: MetricConfig): string {
  if (config.unit === '%') return val.toFixed(1) + '%';
  if (config.unit === 'x') return val.toFixed(1) + 'x';
  return val.toFixed(val >= 10 ? 0 : 1) + ' €';
}

const statusColors = {
  good: '#22c55e',
  average: '#f59e0b',
  bad: '#ef4444',
};

const statusLabels = {
  good: 'Por encima del mercado',
  average: 'Dentro del rango',
  bad: 'Por debajo del mercado',
};

export default function MetricBar({ metricKey, config, featured = false, value, onChange }: Props) {
  const numValue = parseFloat(value);
  const hasValue = value !== '' && !isNaN(numValue);
  const status = hasValue ? getStatus(numValue, config) : null;
  const needlePct = hasValue ? getNeedlePercent(numValue, config) : null;

  const p25Pct = ((config.p25 - config.scaleMin) / (config.scaleMax - config.scaleMin)) * 100;
  const p75Pct = ((config.p75 - config.scaleMin) / (config.scaleMax - config.scaleMin)) * 100;
  const rangeWidth = p75Pct - p25Pct;

  const unitSuffix = config.unit !== '€' ? config.unit : '';
  const unitPrefix = config.unit === '€' ? '€' : '';

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-4 ${
        featured
          ? 'bg-[#9536B6] text-white shadow-lg shadow-purple-200'
          : 'bg-white border border-gray-100 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span
            className={`text-xs font-medium tracking-wider uppercase ${
              featured ? 'text-purple-200' : 'text-gray-400'
            }`}
          >
            {featured ? 'Métrica principal' : 'Métrica'}
          </span>
          <h3
            className={`text-2xl font-medium mt-0.5 ${
              featured ? 'text-white' : 'text-gray-900'
            }`}
          >
            {config.label}
          </h3>
        </div>
        {status && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: featured
                ? 'rgba(255,255,255,0.15)'
                : statusColors[status] + '1a',
              color: featured ? 'white' : statusColors[status],
            }}
          >
            {statusLabels[status]}
          </span>
        )}
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-xs" style={{ color: featured ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
        <span>P25: {formatValue(config.p25, config)}</span>
        <span>P75: {formatValue(config.p75, config)}</span>
      </div>

      {/* Bar */}
      <div className="relative h-3 rounded-full overflow-visible" style={{ backgroundColor: featured ? 'rgba(255,255,255,0.2)' : '#f3f4f6' }}>
        {/* P25-P75 highlighted range */}
        <div
          className="absolute top-0 h-3 rounded-full"
          style={{
            left: `${p25Pct}%`,
            width: `${rangeWidth}%`,
            backgroundColor: featured ? 'rgba(255,255,255,0.5)' : '#9536B6',
          }}
        />
        {/* Needle */}
        {needlePct !== null && (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
            style={{ left: `${needlePct}%` }}
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: featured ? 'white' : (status ? statusColors[status] : '#9536B6') }}
            />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <label
          className={`text-sm font-medium ${featured ? 'text-purple-100' : 'text-gray-500'}`}
        >
          Tu valor
        </label>
        <div className="relative flex-1">
          {unitPrefix && (
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${featured ? 'text-purple-200' : 'text-gray-400'}`}>
              {unitPrefix}
            </span>
          )}
          <input
            type="number"
            step={config.step}
            min={config.scaleMin}
            max={config.scaleMax}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="—"
            className={`w-full rounded-xl py-2 text-sm transition-colors outline-none ${
              unitPrefix ? 'pl-7 pr-10' : 'pl-3 pr-10'
            } ${
              featured
                ? 'bg-white/20 text-white placeholder-white/40 border border-white/30 focus:border-white/70'
                : 'bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200 focus:border-[#9536B6]'
            }`}
          />
          {unitSuffix && (
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${featured ? 'text-purple-200' : 'text-gray-400'}`}>
              {unitSuffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
