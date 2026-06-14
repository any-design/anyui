// Minimal i18n for the AnyUI website.
//
// The site keeps a single URL per page and swaps content client-side via a
// `data-lang` attribute on the root container. The active language is persisted
// in localStorage alongside the dark/glass prefs, and read on boot to avoid a
// flash of the wrong language.

export type Lang = 'en' | 'zh';

export const LANGS: Lang[] = ['en', 'zh'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'EN',
  zh: '中文',
};

// UI chrome strings. Component docs live in Markdown and are toggled by data-lang,
// so these only cover labels that appear in layout chrome.
type StringKey =
  | 'nav.docs'
  | 'nav.components'
  | 'nav.testground'
  | 'nav.github'
  | 'lang.label'
  | 'components.title'
  | 'components.intro';

export const STRINGS: Record<Lang, Record<StringKey, string>> = {
  en: {
    'nav.docs': 'Docs',
    'nav.components': 'Components',
    'nav.testground': 'Testground',
    'nav.github': 'GitHub',
    'lang.label': 'Language',
    'components.title': 'Components',
    'components.intro':
      'Every component in AnyUI, in all three frameworks. Pick one from the sidebar to see its props, events, slots and usage.',
  },
  zh: {
    'nav.docs': '文档',
    'nav.components': '组件',
    'nav.testground': '试验场',
    'nav.github': 'GitHub',
    'lang.label': '语言',
    'components.title': '组件',
    'components.intro':
      'AnyUI 的全部组件，覆盖三大框架。在左侧选择组件查看其属性、事件、插槽与用法。',
  },
};

export function t(lang: Lang, key: StringKey): string {
  return STRINGS[lang][key];
}
