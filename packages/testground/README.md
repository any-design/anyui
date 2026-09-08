# AnyUI Testground

A multi-framework playground that previews every AnyUI component rendered by **Vue**, **React**, and **Svelte** side by side, against the library sources (no build step needed).

```bash
pnpm dev          # from the repo root
```

The repo root dev server mounts this app at `http://localhost:4321/testground/`.

## How it works

- The shell is a small Vue app; React and Svelte demos are mounted as runtime **islands** (`src/islands/`) inside the same page, importing the framework packages' sources directly via aliases.
- Demos are auto-registered by filename via `import.meta.glob` — see `src/registry.ts`.
- The topbar toggles which frameworks are rendered, plus **dark mode** and the **liquid glass** style.
- The selected component is reflected in the URL hash, so views are linkable.

## Adding a demo

Create a file named after the component id in the matching framework folder — that's it:

```
src/demos/vue/button.vue
src/demos/react/button.tsx
src/demos/svelte/button.svelte
```

Demo contract:

- Default-export a component (SFC / function component / Svelte component).
- Root element is a plain `<div>`.
- Group examples with the shared utility classes:

```html
<div class="demo-block">
  <div class="demo-block__label">Sizes</div>
  <div class="demo-row"><!-- components --></div>
</div>
```

`demo-col` is available for vertical stacks. Panels are ~420px wide — keep tall demos self-contained (fixed heights).

`pnpm new` (component scaffold) drops a Vue demo stub here automatically.

## Local e2e checks

The testground has a local Playwright suite. It is intentionally not wired into CI; run it when you want a browser-level check that the testground behavior still matches the component demos.

```bash
pnpm test:e2e
pnpm test:e2e:headed # optional, opens the browser
pnpm test:e2e:ui     # optional, Playwright UI mode
```

The suite starts the testground Vite server at `http://127.0.0.1:5174/testground/` and reuses an existing server if one is already running. Set `ANYUI_TESTGROUND_E2E_PORT` to use a different port.

Expected behavior is derived from `src/demos/{vue,react,svelte}`:

- every demo file becomes a component case;
- each declared framework panel must render for that component;
- the panel body must mount visible demo content using `demo-block` or `demo-row`;
- missing demos, failed framework islands, page errors, and runtime `console.error` entries fail the run;
- shell behavior such as hash navigation, framework toggles, dark mode, glass mode, and persisted local prefs is covered too.
