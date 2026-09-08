<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import type { TabsContext } from './tabs-context';

  let {
    value = undefined as string | number | undefined,
    keepAlive = false,
    lazy = false,
    class: className = '',
    children = undefined,
    ...rest
  } = $props();

  const ctx = getContext<TabsContext | undefined>('anyui:tabs');
  const index = ctx?.nextPanelIndex() ?? 0;
  const resolvedValue = $derived(value ?? index);
  const active = $derived(ctx ? ctx.getSelected() === resolvedValue : false);
  let visited = $state(false);
  $effect(() => { if (active) visited = true; });
  if (ctx) onDestroy(ctx.registerPanel(panelContent));
</script>

{#snippet panelContent()}
  {#if active || keepAlive || (lazy && visited)}
    <div
      {...rest}
      id={ctx?.panelId(resolvedValue)}
      class="a-tab-panel {active ? 'a-tab-panel--active' : ''} {className}"
      role="tabpanel"
      aria-labelledby={ctx?.tabId(resolvedValue)}
      hidden={!active}
    >
      {@render children?.()}
    </div>
  {/if}
{/snippet}

{#if !ctx}{@render panelContent()}{/if}
