// Demo registry. Drop a file into demos/vue, demos/react or demos/svelte
// (named after the component, e.g. `button.vue` / `button.tsx` / `button.svelte`)
// and it is registered automatically.

export type DemoLoader = () => Promise<{ default: unknown }>;

export interface DemoEntry {
  id: string;
  title: string;
  vue?: DemoLoader;
  react?: DemoLoader;
  svelte?: DemoLoader;
}

export type Framework = 'vue' | 'react' | 'svelte';

export const FRAMEWORKS: Framework[] = ['vue', 'react', 'svelte'];

const vueDemos = import.meta.glob('./demos/vue/*.vue');
const reactDemos = import.meta.glob('./demos/react/*.tsx');
const svelteDemos = import.meta.glob('./demos/svelte/*.svelte');

const idOf = (filePath: string) => filePath.replace(/^.*[\\/]/, '').replace(/\.\w+$/, '');

const titleOf = (id: string) =>
  id
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (char) => char.toUpperCase());

const entries = new Map<string, DemoEntry>();

const collect = (modules: Record<string, DemoLoader>, framework: Framework) => {
  Object.entries(modules).forEach(([filePath, loader]) => {
    const id = idOf(filePath);
    const entry = entries.get(id) ?? { id, title: titleOf(id) };
    entry[framework] = loader;
    entries.set(id, entry);
  });
};

collect(vueDemos as Record<string, DemoLoader>, 'vue');
collect(reactDemos as Record<string, DemoLoader>, 'react');
collect(svelteDemos as Record<string, DemoLoader>, 'svelte');

export const registry: DemoEntry[] = [...entries.values()].sort((a, b) =>
  a.id.localeCompare(b.id),
);
