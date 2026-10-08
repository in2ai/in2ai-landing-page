import { wp } from '../lib/content';
import type { Dictionary } from './types';

/**
 * British English, matching the existing English copy on in2ai.com/en/.
 * Links preserve the original routes, now served by this project.
 */
const en: Dictionary = {
  meta: {
    title: 'In2AI — Artificial Intelligence (AI) Consulting and Solutions',
    description:
      'We are a company specialised in artificial intelligence that helps businesses transform digitally through artificial intelligence.',
    ogLocale: 'en_GB',
  },
  anchors: {
    method: 'methodology',
    services: 'services',
    offer: 'what-we-offer',
    products: 'products',
    sectors: 'sectors',
    privacy: 'privacy',
    contact: 'contact',
  },
  header: {
    solutions: 'Solutions',
    sectors: 'Sectors',
    products: 'Products',
    contact: 'Contact',
    openMenu: 'Open menu',
    language: 'Language',
  },
  // the blog is only published in Spanish, as on in2ai.com/en/
  pages: [
    { label: 'Our team', href: `${wp}/en/ourteam/` },
    { label: 'R&D', href: `${wp}/en/rd/` },
    { label: 'Blog', href: `${wp}/blog/`, hreflang: 'es' },
  ],
  legal: {
    notice: { label: 'Legal notice', href: `${wp}/en/avisolegal/` },
    privacy: { label: 'Privacy policy', href: `${wp}/en/privacypolicy/` },
    cookies: { label: 'Cookies', href: `${wp}/en/cookiespolicy/` },
  },

  hero: {
    eyebrow: 'Artificial intelligence company',
    title: 'We are\nexperts in\n*artificial\nintelligence*',
    text: 'At In2AI we help businesses transform digitally through artificial intelligence.',
    cta: 'Tell us your challenge',
    secondary: 'What we do',
    note: 'Artificial intelligence consulting · Madrid and Galicia',
    badge: { title: 'On-premise', text: 'Your documents never leave your network' },
  },
  method: {
    eyebrow: 'Our methodology',
    title: 'We focus\non *business*',
    text: 'And on generating profit through AI. Our methodology guarantees a data-driven value proposition that enables faster, better-informed decisions.',
    steps: [
      { t: 'We identify', d: 'The processes that can be optimised and automated with AI.' },
      { t: 'We analyse', d: 'The data and algorithms that will support decision-making.' },
      { t: 'We organise', d: 'The teams that develop and drive the projects.' },
      { t: 'We promote', d: 'The roll-out of the projects across the whole organisation.' },
    ],
    statsEyebrow: 'AI in figures',
  },
  stats: {
    value: 'in value, on average, for organisations that adopt AI',
    profitability: 'percentage points of profitability that AI can add, on average',
    productivity: 'in productivity that AI can deliver, on average',
    turnover: 'in annual turnover with digitalisation',
    costs: 'in operating costs with digitalisation',
    efficiency: 'in efficiency with digitalisation',
  },
  services: {
    title: 'What *we do*',
    text: 'We add value to your company by transforming its business model with artificial intelligence.',
    more: 'More information',
    moreAbout: 'about',
    items: {
      dataDriven: {
        name: 'Data Driven',
        text: 'We help companies become data-driven and base their decision-making on facts rather than subjectivity and intuition.',
        tags: ['Data audit', 'Metrics', 'Dashboards'],
        url: `${wp}/en/data-driven/`,
      },
      machineLearning: {
        name: 'Machine Learning / Deep Learning',
        text: 'We model data to make predictions and classifications, or to detect features that support decision-making.',
        tags: ['Prediction', 'Classification', 'Time series'],
        url: `${wp}/en/machine-learning/`,
      },
      vision: {
        name: 'Computer Vision',
        text: 'We use models to work with data in image or video format.',
        tags: ['Detection', 'Segmentation', 'Inspection'],
        url: `${wp}/en/artificial-vision/`,
      },
      nlp: {
        name: 'Natural Language Processing (NLP)',
        text: 'We use models to work with data in text and natural-language format.',
        tags: ['NLP', 'Extraction', 'Semantic search'],
        url: `${wp}/en/natural-language-processing-nlp/`,
      },
      generative: {
        name: 'Generative Artificial Intelligence',
        text: 'We explore innovative solutions at the intersection of artificial intelligence and human creativity.',
        tags: ['LLM', 'RAG', 'Assistants'],
        url: `${wp}/en/generative-artificial-intelligence/`,
      },
    },
  },
  offer: {
    eyebrow: 'What we offer',
    title: 'A highly\n*experienced team*',
    text: 'Solving our clients’ needs through artificial intelligence consulting.',
    items: {
      adaptation: { t: 'Adaptation', d: 'We adapt to our clients’ needs.' },
      innovation: {
        t: 'Innovation',
        d: 'We are an open-innovation company in artificial intelligence. We drive new services and products.',
      },
      knowledge: {
        t: 'Knowledge',
        d: 'Through data we deliver value and key insight for the business. We use data to make decisions.',
      },
      benefits: {
        t: 'Benefits',
        d: 'If a project does not guarantee a benefit for the client, we do not take it on. We empower people to add more value to the company.',
      },
    },
  },
  products: {
    title: 'Our own *products*',
    text: 'Two products in active development, built on the same foundation we use for custom projects.',
    kicker: 'In-house product',
    asm2: {
      claim: 'The chat that knows your company’s documentation',
      text: 'An enterprise RAG deployed on your company’s own servers. You choose which OneDrive, Google Drive, Dropbox or SharePoint folders to index, and your employees ask questions in a chat: procedures, collective agreements, contracts or the manual for that machine nobody can find.',
      points: [
        'Deployed on your infrastructure: documents never leave your network',
        'Connectors for OneDrive, Google Drive, Dropbox and SharePoint',
        'Respects each folder’s permissions: every employee sees only what they should',
        'Every answer cites the exact document and page',
      ],
    },
    mecopia: {
      claim: 'A digital twin that handles your paperwork',
      text: 'Mecopia learns from your data and works for you: it finds job offers that match your real profile, reviews your electricity bill to spot what you are overpaying, and suggests the next concrete step for every task.',
      points: [
        'Job offers filtered by how well they really fit your profile',
        'Bill review: contracted power, tariff and consumption',
        'Concrete actions, not reports nobody reads',
        'Your data is yours and you can delete it whenever you like',
      ],
    },
  },
  custom: {
    badge: '03 · Custom',
    title: 'Models trained\non *your data*',
    text: 'Line inspection, counting, defect detection or field extraction from contracts. Inference runs at the edge or on your own server, without sending video or documents to anyone else’s cloud.',
    vision: { title: 'Computer vision', caption: 'Local inference · 22 ms per frame' },
    nlp: { title: 'Natural language', caption: 'Fields extracted from a 34-page contract' },
  },
  keywords: [
    'Artificial intelligence company',
    'AI consulting',
    'Generative AI',
    'Machine learning',
    'Deep learning',
    'Computer vision',
    'Data analytics',
    'NLP',
    'LLM',
  ],
  sectors: {
    title: 'AI for *your industry*',
    text: 'Every industry has its own data and processes. Discover how we apply artificial intelligence to yours.',
    items: {
      retail: { name: 'Retail', url: `${wp}/en/retail/` },
      utilities: { name: 'Utilities', url: `${wp}/en/utilities/` },
      manufacturing: { name: 'Manufacturing', url: `${wp}/en/manufacturing/` },
      health: { name: 'Healthcare', url: `${wp}/en/health/` },
      transport: { name: 'Transport', url: `${wp}/en/transport/` },
      finance: { name: 'Finance and Insurance', url: `${wp}/en/finances-and-insurances/` },
      tourism: { name: 'Tourism', url: `${wp}/en/tourism/` },
      telecom: { name: 'Telecommunications', url: `${wp}/en/telecom/` },
      pharma: { name: 'Pharmaceuticals', url: `${wp}/en/pharma/` },
    },
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your data\n*stays in-house*',
    text: 'It is the reason most of our clients call us. They work with information that cannot be uploaded to a third-party service: case files, contracts, medical records, blueprints. By default, our architecture keeps everything inside.',
    network: 'Your network · your server',
    flow: ['Documents', 'Vector index', 'Model', 'Chat'],
    internet: 'Internet access',
    notNeeded: 'not required',
    items: [
      {
        t: 'Deployed on your premises',
        d: 'ASM2 and our custom products are installed on your server or private cloud. Documents never leave your network.',
      },
      { t: 'No training on your data', d: 'Your information does not feed any model. It is used to answer you and nothing else.' },
      {
        t: 'Inherited permissions',
        d: 'The index respects the permissions of the source folders. Nobody can reach through the chat what they could not open on their network drive.',
      },
      {
        t: 'GDPR and AI Act by design',
        d: 'Built into the architecture from the first sprint, not patched in just before going live.',
      },
    ],
  },
  statement: {
    eyebrow: 'We are an artificial intelligence company',
    before:
      'We increase companies’ profits by applying AI: we grow turnover by delivering more value to customers and cut costs by making processes more efficient. The result is a ',
    mark: 'higher ROI',
    after: '.',
  },
  about: {
    eyebrow: 'Our team',
    title: 'The people\nbehind the *AI*',
    text: 'Our team brings together experience in artificial intelligence, mathematics, software development and business management.',
    team: 'Meet our team',
    research: 'Research and development',
    researchText: 'We undertake research, innovation and development activities. Our aim is to develop intelligent solutions to business and social problems, using artificial intelligence.',
  },
  news: { eyebrow: 'Blog', title: 'The latest\nfrom *In2AI*', all: 'All articles', read: 'Read article' },
  contact: {
    title: 'We welcome\nchallenges.\n*Tell us\nyours*',
    text: 'How can we help? Fill in the form or email us and we will help you.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      message: 'Your challenge, in two lines',
      messagePlaceholder: 'We want to forecast demand across our shops and don’t know where to start…',
      consent: { before: 'I have read and accept the ', mark: 'privacy policy', after: '.' },
      submit: 'Prepare email',
      deliveryNote: 'Your email app will open with a draft. You can review it before sending it to info@in2ai.com.',
    },
  },
  footer: {
    solutions: 'Solutions',
    sectors: 'Sectors',
    products: 'Products',
    company: 'In2AI',
    offices: 'Offices',
    asm2: 'ASM2 · On-premise RAG',
    mecopia: 'Mecopia · Digital twin',
  },
  offices: [
    { name: 'Madrid headquarters', lines: ['Calle Roma, 22', '28028 Madrid, Spain'] },
    { name: 'Galicia office', lines: ['Centro de Negocios Arena', 'Avda. Otero Pedrayo', '15570 Narón (A Coruña), Spain'] },
  ],

  mocks: {
    chat: {
      title: 'ASM2 · Document assistant',
      status: '4 indexed folders · 48,312 documents',
      sources: 'Sources',
      question: 'Which PPE is mandatory for working at height under our procedure?',
      calls: [
        '↳ search_index(folders=["/Quality/Procedures"], top_k=6)',
        '↳ filter_permissions(user="a.torres@client.com")',
      ],
      retrieved: '6 chunks · 3 documents · 480 ms',
      answer: {
        before: 'For work above 2 m the procedure requires a ',
        mark: 'double-lanyard harness',
        after: ', a helmet with a chin strap and an approved lifeline. The specific training expires after 3 years.',
      },
      citations: ['HS-014_heights.pdf · p. 7', 'Agreement_2026.docx · art. 12', 'Site_checklist.xlsx'],
      typing: 'looking for the training annex…',
      input: 'And for confined spaces?',
      send: 'Send',
      footer: 'Only answers with documents this user can see · nothing leaves your network',
    },
    console: {
      url: 'asm2.your-company.local',
      nav: ['Overview', 'Sources', 'Index', 'Conversations', 'Permissions'],
      kpis: [
        { label: 'Indexed documents', delta: '4 folders' },
        { label: 'Questions / month', delta: '+34%' },
        { label: 'Average response', delta: 'with citations' },
      ],
      ownServer: 'Own server',
      ownServerNote: ['Nothing leaves your network.', 'v2.4 · internal rack'],
      indexTitle: 'Document index',
      lastSync: 'Last synced 4 min ago',
      chartTitle: 'Employee questions',
      legend: ['queries', 'cache'],
      columns: ['Source', 'Indexed folder', 'Status', 'Docs'],
      folders: ['/Quality/Procedures', '/HR/Agreements', '/Projects/2026', '/Legal/Contracts'],
    },
    doc: {
      file: 'nordia_contract_2026.pdf',
      pages: '34 pp.',
      summary: '12 fields · 1.8 s',
      analysing: 'analysing pages 12–34…',
      extracted: 'Extracted fields',
      fields: [
        { k: 'Counterparty', v: 'Nordia Logistics Ltd.' },
        { k: 'Term', v: '01/01/2026 — 31/12/2028' },
        { k: 'Penalty', v: '2.5% per month' },
        { k: 'Exit clause', v: '90 days’ notice' },
      ],
      flagged: '1 field below threshold',
      review: 'review',
    },
    vision: {
      title: 'line inspection · cam-03',
      fps: '30 fps · at the edge',
      inference: 'local inference · 22 ms / frame',
      shift: 'Current shift',
      metrics: ['Parts inspected', 'Defects detected', 'Validated accuracy'],
      latest: 'Latest detections',
      labels: { part: 'part', defect: 'burr' },
      flagged: '1 part outside threshold',
      alert: 'alert',
    },
    phone: {
      subtitle: 'Your digital twin',
      savings: 'Savings found / month',
      currency: { prefix: '€', suffix: '' },
      savingsNote: 'on 3 of your 7 fixed expenses',
      found: 'Your twin has found',
      tasks: [
        { t: 'Data Engineer · Remote', s: '92% match · new today', v: '€48k' },
        { t: 'Electricity bill', s: 'contracted power too high', v: '−€24.80' },
        { t: 'Home insurance', s: '3 cheaper alternatives', v: '−€118' },
      ],
      cta: 'See the next 3 steps',
      footer: 'Your data is yours · delete it any time',
    },
  },
};

export default en;
