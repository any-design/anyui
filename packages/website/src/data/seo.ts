import { COMPONENTS, type ComponentEntry } from './components';

export type SchemaType = 'WebPage' | 'CollectionPage' | 'TechArticle';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  path: string;
  schemaType?: SchemaType;
  breadcrumbs?: BreadcrumbItem[];
}

export interface SitemapEntry {
  path: string;
  priority: number;
  changefreq: 'weekly' | 'monthly';
}

export const SITE = {
  name: 'AnyUI',
  url: 'https://anyui.pwp.sh',
  author: 'Any Design',
  themeColor: '#2f7df6',
  defaultTitle: 'AnyUI - Cute multi-framework design system',
  titleSuffix: 'AnyUI',
  description:
    'AnyUI is a cute, fresh and modern design system and UI component library for Vue, React, and Svelte, with shared tokens and optional liquid glass styling.',
  image: {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'AnyUI design system for Vue, React, and Svelte',
  },
};

export const DOC_PAGES = {
  'getting-started': {
    title: 'Getting Started',
    description:
      'Install AnyUI and learn the recommended setup for Vue, React, and Svelte, including shared styles, registry installs, dark mode, and liquid glass.',
    path: '/docs/getting-started',
  },
  'shadcn-registry': {
    title: 'shadcn Registry Install',
    description:
      'Install AnyUI through the shadcn-compatible GitHub registry, choose the Vue, React, or Svelte adapter, and import components from the generated app-local entrypoint.',
    path: '/docs/shadcn-registry',
  },
  tokens: {
    title: 'Design Tokens',
    description:
      'Explore AnyUI design tokens for radius, motion, elevation, focus rings, surfaces, menu states, and the optional liquid glass style.',
    path: '/docs/tokens',
  },
  theming: {
    title: 'Theme Customization',
    description:
      'Customize AnyUI theme colors, SCSS variables, generated palettes, dark mode selectors, and responsive style output for your product.',
    path: '/docs/theming',
  },
  icons: {
    title: 'Icons',
    description:
      'Use Iconify with AnyUI, configure offline default icons, prefetch icon data, and initialize custom icon collections.',
    path: '/docs/icons',
  },
} as const;

type DocPageId = keyof typeof DOC_PAGES;

const normalizePath = (path: string) => {
  if (!path || path === '/') {
    return '/';
  }
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.replace(/\/$/, '');
};

export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return new URL(normalizePath(path), SITE.url).toString();
};

export const formatTitle = (title?: string) => {
  if (!title) {
    return SITE.defaultTitle;
  }
  return title.includes(SITE.titleSuffix) ? title : `${title} · ${SITE.titleSuffix}`;
};

export const pageSeo = ({
  title,
  description = SITE.description,
  path = '/',
}: {
  title?: string;
  description?: string;
  path?: string;
}) => ({
  title: formatTitle(title),
  description,
  path: normalizePath(path),
  canonicalUrl: absoluteUrl(path),
});

export const homeSeo = (): SeoMetadata => ({
  title: SITE.defaultTitle,
  description: SITE.description,
  path: '/',
  schemaType: 'WebPage',
});

export const componentsOverviewSeo = (): SeoMetadata => ({
  title: 'Components',
  description: `Browse ${COMPONENTS.length} AnyUI components for Vue, React, and Svelte, including usage notes, props, events, slots, and live examples.`,
  path: '/components',
  schemaType: 'CollectionPage',
  breadcrumbs: [
    { name: SITE.name, path: '/' },
    { name: 'Components', path: '/components' },
  ],
});

export const componentSeo = (component: ComponentEntry): SeoMetadata => {
  const componentName = `A${component.name}`;

  return {
    title: componentName,
    description: `${componentName}: ${component.blurb.en} View usage, props, events, slots, and live Vue examples for the AnyUI ${component.name} component.`,
    path: `/components/${component.slug}`,
    schemaType: 'TechArticle',
    breadcrumbs: [
      { name: SITE.name, path: '/' },
      { name: 'Components', path: '/components' },
      { name: componentName, path: `/components/${component.slug}` },
    ],
  };
};

export const docSeo = (id: DocPageId): SeoMetadata => {
  const doc = DOC_PAGES[id];

  return {
    ...doc,
    schemaType: 'TechArticle',
    breadcrumbs: [
      { name: SITE.name, path: '/' },
      { name: 'Docs', path: '/docs/getting-started' },
      { name: doc.title, path: doc.path },
    ],
  };
};

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absoluteUrl('/#organization'),
  name: SITE.author,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/logo.png'),
  sameAs: ['https://github.com/any-design/anyui'],
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: SITE.name,
  url: absoluteUrl('/'),
  description: SITE.description,
  publisher: {
    '@id': absoluteUrl('/#organization'),
  },
  inLanguage: 'en',
});

export const webPageJsonLd = ({
  schemaType = 'WebPage',
  title,
  description,
  canonicalUrl,
}: {
  schemaType?: SchemaType;
  title: string;
  description: string;
  canonicalUrl: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': schemaType,
  '@id': `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: title,
  headline: title,
  description,
  isPartOf: {
    '@id': absoluteUrl('/#website'),
  },
  publisher: {
    '@id': absoluteUrl('/#organization'),
  },
  inLanguage: 'en',
});

export const breadcrumbJsonLd = (breadcrumbs: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const sitemapEntries = (): SitemapEntry[] => [
  { path: '/', priority: 1, changefreq: 'weekly' },
  { path: '/components', priority: 0.9, changefreq: 'weekly' },
  ...Object.values(DOC_PAGES).map((page) => ({
    path: page.path,
    priority: 0.8,
    changefreq: 'monthly' as const,
  })),
  ...COMPONENTS.map((component) => ({
    path: `/components/${component.slug}`,
    priority: 0.7,
    changefreq: 'monthly' as const,
  })),
];
