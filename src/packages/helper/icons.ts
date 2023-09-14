import {
  addIcon,
  addCollection,
  IconifyIcon,
  IconifyJSON,
  IconifyIconName,
  loadIcons,
  IconifyIconLoaderAbort,
  enableCache as enableIconCache,
  IconifyBrowserCacheType,
} from '@iconify/vue';

export interface IconMeta {
  name: string;
  icon: IconifyIcon;
}

export interface IconSetupOptions {
  // for offline usage
  icons?: IconMeta[];
  collections?: IconifyJSON[];
  // for online usage
  prefetchIcons?: (string | IconifyIconName)[];
  enableCache?: boolean;
  cacheType?: IconifyBrowserCacheType;
}

/**
 * Setup Iconify at startup
 */
export const setupIcons = (setupOptions: IconSetupOptions = {}) => {
  const { icons, collections, prefetchIcons, enableCache, cacheType } = setupOptions;

  if (Array.isArray(icons)) {
    icons.forEach(({ name, icon }) => {
      try {
        addIcon(name, icon);
      } catch (error) {
        console.error('Failed to intialize icons:', error);
      }
    });
  }

  if (Array.isArray(collections)) {
    collections.forEach((collection) => {
      addCollection(collection);
    });
  }

  if (enableCache) {
    enableIconCache(cacheType || 'local');
  }

  const hasPrefetchIcons = Array.isArray(prefetchIcons);

  let abortPrefetch: IconifyIconLoaderAbort | undefined;
  if (hasPrefetchIcons) {
    abortPrefetch = loadIcons(prefetchIcons);
  }

  return {
    ...(hasPrefetchIcons ? { abortPrefetch } : null),
  };
};
