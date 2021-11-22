import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const BUILD_CONFIGS = {
  LIBRARY: {
    plugins: [vue(), dts()],
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
          '@popperjs/core/lib/popper-lite',
          '@popperjs/core/lib/enums',
          '@popperjs/core/lib/modifiers/preventOverflow',
          '@popperjs/core/lib/modifiers/offset',
          '@popperjs/core/lib/modifiers/flip',
        ],
      },
    },
  },
  TESTGROUND: {
    plugins: [vue()],
    build: {
      outDir: 'dist-testground',
      sourcemap: false,
      minify: true,
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(BUILD_CONFIGS[process.env.BUILD_TARGET]);
