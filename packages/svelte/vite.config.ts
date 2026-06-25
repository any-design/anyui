import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const svelteDistDir = path.resolve(rootDir, './dist/svelte');

export default defineConfig({
  plugins: [
    svelte(),
    dts({
      entryRoot: path.resolve(__dirname, './src'),
      exclude: ['vite.config.ts'],
      outDirs: [svelteDistDir],
    }),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: svelteDistDir,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'AnyUISvelte',
      fileName: () => 'index.mjs',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['svelte', 'qrcode'],
    },
  },
});
