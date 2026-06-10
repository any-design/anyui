declare module '*.svelte' {
  import type { Component } from 'svelte';
  const component: Component<Record<string, any>>;
  export default component;
}
