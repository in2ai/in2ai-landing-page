// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL pública: la usan las etiquetas hreflang y canonical, que necesitan URLs absolutas.
  site: 'https://in2ai.com',
  // El español sigue en la raíz (/) y el inglés vive en /en/. Si se añade un idioma,
  // hay que darlo de alta aquí y en src/i18n/index.ts.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
