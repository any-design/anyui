import path from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import Components from 'unplugin-vue-components/vite';

import { previewPlugin } from './src/vite/preview-plugin.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vueSrc = path.resolve(__dirname, '../vue/src');
const reactSrc = path.resolve(__dirname, '../react/src');
const svelteSrc = path.resolve(__dirname, '../svelte/src');
const testgroundDevOrigin = process.env.ANYUI_TESTGROUND_DEV_ORIGIN ?? 'http://127.0.0.1:5174';

// Import only the controls used by each island/demo. Registering the whole
// library in appEntrypoint pulled every component into basic guide pages.
const componentFiles = new Map(
  readdirSync(path.join(vueSrc, 'packages'), { recursive: true })
    .filter((file) => /^A[A-Z].*\.vue$/.test(path.basename(file)))
    .map((file) => [path.basename(file, '.vue'), path.join(vueSrc, 'packages', file)]),
);

export default defineConfig({
  site: 'https://anyui.pwp.sh',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  redirects: {
    '/docs': '/docs/getting-started',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
  },
  integrations: [vue(), svelte()],
  vite: {
    plugins: [
      previewPlugin(),
      Components({
        dirs: [],
        dts: false,
        include: [/\/website\/src\/.*\.vue(?:\?.*)?$/],
        resolvers: [
          (name) => {
            const from = componentFiles.get(name);
            if (from) return { name: 'default', from };
          },
        ],
      }),
    ],
    server: {
      proxy: {
        '/testground': {
          target: testgroundDevOrigin,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        // the vue package sources use '@' internally
        '@': vueSrc,
        '@any-design/anyui-vue': path.resolve(vueSrc, 'index.ts'),
        '@any-design/anyui-react': path.resolve(reactSrc, 'index.tsx'),
        '@any-design/anyui-svelte': path.resolve(svelteSrc, 'index.ts'),
      },
      dedupe: ['vue', 'react', 'react-dom', 'svelte'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/global/vars.scss" as *;`,
        },
      },
    },
  },
});
