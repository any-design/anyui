import { onBeforeUnmount, onMounted, ref } from 'vue';

const STORAGE_KEY = 'anyui-site-prefs';

const readPrefs = (): Record<string, unknown> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const writePrefs = (next: Record<string, unknown>) => {
  const prefs = { ...readPrefs(), ...next };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

const applyPrefs = (nextDark: boolean, nextGlass: boolean) => {
  const html = document.documentElement;
  html.setAttribute('theme', nextDark ? 'dark' : 'light');
  if (nextGlass) {
    html.setAttribute('data-anyui-style', 'glass');
  } else {
    html.removeAttribute('data-anyui-style');
  }
};

export const useSitePrefs = () => {
  const dark = ref(false);
  const glass = ref(false);

  const syncPrefs = () => {
    const prefs = readPrefs();
    dark.value = document.documentElement.getAttribute('theme') === 'dark' || prefs.dark === true;
    glass.value =
      document.documentElement.getAttribute('data-anyui-style') === 'glass' || prefs.glass === true;
    applyPrefs(dark.value, glass.value);
  };

  const toggleDark = () => {
    dark.value = !dark.value;
    applyPrefs(dark.value, glass.value);
    writePrefs({ dark: dark.value });
  };

  const toggleGlass = () => {
    glass.value = !glass.value;
    applyPrefs(dark.value, glass.value);
    writePrefs({ glass: glass.value });
  };

  onMounted(() => {
    syncPrefs();
    document.addEventListener('astro:after-swap', syncPrefs);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('astro:after-swap', syncPrefs);
  });

  return {
    dark,
    glass,
    toggleDark,
    toggleGlass,
    syncPrefs,
  };
};