<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let modelValue = false;
  export let position = 'left';
  export let width: string | number = '30%';
  export let withMask = true;
  export let zIndex = 100;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: formattedWidth = typeof width === 'number' ? `${width}px` : width;
</script>

{#if modelValue}
  <div class="a-drawer a-drawer--{position} {className}" role="dialog">
    {#if withMask}<div
      class="a-drawer__mask"
      style:z-index={zIndex - 1}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
      on:click={() => dispatch('update:modelValue', false)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          dispatch('update:modelValue', false);
        }
      }}
    ></div>{/if}
    <div class="a-drawer__body" style:width={formattedWidth} style:z-index={zIndex}><slot /></div>
  </div>
{/if}
