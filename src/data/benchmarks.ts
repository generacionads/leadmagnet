export type MetricKey = 'ROAS' | 'CPL' | 'CPA' | 'CTR' | 'CPM';

export type MetricConfig = {
  label: string;
  unit: string;
  unitPosition: 'prefix' | 'suffix';
  higherIsBetter: boolean;
  p25: number;
  p75: number;
  scaleMin: number;
  scaleMax: number;
  step: number;
};

export type ChannelBenchmarks = Record<MetricKey, MetricConfig>;
export type SectorBenchmarks = Record<string, ChannelBenchmarks>;

const metricDefaults: Omit<MetricConfig, 'p25' | 'p75' | 'scaleMin' | 'scaleMax'> = {
  label: '',
  unit: '',
  unitPosition: 'suffix',
  higherIsBetter: false,
  step: 0.1,
};

function metric(
  label: string,
  unit: string,
  unitPosition: 'prefix' | 'suffix',
  higherIsBetter: boolean,
  p25: number,
  p75: number,
  scaleMin: number,
  scaleMax: number,
  step = 0.1
): MetricConfig {
  return { label, unit, unitPosition, higherIsBetter, p25, p75, scaleMin, scaleMax, step };
}

export const SECTORS: Record<string, string> = {
  salud: 'Salud y Servicios Sanitarios',
  arquitectura: 'Estudios de Arquitectura',
  b2b: 'B2B',
};

export const CHANNELS: Record<string, string> = {
  google: 'Google Ads',
  meta: 'Meta Ads',
  linkedin: 'LinkedIn Ads',
  tiktok: 'TikTok Ads',
};

export const benchmarks: Record<string, Record<string, ChannelBenchmarks>> = {
  salud: {
    google: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 3.0, 7.0, 0, 12, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 12, 45, 0, 90, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 40, 120, 0, 200, 1),
      CTR:  metric('CTR', '%', 'suffix', true, 2.5, 6.0, 0, 10, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 4, 14, 0, 25, 0.5),
    },
    meta: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 2.5, 6.0, 0, 10, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 8, 28, 0, 55, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 30, 90, 0, 160, 1),
      CTR:  metric('CTR', '%', 'suffix', true, 0.8, 2.2, 0, 5, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 5, 16, 0, 30, 0.5),
    },
    linkedin: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 2.0, 5.0, 0, 9, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 40, 120, 0, 200, 5),
      CPA:  metric('CPA', '€', 'suffix', false, 100, 300, 0, 500, 10),
      CTR:  metric('CTR', '%', 'suffix', true, 0.3, 0.9, 0, 2, 0.05),
      CPM:  metric('CPM', '€', 'suffix', false, 20, 55, 0, 90, 1),
    },
    tiktok: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 1.5, 4.0, 0, 8, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 5, 20, 0, 40, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 20, 60, 0, 110, 1),
      CTR:  metric('CTR', '%', 'suffix', true, 1.0, 3.2, 0, 7, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 3, 9, 0, 18, 0.5),
    },
  },
  arquitectura: {
    google: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 4.0, 10.0, 0, 16, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 20, 65, 0, 120, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 80, 220, 0, 380, 5),
      CTR:  metric('CTR', '%', 'suffix', true, 1.5, 4.5, 0, 9, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 3, 10, 0, 20, 0.5),
    },
    meta: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 3.0, 8.0, 0, 14, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 10, 38, 0, 70, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 40, 130, 0, 220, 5),
      CTR:  metric('CTR', '%', 'suffix', true, 0.6, 2.0, 0, 4.5, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 4, 13, 0, 25, 0.5),
    },
    linkedin: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 3.0, 7.0, 0, 12, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 50, 160, 0, 280, 5),
      CPA:  metric('CPA', '€', 'suffix', false, 150, 420, 0, 700, 10),
      CTR:  metric('CTR', '%', 'suffix', true, 0.2, 0.7, 0, 1.5, 0.05),
      CPM:  metric('CPM', '€', 'suffix', false, 25, 65, 0, 110, 1),
    },
    tiktok: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 2.0, 5.5, 0, 10, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 8, 28, 0, 55, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 30, 85, 0, 150, 5),
      CTR:  metric('CTR', '%', 'suffix', true, 0.8, 2.8, 0, 6, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 2, 8, 0, 16, 0.5),
    },
  },
  b2b: {
    google: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 3.0, 8.0, 0, 14, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 25, 85, 0, 160, 5),
      CPA:  metric('CPA', '€', 'suffix', false, 100, 320, 0, 550, 10),
      CTR:  metric('CTR', '%', 'suffix', true, 1.5, 4.5, 0, 9, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 5, 16, 0, 30, 0.5),
    },
    meta: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 2.0, 6.0, 0, 11, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 15, 55, 0, 100, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 60, 190, 0, 330, 5),
      CTR:  metric('CTR', '%', 'suffix', true, 0.5, 1.8, 0, 4, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 6, 20, 0, 38, 0.5),
    },
    linkedin: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 3.0, 8.0, 0, 14, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 60, 200, 0, 350, 5),
      CPA:  metric('CPA', '€', 'suffix', false, 200, 650, 0, 1100, 25),
      CTR:  metric('CTR', '%', 'suffix', true, 0.3, 0.9, 0, 2, 0.05),
      CPM:  metric('CPM', '€', 'suffix', false, 30, 75, 0, 130, 1),
    },
    tiktok: {
      ROAS: metric('ROAS', 'x', 'suffix', true, 1.5, 4.0, 0, 8, 0.1),
      CPL:  metric('CPL', '€', 'suffix', false, 10, 35, 0, 65, 1),
      CPA:  metric('CPA', '€', 'suffix', false, 40, 110, 0, 190, 5),
      CTR:  metric('CTR', '%', 'suffix', true, 0.6, 2.2, 0, 5, 0.1),
      CPM:  metric('CPM', '€', 'suffix', false, 3, 10, 0, 20, 0.5),
    },
  },
};
