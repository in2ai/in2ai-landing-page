import type { OfferId, SectorId, ServiceId, StatId } from '../lib/content';

/** Enlace a una página interior. `hreflang` marca las que solo existen en otro idioma. */
export interface Link {
  label: string;
  href: string;
  hreflang?: string;
}

/**
 * Titular con un mini formato que pinta src/components/Rich.astro:
 * "\n" es un salto de línea y lo que va entre *asteriscos* sale hueco (solo contorno).
 */
type Headline = string;

/** Texto con un tramo resaltado en medio. */
interface Marked {
  before: string;
  mark: string;
  after: string;
}

interface Item {
  t: string;
  d: string;
}

/**
 * Todo el texto de la landing en un idioma. Los arrays con longitud fija van como
 * tuplas porque los mockups los cruzan, por posición, con iconos y cifras.
 */
export interface Dictionary {
  meta: { title: string; description: string; ogLocale: string };
  /** ids de las secciones: las anclas de la URL también van traducidas */
  anchors: Record<'method' | 'services' | 'offer' | 'products' | 'sectors' | 'privacy' | 'contact', string>;
  header: { solutions: string; sectors: string; products: string; contact: string; openMenu: string; language: string };
  /** páginas del menú y del pie, en orden */
  pages: Link[];
  legal: { notice: Link; privacy: Link; cookies: Link };

  hero: {
    eyebrow: string;
    title: Headline;
    text: string;
    cta: string;
    secondary: string;
    note: string;
    badge: { title: string; text: string };
  };
  method: { eyebrow: string; title: Headline; text: string; steps: [Item, Item, Item, Item]; statsEyebrow: string };
  stats: Record<StatId, string>;
  services: {
    title: Headline;
    text: string;
    more: string;
    /** «Más información sobre …», solo para lectores de pantalla */
    moreAbout: string;
    items: Record<ServiceId, { name: string; text: string; tags: string[]; url: string }>;
  };
  offer: { eyebrow: string; title: Headline; text: string; items: Record<OfferId, Item> };
  products: {
    title: Headline;
    text: string;
    kicker: string;
    asm2: { claim: string; text: string; points: string[] };
    mecopia: { claim: string; text: string; points: string[] };
  };
  custom: {
    badge: string;
    title: Headline;
    text: string;
    vision: { title: string; caption: string };
    nlp: { title: string; caption: string };
  };
  keywords: string[];
  sectors: { title: Headline; text: string; items: Record<SectorId, { name: string; url: string }> };
  privacy: {
    eyebrow: string;
    title: Headline;
    text: string;
    network: string;
    flow: [string, string, string, string];
    internet: string;
    notNeeded: string;
    items: Item[];
  };
  statement: { eyebrow: string } & Marked;
  about: {
    eyebrow: string;
    title: Headline;
    text: string;
    team: string;
    research: string;
    researchText: string;
  };
  news: { eyebrow: string; title: Headline; all: string; read: string };
  contact: {
    title: Headline;
    text: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      consent: Marked;
      submit: string;
      deliveryNote: string;
    };
  };
  footer: {
    solutions: string;
    sectors: string;
    products: string;
    company: string;
    offices: string;
    asm2: string;
    mecopia: string;
  };
  offices: { name: string; lines: string[] }[];

  /** Textos de los mockups de producto (src/components/mock). */
  mocks: {
    chat: {
      title: string;
      status: string;
      sources: string;
      question: string;
      calls: string[];
      retrieved: string;
      answer: Marked;
      citations: string[];
      typing: string;
      input: string;
      send: string;
      footer: string;
    };
    console: {
      url: string;
      nav: [string, string, string, string, string];
      kpis: [{ label: string; delta: string }, { label: string; delta: string }, { label: string; delta: string }];
      ownServer: string;
      ownServerNote: [string, string];
      indexTitle: string;
      lastSync: string;
      chartTitle: string;
      legend: [string, string];
      columns: [string, string, string, string];
      folders: [string, string, string, string];
    };
    doc: {
      file: string;
      pages: string;
      summary: string;
      analysing: string;
      extracted: string;
      fields: [{ k: string; v: string }, { k: string; v: string }, { k: string; v: string }, { k: string; v: string }];
      flagged: string;
      review: string;
    };
    vision: {
      title: string;
      fps: string;
      inference: string;
      shift: string;
      metrics: [string, string, string];
      latest: string;
      labels: { part: string; defect: string };
      flagged: string;
      alert: string;
    };
    phone: {
      subtitle: string;
      savings: string;
      /** el símbolo va antes o después según el idioma: 42,80 € / €42.80 */
      currency: { prefix: string; suffix: string };
      savingsNote: string;
      found: string;
      tasks: [{ t: string; s: string; v: string }, { t: string; s: string; v: string }, { t: string; s: string; v: string }];
      cta: string;
      footer: string;
    };
  };
}
