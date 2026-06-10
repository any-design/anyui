<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type = '';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
</script>

<span
  class="a-clickable-text {type ? 'a-clickable-text--' + type : ''} {className}"
  role="button"
  tabindex="0"
  on:click={(event) => dispatch('click', event)}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click', event);
    }
  }}
>
  <slot />
</span>
