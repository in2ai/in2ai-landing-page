import website from '../data/website.json';
import extraPosts from '../data/extra-posts.json';
import sectorContent from '../data/sector-content.json';

export type ImportedPage = (typeof website.pages)[number];
export type AlternatePage = ImportedPage['alternates'][number];

// extra-posts.json guarda las noticias añadidas a mano: así no las pisa una nueva importación de in2ai.com
// sector-content.json reescribe título, descripción y texto de las páginas de sector (por ruta), también a salvo de una nueva importación
const rewritten = (page: ImportedPage): ImportedPage => ({ ...page, ...(sectorContent as Record<string, Partial<ImportedPage>>)[page.path] });
export const importedPages: ImportedPage[] = [...website.pages.map(rewritten), ...extraPosts];
export const blogPosts = importedPages
  .filter((page) => page.kind === 'post')
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPage(path: string) {
  return importedPages.find((page) => page.path === path);
}
