<script lang="ts">
  import { getContext } from 'svelte';

  let {
    value = undefined as string | number | undefined,
    keepAlive = false,
    lazy = false,
    class: className = '',
    children,
  } = $props();

  const ctx = getContext<any>('anyui:tabs');
  const resolvedValue = $derived(ctx ? (typeof value === 'undefined' ? ctx.nextTabValue() : value) : value);
  const active = $derived(ctx ? ctx.getSelected() === resolvedValue : false);
  let rendered = $state(false);

  $effect(() => {
    if (active) {
      rendered = true;
    } else if (!keepAlive) {
      rendered = false;
    }
  });
</script>

{#if rendered || keepAlive || lazy}
  <div class="a-tab-panel {className}" role="tabpanel" aria-hidden={!active}>
    {#if active || keepAlive}{@render children?.()}{/if}
  </div>
{/if}
