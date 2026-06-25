import path from 'node:path';
import { fileURLToPath } from 'node:url';

import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

import { previewPlugin } from './src/vite/preview-plugin.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vueSrc = path.resolve(__dirname, '../vue/src');
const reactSrc = path.resolve(__dirname, '../react/src');
const svelteSrc = path.resolve(__dirname, '../svelte/src');
const testgroundDevOrigin = process.env.ANYUI_TESTGROUND_DEV_ORIGIN ?? 'http://127.0.0.1:5174';

export default defineConfig({
  site: 'https://anyui.pwp.sh',
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
  integrations: [
    vue({ appEntrypoint: '/src/vue-app' }),
    svelte(),
  ],
  vite: {
    plugins: [previewPlugin()],
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
