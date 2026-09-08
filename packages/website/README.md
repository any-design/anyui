# AnyUI website

The Astro site renders bilingual guides and component references from `docs/`.
Vue islands and live examples import only the AnyUI components they use.

```sh
pnpm run dev
pnpm run typecheck
pnpm run build:website
pnpm run test:website
pnpm audit
```

Run these commands from the repository root. Build before running website tests;
the tests exercise the production site with Chromium and WebKit. Install browsers
once with `pnpm exec playwright install chromium webkit`. Reports and failure
traces are written to `output/playwright/website/`.

The document owns scrolling so Astro can restore browser history. Navigation
uses native links and prefetches on hover. `src/scripts/site-runtime.ts` applies
language and theme state before a client navigation swaps the document, prepares
heading anchors and code controls, and restores the component overview position.
Keep this as the single owner of localized content; Vue controls dispatch
`anyui:lang-change` and subscribe through `useSiteLang`.

`astro.config.mjs` resolves `A*` components directly to source files for each
website island and generated preview. Avoid globally installing the full library
in an app entrypoint: that also downloads every component on plain guide pages.

TypeScript stays on the supported 6.x line: Vue's type checker and Astro's Svelte
integration do not yet support TypeScript 7. PostCSS is constrained to a patched
release in `pnpm-workspace.yaml`, covering issue #8 (CVE-2026-73646) and subsequent
source map advisories. Re-run the complete audit after any dependency change.
