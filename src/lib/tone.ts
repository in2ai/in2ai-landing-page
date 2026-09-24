export type Tone = 'dark' | 'light' | 'brand' | 'brand-dark';

/**
 * Clases equivalentes para los mockups de producto según el fondo en que se pintan.
 * 'dark' y 'light' son monocromas: nada de color, solo contraste y opacidad.
 * 'brand' y 'brand-dark' usan la paleta de in2ai.com (ver global.css), sobre blanco
 * y sobre tinta respectivamente.
 */
const dark = {
  shell: 'border-white/12 bg-[#0B0B0D]',
  chrome: 'border-white/10 bg-white/[0.04]',
  panel: 'bg-[#0B0B0D]',
  sub: 'bg-white/[0.02]',
  raised: 'bg-white/[0.05]',
  head: 'text-white',
  body: 'text-zinc-300',
  muted: 'text-zinc-500',
  rule: 'border-white/10',
  divide: 'divide-white/10',
  chip: 'border-white/12 bg-white/[0.06] text-zinc-300',
  track: 'bg-white/10',
  fill: 'bg-white',
  fillSoft: 'bg-white/40',
  skeleton: 'bg-white/10',
  dot: 'bg-white/20',
  bubbleUser: 'bg-white text-black',
  bubbleBot: 'border border-white/10 bg-white/[0.05] text-zinc-200',
  mark: 'bg-white/20 text-white',
  stroke: '#ffffff',
  grid: 'rgb(255 255 255 / 0.06)',
  areaTop: 'rgb(255 255 255 / 0.28)',
  areaBottom: 'rgb(255 255 255 / 0)',
  shadow: 'shadow-2xl shadow-black/60',
  /** texto o icono sobre `fill` */
  onFill: 'text-black',
  /** botón principal con texto (sobre él va `onFill`) */
  cta: 'bg-white',
  /** marco del móvil */
  bezel: 'border-white/12 bg-black',
  /** fondo del fotograma de visión artificial */
  frame: 'bg-white/[0.04]',
  boxOk: 'border-white/85',
  boxWarn: 'border-dashed border-white/60',
  tag: 'bg-white text-black',
  tagWarn: 'bg-white text-black',
  /** punto de una detección fuera de umbral */
  warn: 'bg-white/40',
};

type Palette = typeof dark;

const light: Palette = {
  shell: 'border-black/10 bg-white',
  chrome: 'border-black/10 bg-neutral-50',
  panel: 'bg-white',
  sub: 'bg-neutral-50',
  raised: 'bg-neutral-100',
  head: 'text-neutral-900',
  body: 'text-neutral-700',
  muted: 'text-neutral-500',
  rule: 'border-black/10',
  divide: 'divide-black/10',
  chip: 'border-black/10 bg-neutral-100 text-neutral-600',
  track: 'bg-neutral-200',
  fill: 'bg-neutral-900',
  fillSoft: 'bg-neutral-400',
  skeleton: 'bg-neutral-200',
  dot: 'bg-neutral-300',
  bubbleUser: 'bg-neutral-900 text-white',
  bubbleBot: 'border border-black/10 bg-neutral-50 text-neutral-700',
  mark: 'bg-neutral-900/12 text-neutral-900',
  stroke: '#171717',
  grid: 'rgb(0 0 0 / 0.06)',
  areaTop: 'rgb(0 0 0 / 0.14)',
  areaBottom: 'rgb(0 0 0 / 0)',
  shadow: 'shadow-2xl shadow-neutral-900/10',
  onFill: 'text-white',
  cta: 'bg-neutral-900',
  bezel: 'border-neutral-900 bg-neutral-900',
  frame: 'bg-neutral-100',
  boxOk: 'border-neutral-900',
  boxWarn: 'border-dashed border-neutral-500',
  tag: 'bg-neutral-900 text-white',
  tagWarn: 'bg-neutral-900 text-white',
  warn: 'bg-neutral-400',
};

// El azul del logo no llega a 4,5:1 con texto blanco pequeño: los botones y
// burbujas con texto usan su versión profunda, y el azul puro queda para barras,
// puntos y trazos. La terracota marca lo que hay que revisar.
const brand: Palette = {
  shell: 'border-brand-blue/20 bg-white',
  chrome: 'border-brand-blue/15 bg-brand-mist',
  panel: 'bg-white',
  sub: 'bg-brand-mist',
  raised: 'bg-brand-sky/30',
  head: 'text-brand-ink',
  body: 'text-brand-ink/80',
  muted: 'text-brand-slate-deep',
  rule: 'border-brand-blue/15',
  divide: 'divide-brand-blue/15',
  chip: 'border-brand-blue/20 bg-brand-blue/[0.07] text-brand-blue-deep',
  track: 'bg-brand-sky/40',
  fill: 'bg-brand-blue',
  fillSoft: 'bg-brand-cyan/45',
  skeleton: 'bg-brand-sky/35',
  dot: 'bg-brand-sky/70',
  bubbleUser: 'bg-brand-blue-deep text-white',
  bubbleBot: 'border border-brand-blue/15 bg-brand-mist text-brand-ink/85',
  mark: 'bg-brand-clay/20 text-brand-ink',
  stroke: '#3b9abc',
  grid: 'rgb(59 154 188 / 0.12)',
  areaTop: 'rgb(0 169 233 / 0.26)',
  areaBottom: 'rgb(0 169 233 / 0)',
  shadow: 'shadow-2xl shadow-brand-blue/20',
  onFill: 'text-white',
  cta: 'bg-brand-blue-deep',
  bezel: 'border-brand-ink bg-brand-ink',
  frame: 'bg-brand-mist',
  boxOk: 'border-brand-blue',
  boxWarn: 'border-dashed border-brand-clay',
  tag: 'bg-brand-blue-deep text-white',
  tagWarn: 'bg-brand-clay-deep text-white',
  warn: 'bg-brand-clay',
};

// Sobre tinta los cuatro colores del logo pasan de 4,5:1 tal cual.
const brandDark: Palette = {
  shell: 'border-brand-sky/15 bg-[#0B181E]',
  chrome: 'border-brand-sky/12 bg-brand-sky/[0.05]',
  panel: 'bg-[#0B181E]',
  sub: 'bg-brand-sky/[0.03]',
  raised: 'bg-brand-sky/[0.08]',
  head: 'text-white',
  body: 'text-brand-mist/80',
  muted: 'text-brand-slate',
  rule: 'border-brand-sky/12',
  divide: 'divide-brand-sky/12',
  chip: 'border-brand-sky/15 bg-brand-sky/[0.07] text-brand-sky',
  track: 'bg-brand-sky/12',
  fill: 'bg-brand-cyan',
  fillSoft: 'bg-brand-sky/50',
  skeleton: 'bg-brand-sky/12',
  dot: 'bg-brand-sky/25',
  bubbleUser: 'bg-brand-cyan text-brand-ink',
  bubbleBot: 'border border-brand-sky/12 bg-brand-sky/[0.06] text-brand-mist/85',
  mark: 'bg-brand-clay/40 text-white',
  stroke: '#00a9e9',
  grid: 'rgb(157 191 218 / 0.08)',
  areaTop: 'rgb(0 169 233 / 0.35)',
  areaBottom: 'rgb(0 169 233 / 0)',
  shadow: 'shadow-2xl shadow-black/50',
  onFill: 'text-brand-ink',
  cta: 'bg-brand-cyan',
  bezel: 'border-brand-sky/15 bg-black',
  frame: 'bg-brand-sky/[0.05]',
  boxOk: 'border-brand-cyan',
  boxWarn: 'border-dashed border-brand-clay',
  tag: 'bg-brand-cyan text-brand-ink',
  tagWarn: 'bg-brand-clay text-brand-ink',
  warn: 'bg-brand-clay',
};

const tones: Record<Tone, Palette> = { dark, light, brand, 'brand-dark': brandDark };

export function tone(t: Tone) {
  return tones[t];
}
