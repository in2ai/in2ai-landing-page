import website from '../data/website.json';

export type ImportedPage = (typeof website.pages)[number];
export type AlternatePage = ImportedPage['alternates'][number];

export const importedPages = website.pages;
export const blogPosts = importedPages
  .filter((page) => page.kind === 'post')
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPage(path: string) {
  return importedPages.find((page) => page.path === path);
}
