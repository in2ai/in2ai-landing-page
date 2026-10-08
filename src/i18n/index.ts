import es from './es';
import en from './en';
import type { Dictionary } from './types';

/** Mismos códigos que i18n.locales en astro.config.mjs; el primero es el idioma por defecto. */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Etiqueta completa para <html lang>; Intl la usa también para formatear las cifras. */
export const htmlLang: Record<Locale, string> = { es: 'es-ES', en: 'en-GB' };

/** Cada idioma escrito en su propio idioma, para el selector. */
export const languageNames: Record<Locale, string> = { es: 'Español', en: 'English' };

/** Normaliza `Astro.currentLocale`, que puede venir vacío. */
export function getLocale(current: string | undefined): Locale {
  return (locales as readonly string[]).includes(current ?? '') ? (current as Locale) : defaultLocale;
}

export function useTranslations(current: string | undefined): Dictionary {
  return dictionaries[getLocale(current)];
}

/** 8.412 en español y 8,412 en inglés. */
export function formatNumber(current: string | undefined, value: number) {
  // es-ES no agrupa los números de 4 cifras por defecto; lo forzamos para que
  // 8.412 case con las cifras grandes de los mockups.
  return new Intl.NumberFormat(htmlLang[getLocale(current)], { useGrouping: 'always' }).format(value);
}
