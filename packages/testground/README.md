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
