import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  external: ['react', 'react-dom', '@iconify/react'],
  format: ['esm'],
  outDir: '../../dist/react',
  outExtension: () => ({
    js: '.mjs',
  }),
  sourcemap: true,
});
