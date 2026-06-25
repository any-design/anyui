// Build-time helper that materializes each ```vue code block from the
// component docs into a real .vue file under a generated directory, so the
// component detail pages can render live previews as ordinary Vue islands —
// no runtime template compiler, no virtual-module gymnastics.
//
// The generated directory `src/.anyui-previews/` holds one .vue file per
// renderable ```vue block, named `<slug>__<subfolder>-<index>.vue`. A
// `registry.ts` next to it re-exports them as a lazy-import map keyed by
// `<slug>__<subfolder>-<index>` so PreviewFrame.vue can resolve a preview by
// that key and each preview chunk only loads when its island hydrates
// (client:visible).
//
// The doc import path `@any-design/anyui/vue` (slash) is rewritten to the real
// package name `@any-design/anyui-vue` (dash) so Vite's alias resolves it.
//
// Blocks without a <template> (pure `import` snippets) are skipped — they
// aren't renderable.

import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface VueBlock {
  key: string; // <slug>__<subfolder>-<index>
  file: string; // output filename
  code: string;
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));
// __dirname = packages/website/src/vite
// PREVIEWS_DIR  → packages/website/src/.anyui-previews   (..)
// DOCS_DIR      → repo-root/docs/components              (../../../../docs/components)
const PREVIEWS_DIR = resolve(__dirname, '..', '.anyui-previews');
const DOCS_COMPONENTS_DIR = resolve(__dirname, '..', '..', '..', '..', 'docs', 'components');

function extractVueBlocks(md: string): string[] {
  const blocks: string[] = [];
  const re = /```vue\s*\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

// Rewrite the slash-style doc import paths to the real (dash) package names so
// Vite's resolve aliases pick them up. Only the vue path is needed for previews
// but rewrite react/svelte too for safety.
function rewriteImports(code: string): string {
  return code
    .replace(/@any-design\/anyui\/vue/g, '@any-design/anyui-vue')
    .replace(/@any-design\/anyui\/react/g, '@any-design/anyui-react')
    .replace(/@any-design\/anyui\/svelte/g, '@any-design/anyui-svelte');
}

// Slugs whose examples render overlays (dialogs, drawers, popups, masks…).
// Two issues make their doc snippets unusable as live previews:
//   1. Some use `const x = ref(true)` to demonstrate the open state, which
//      would auto-pop the overlay the moment the preview island mounts.
//   2. Some never declare the bound variable at all (no <script setup>) and
//      have no trigger, so the overlay can't open and the preview is blank.
// We force overlays to start closed, inject a missing `ref(false)` + script
// block, and add an <AButton> trigger when the template has no handler that
// opens the overlay.
const OVERLAY_SLUGS = new Set([
  'dialog',
  'drawer',
  'popup',
  'float',
  'confirmModal',
  'loadingMask',
]);

// Collect every identifier bound via `v-model="x"` in the template so we can
// spot overlay bindings that were never declared in a <script> block.
function collectVModelVars(code: string): string[] {
  const re = /v-model(?::[\w-]+)?\s*=\s*"([A-Za-z_$][\w$]*)"/g;
  const vars = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) vars.add(m[1]);
  return [...vars];
}

function injectScriptSetup(code: string, scriptSrc: string): string {
  // If a <script> block already exists, append to it; otherwise create one.
  const scriptBlockRe = /<script\b[^>]*>([\s\S]*?)<\/script>/;
  if (scriptBlockRe.test(code)) {
    return code.replace(scriptBlockRe, (full, inner) => {
      return full.replace(inner, `${inner}\n${scriptSrc}`);
    });
  }
  // No script block — append one after the closing </template>.
  const templateClose = /<\/template>/;
  if (templateClose.test(code)) {
    return code.replace(
      templateClose,
      `</template>\n\n<script setup>\nimport { ref } from 'vue';\n${scriptSrc}</script>`,
    );
  }
  return `${code}\n\n<script setup>\nimport { ref } from 'vue';\n${scriptSrc}</script>`;
}

function rewriteOverlayAutoOpen(slug: string, code: string): string {
  if (!OVERLAY_SLUGS.has(slug)) return code;
  // find `const <name> = ref(true)` and flip to ref(false); remember the name
  // so we can inject a trigger button if the template never opens it.
  const refTrueRe = /const\s+([A-Za-z_$][\w$]*)\s*=\s*ref\(true\)/g;
  const openedVars: string[] = [];
  let transformed = code.replace(refTrueRe, (_m, name) => {
    openedVars.push(name);
    return `const ${name} = ref(false)`;
  });

  // Now handle overlay bindings that were never declared at all (no script).
  // For each v-model var, if there's no `const <var> = ref(...)` anywhere,
  // synthesize one starting closed.
  const declaredRe = (v: string) =>
    new RegExp(`const\\s+${v}\\s*=\\s*ref\\(`);
  const missingVars: string[] = [];
  for (const v of collectVModelVars(transformed)) {
    if (!declaredRe(v).test(transformed)) missingVars.push(v);
  }
  if (missingVars.length > 0) {
    const scriptSrc = missingVars
      .map((v) => `const ${v} = ref(false);`)
      .join('\n');
    transformed = injectScriptSetup(transformed, scriptSrc);
    openedVars.push(...missingVars);
  }

  if (openedVars.length === 0) return transformed;

  // for each flipped var, check the template for a handler that sets it true.
  // if none, inject an <AButton> trigger at the top of the <template>.
  for (const v of openedVars) {
    const opensIt = new RegExp(`${v}\\s*=\\s*true|${v}\\.value\\s*=\\s*true`).test(transformed);
    if (opensIt) continue;
    // inject a trigger button right after the opening <template ...> tag
    transformed = transformed.replace(
      /<template([^>]*)>/,
      `<template$1>\n  <AButton type="primary" @click="${v} = true">Open</AButton>`,
    );
  }
  return transformed;
}

function scanBlocks(): VueBlock[] {
  const out: VueBlock[] = [];
  if (!existsSync(DOCS_COMPONENTS_DIR)) return out;
  const folders = readdirSync(DOCS_COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  for (const folder of folders) {
    const slug = folder;
    const inner = join(DOCS_COMPONENTS_DIR, folder);
    const subfolders = readdirSync(inner, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const sub of subfolders) {
      const enFile = join(inner, sub, `${sub}_English.md`);
      if (!existsSync(enFile)) continue;
      const md = readFileSync(enFile, 'utf8');
      const blocks = extractVueBlocks(md);
      blocks.forEach((code, index) => {
        if (!/<template[\s>]/i.test(code)) return;
        const key = `${slug}__${sub}-${index}`;
        const file = `${slug}__${sub}-${index}.vue`;
        out.push({ key, file, code: rewriteOverlayAutoOpen(slug, rewriteImports(code)) });
      });
    }
  }
  return out;
}

// Generate the .anyui-previews directory + registry.ts. Idempotent: clears the
// dir first so stale previews from removed examples don't linger.
export function generatePreviews(): VueBlock[] {
  const blocks = scanBlocks();
  rmSync(PREVIEWS_DIR, { recursive: true, force: true });
  mkdirSync(PREVIEWS_DIR, { recursive: true });

  for (const b of blocks) {
    writeFileSync(join(PREVIEWS_DIR, b.file), b.code, 'utf8');
  }

  const lines = blocks.map(
    (b) => `  ${JSON.stringify(b.key)}: () => import('./${b.file}'),`,
  );
  const registry = `// AUTO-GENERATED by vite/preview-plugin.ts — do not edit.
// One lazy importer per fenced vue code block found in the component docs.
export default {\n${lines.join('\n')}\n};
`;
  writeFileSync(join(PREVIEWS_DIR, 'registry.ts'), registry, 'utf8');
  return blocks;
}

// Vite plugin: generate previews once before the build so the .vue files exist
// when @vitejs/plugin-vue scans them. In dev, regenerate on doc changes.
export function previewPlugin() {
  let generated = false;
  const ensureGenerated = () => {
    if (!generated) {
      generatePreviews();
      generated = true;
    }
  };
  return {
    name: 'anyui-preview',
    enforce: 'pre' as const,
    configResolved() {
      ensureGenerated();
    },
    configureServer(server: any) {
      ensureGenerated();
      server.watcher.on('change', (file: string) => {
        if (file.includes('docs/components/')) {
          generatePreviews();
        }
      });
    },
  };
}