import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import gfont from 'vite-plugin-gfont';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const srcDir = path.resolve(__dirname, './src');
const vueDistDir = path.resolve(rootDir, './dist/vue');

const dtsOptions = {
  entryRoot: srcDir,
  outDir: vueDistDir,
  exclude: ['src/testground/**'],
};

const BUILD_CONFIGS = {
  LIBRARY: {
    plugins: [vue(), vueJsx(), dts(dtsOptions)],
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
    build: {
      sourcemap: true,
      minify: 'terser',
      outDir: vueDistDir,
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        name: 'anyui',
        fileName: () => 'anyui.mjs',
        formats: ['es'],
      },
      rollupOptions: {
        external: [
          'vue',
          '@iconify/vue',
          '@popperjs/core',
        ],
      },
      cssCodeSplit: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/global/vars.scss" as *;`,
        },
      },
    },
  },
  RESOLVER: {
    plugins: [dts(dtsOptions)],
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      outDir: vueDistDir,
      lib: {
        name: 'AnyUIResolver',
        entry: path.resolve(__dirname, './src/resolver.ts'),
        fileName: (format: string) => (format === 'cjs' ? 'resolver.cjs' : 'resolver.mjs'),
        formats: ['es', 'cjs'],
      },
      emptyOutDir: false,
      cssCodeSplit: false,
    },
  },
  TESTGROUND: {
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      gfont({
        fonts: [
          {
            family: 'Quicksand',
            styles: [400, 500, 600, 700],
          },
        ],
      }),
    ],
    build: {
      outDir: 'dist-testground',
      sourcemap: false,
      minify: true,
    },
  },
};

if (!process.env.BUILD_TARGET) {
  throw new Error('No build target.');
}

export default defineConfig(BUILD_CONFIGS[process.env.BUILD_TARGET]);
