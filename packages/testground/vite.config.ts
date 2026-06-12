import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import gfont from 'vite-plugin-gfont';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vueSrc = path.resolve(__dirname, '../vue/src');
const reactSrc = path.resolve(__dirname, '../react/src');
const svelteSrc = path.resolve(__dirname, '../svelte/src');

export default defineConfig({
  plugins: [
    vue(),
    // scope the react plugin to react demos so it never touches vue/svelte sources
    react({ include: [/demos[\\/]react[\\/].*\.tsx?$/] }),
    svelte(),
    gfont({
      fonts: [
        {
          family: 'Quicksand',
          styles: [400, 500, 600, 700],
        },
      ],
    }),
  ],
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
  build: {
    outDir: 'dist-testground',
    sourcemap: false,
    minify: true,
  },
});
