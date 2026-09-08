export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

// Preserve authored anchors and give generated headings stable, unique IDs,
// including headings with the same text in the two language panes.
export function prepareHeadings(doc: Document) {
  const used = new Set<string>();
  doc
    .querySelectorAll<HTMLElement>('.doc-body h1, .doc-body h2, .doc-body h3')
    .forEach((heading, index) => {
      const base =
        heading.id ||
        (heading.textContent || '')
          .toLowerCase()
          .trim()
          .replace(/[^\p{L}\p{N}\s-]/gu, '')
          .replace(/\s+/g, '-') ||
        `section-${index + 1}`;
      let id = base;
      let suffix = 1;
      while (used.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      used.add(id);
    });
}

export function visibleHeadings(): HTMLElement[] {
  const lang = document.documentElement.dataset.lang || 'en';
  return Array.from(document.querySelectorAll<HTMLElement>('.doc-body h2, .doc-body h3')).filter(
    (heading) => {
      const pane = heading.closest<HTMLElement>('.localized-doc__pane');
      return !pane || pane.dataset.lang === lang;
    },
  );
}
