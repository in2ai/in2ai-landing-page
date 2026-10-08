/**
 * Datos de IN2AI que no dependen del idioma: iconos, cifras, correo y enlaces externos.
 * Los textos están en src/i18n/es.ts y src/i18n/en.ts, enlazados por `id`.
 */

/** Las rutas originales se conservan en las páginas importadas de este proyecto. */
export const wp = '';

export const company = {
  name: 'In2AI',
  legalName: 'In2AI Intelligence S.L.',
  email: 'info@in2ai.com',
  linkedin: 'https://www.linkedin.com/company/in2ai',
};

export const products = {
  asm2: { name: 'ASM2', url: 'https://asm2.in2ai.com/', host: 'asm2.in2ai.com' },
  mecopia: { name: 'Mecopia', url: 'https://mecopia.ai/', host: 'mecopia.ai' },
};

export const services = [
  { id: 'dataDriven', roman: 'I', icon: 'M4 20h16M6 20V10m5 10V4m5 16V8m5 12v-6' },
  { id: 'machineLearning', roman: 'II', icon: 'M5 4h14v16H5zM8 9h8M8 13h5M8 17h3' },
  {
    id: 'vision',
    roman: 'III',
    icon: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  { id: 'nlp', roman: 'IV', icon: 'M4 5h16v10H9l-5 4V5Zm4 5h8M8 7h5' },
  {
    id: 'generative',
    roman: 'V',
    icon: 'M12 3a3 3 0 0 1 3 3v1h1a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a3 3 0 0 1 3-3h1V6a3 3 0 0 1 3-3Z',
  },
] as const;

export const sectors = [
  { id: 'retail', icon: 'M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2' },
  { id: 'utilities', icon: 'M13 3 5 14h6l-1 7 8-11h-6l1-7Z' },
  { id: 'manufacturing', icon: 'M3 20V11l5 3v-3l5 3V5h5v15H3Z' },
  { id: 'health', icon: 'M9 4h6v5h5v6h-5v5H9v-5H4V9h5V4Z' },
  {
    id: 'transport',
    icon: 'M2 6h12v10H2zM14 10h4l3 3v3h-7M6.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  },
  { id: 'finance', icon: 'M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Zm-3.5 9 2.5 2.5 4.5-5' },
  {
    id: 'tourism',
    icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z',
  },
  {
    id: 'telecom',
    icon: 'M12 12v9M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8',
  },
  { id: 'pharma', icon: 'M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7l-6 6ZM6.5 10.5l7 7' },
] as const;

/** Las cifras de la home de in2ai.com, con la fuente que cita cada una. */
export const stats = [
  { id: 'value', prefix: '+', value: '32', suffix: '%' },
  { id: 'profitability', prefix: '+', value: '6', suffix: '', source: 'Accenture' },
  { id: 'productivity', prefix: '+', value: '39', suffix: '%', source: 'Accenture' },
  { id: 'turnover', prefix: '+', value: '2.9', suffix: '%', source: 'PwC' },
  { id: 'costs', prefix: '−', value: '3.6', suffix: '%', source: 'PwC' },
  { id: 'efficiency', prefix: '+', value: '4.1', suffix: '%', source: 'PwC' },
] as const;

/** «¿Qué ofrecemos?» de in2ai.com. */
export const offer = [
  { id: 'adaptation', icon: 'M4 7h9m4 0h3M4 17h3m4 0h9M15 4v6M9 14v6' },
  {
    id: 'innovation',
    icon: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z',
  },
  {
    id: 'knowledge',
    icon: 'M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Zm0 6c0 1.1 3.6 2 8 2s8-.9 8-2M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6',
  },
  { id: 'benefits', icon: 'M3 17l6-6 4 4 8-8M15 7h6v6' },
] as const;

export type ServiceId = (typeof services)[number]['id'];
export type SectorId = (typeof sectors)[number]['id'];
export type StatId = (typeof stats)[number]['id'];
export type OfferId = (typeof offer)[number]['id'];
