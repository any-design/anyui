import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import gfont from 'vite-plugin-gfont';

const BUILD_CONFIGS = {
  LIBRARY: {
    plugins: [vue(), dts()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
      minify: 'terser',
      outDir: 'lib',
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        name: 'anyui',
        fileName: () => 'anyui.esm.js',
        formats: ['es'],
      },
      rollupOptions: {
        external: [
          'vue',
          'mitt',
          'async-validator',
          'lottie-web',
          '@iconify/vue',
          '@popperjs/core',
          '@popperjs/core/lib/popper-lite',
          '@popperjs/core/lib/enums',
          '@popperjs/core/lib/modifiers/preventOverflow',
          '@popperjs/core/lib/modifiers/offset',
          '@popperjs/core/lib/modifiers/flip',
        ],
      },
      cssCodeSplit: false,
    },
  },
  TESTGROUND: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
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
