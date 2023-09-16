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

export type IconMeta =
  | {
      name: string;
      icon: IconifyIcon;
    }
  | [string, IconifyIcon];

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
    icons.forEach((meta) => {
      try {
        if (Array.isArray(meta)) {
          addIcon(meta[0], meta[1]);
        } else if (typeof meta === 'object') {
          addIcon(meta.name, meta.icon);
        } else {
          throw new Error('Invalid icon meta data.');
        }
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
