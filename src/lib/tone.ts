export type Tone = 'dark' | 'light';

/**
 * Clases equivalentes para los mockups de producto en fondo negro o blanco.
 * Toda la paleta es monocroma: nada de color, solo contraste y opacidad.
 */
export function tone(t: Tone) {
  return t === 'dark'
    ? {
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
      }
    : {
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
      };
}
