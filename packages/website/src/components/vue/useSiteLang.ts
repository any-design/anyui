import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Lang } from '../../i18n/lang';

const STORAGE_KEY = 'anyui-site-prefs';

const normalizeLang = (value: unknown): Lang | undefined =>
  value === 'zh' || value === 'en' ? value : undefined;

export const readSiteLang = (): Lang => {
  const rootLang = normalizeLang(document.documentElement.dataset.lang);
  if (rootLang) {
    return rootLang;
  }
  try {
    const prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return normalizeLang(prefs.lang) ?? 'en';
  } catch {
    return 'en';
  }
};

export const useSiteLang = () => {
  const currentLang = ref<Lang>('en');

  const syncLang = (event?: Event) => {
    const detail = event instanceof CustomEvent ? normalizeLang(event.detail) : undefined;
    currentLang.value = detail ?? readSiteLang();
  };

  onMounted(() => {
    syncLang();
    window.addEventListener('anyui:lang-change', syncLang);
    window.addEventListener('anyui:lang-applied', syncLang);
    document.addEventListener('astro:page-load', syncLang);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('anyui:lang-change', syncLang);
    window.removeEventListener('anyui:lang-applied', syncLang);
    document.removeEventListener('astro:page-load', syncLang);
  });

  return {
    currentLang,
    syncLang,
  };
};
