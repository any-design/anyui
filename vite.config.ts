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
        fileName: () => 'anyui.js',
        formats: ['es'],
      },
      rollupOptions: {
        external: [
          'vue',
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
  RESOLVER: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      outDir: 'lib',
      lib: {
        name: 'AnyUIResolver',
        entry: path.resolve(__dirname, './src/resolver.ts'),
        fileName: (format: string) => (format === 'cjs' ? 'resolver.js' : 'resolver.mjs'),
        formats: ['es', 'cjs'],
      },
      emptyOutDir: false,
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
