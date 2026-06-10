<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let visible = false;
  export let zIndex = 1000;
  export let width: string | number = 800;
  export let centered = false;
  export let round = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: formattedWidth = typeof width === 'number' ? `${width}px` : width;
</script>

{#if visible}
  <div class="a-float {centered ? 'a-float--centered' : ''} {round ? 'a-float--round' : ''} {className}" style:z-index={zIndex}>
    <div
      class="a-float__mask"
      role="button"
      tabindex="0"
      aria-label="Close"
      on:click={() => { dispatch('close'); dispatch('update:visible', false); }}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          dispatch('close');
          dispatch('update:visible', false);
        }
      }}
    ></div>
    <div class="a-float__content" style:width={formattedWidth}><slot /></div>
  </div>
{/if}
