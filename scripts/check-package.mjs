import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtemp,
  mkdir,
  readdir,
  readFile,
  realpath,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build, createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Exercise the tarball, without workspace aliases, to catch missing exports,
// browser-only SSR bundles, and declarations that reject ordinary usage.
const root = await realpath(join(dirname(fileURLToPath(import.meta.url)), '..'));
const temp = await mkdtemp(join(tmpdir(), 'anyui-package-'));
let server;
try {
  const [pack] = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--pack-destination', temp], {
      cwd: root,
      encoding: 'utf8',
    }),
  );
  const modules = join(temp, 'node_modules');
  const installed = join(modules, '@any-design', 'anyui');
  await mkdir(installed, { recursive: true });
  execFileSync('tar', ['-xzf', join(temp, pack.filename), '-C', installed, '--strip-components=1']);
  // Reuse installed peers, but resolve AnyUI itself exclusively from its tarball.
  for (const entry of await readdir(join(root, 'node_modules'))) {
    if (entry.startsWith('.') || entry === '@any-design') continue;
    await symlink(join(root, 'node_modules', entry), join(modules, entry), 'dir');
  }
  await writeFile(join(temp, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  await writeFile(
    join(temp, 'frameworks.mjs'),
    `
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button as VueButton, AButton } from '@any-design/anyui';
import { Button as VueSubpathButton } from '@any-design/anyui/vue';
import { Button as ReactButton } from '@any-design/anyui/react';
import { AnyUIResolver } from '@any-design/anyui/resolver';
const require = createRequire(import.meta.url);
assert.equal(VueButton, AButton);
assert.equal(VueButton, VueSubpathButton);
assert.match(await renderToString(h(VueButton, {}, () => 'Vue package')), /Vue package/);
assert.match(renderToStaticMarkup(createElement(ReactButton, {}, 'React package')), /React package/);
assert.ok(AnyUIResolver().resolve('AButton'));
assert.ok(require('@any-design/anyui/vue/resolver').AnyUIResolver().resolve('AButton'));
for (const style of ['index.css', 'index.scss', 'components/button.css', 'components/tabs.css']) {
  assert.ok(require.resolve('@any-design/anyui/styles/' + style));
}
`,
  );
  await import(pathToFileURL(join(temp, 'frameworks.mjs')).href);
  console.log('Packed Vue/React SSR, resolver, aliases, and style exports passed.');

  await writeFile(
    join(temp, 'Consumer.svelte'),
    `
<script lang="ts">
  import { Button, Tabs, Tab, TabPanel } from '@any-design/anyui/svelte';
  let clicks = $state(0);
</script>
<Button onClick={() => clicks++}>Svelte package {clicks}</Button>
<Tabs>
  <Tab>First tab</Tab><Tab>Second tab</Tab>
  <TabPanel>First packed panel</TabPanel><TabPanel>Second packed panel</TabPanel>
</Tabs>
`,
  );
  const config = {
    root: temp,
    configFile: false,
    logLevel: 'error',
    plugins: [svelte({ configFile: false })],
    ssr: { noExternal: ['@any-design/anyui', '@iconify/svelte'] },
  };
  server = await createServer({ ...config, server: { middlewareMode: true } });
  const { default: Consumer } = await server.ssrLoadModule('/Consumer.svelte');
  const { render } = await server.ssrLoadModule('svelte/server');
  const result = render(Consumer);
  const html = result.body ?? result.html;
  assert.match(html, /Svelte package 0/);
  assert.match(html, /First packed panel/);
  assert.doesNotMatch(html, /Second packed panel/);
  assert.match(html, /role="tab"[^>]*aria-selected="true"/);
  await server.close();
  server = undefined;
  await build({
    ...config,
    build: {
      write: false,
      lib: { entry: join(temp, 'Consumer.svelte'), formats: ['es'], fileName: 'consumer' },
    },
  });
  console.log('Packed Svelte SSR, default tab selection, and client compilation passed.');

  const entry = await readFile(join(installed, 'dist/svelte/index.d.ts'), 'utf8');
  const components = [
    ...entry.matchAll(/export \{ default as (\w+) \} from ['"]\.\/components\//g),
  ].map((match) => match[1]);
  assert.ok(components.length > 50, 'Expected the full Svelte component surface');
  await writeFile(
    join(temp, 'consumer.ts'),
    `
import type { ComponentProps } from 'svelte';
import * as Svelte from '@any-design/anyui/svelte';
import { Button as ReactButton } from '@any-design/anyui/react';
import { createElement } from 'react';
import { Button as VueButton } from '@any-design/anyui/vue';
import { h } from 'vue';
import { AnyUIResolver } from '@any-design/anyui/resolver';
${components.map((name) => `const ${name}Props = {} satisfies ComponentProps<typeof Svelte.${name}>;`).join('\n')}
const button = { type: 'primary', onClick: () => {} } satisfies ComponentProps<typeof Svelte.Button>;
const tabs = { modelValue: 'second', onChange: () => {} } satisfies ComponentProps<typeof Svelte.Tabs>;
createElement(ReactButton, { type: 'primary' }, 'React');
h(VueButton, { type: 'primary' });
AnyUIResolver({ styleType: 'css' });
`,
  );
  await writeFile(
    join(temp, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        esModuleInterop: true,
        skipLibCheck: true,
        types: [],
      },
      files: ['consumer.ts'],
    }),
  );
  execFileSync(
    process.execPath,
    [join(root, 'node_modules/typescript/bin/tsc'), '-p', join(temp, 'tsconfig.json')],
    {
      cwd: temp,
      stdio: 'inherit',
    },
  );
  console.log(
    `Packed declarations passed (${components.length} Svelte components and Vue/React consumers).`,
  );
  console.log(`Package verified: ${pack.filename}`);
} finally {
  await server?.close();
  await rm(temp, { recursive: true, force: true });
}
