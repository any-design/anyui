<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label = '';
  export let checked = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
</script>

<div
  class="a-radio {checked ? 'a-radio--checked' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={checked}
  on:click={() => !checked && dispatch('change', !checked)}
  on:keydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !checked) {
      event.preventDefault();
      dispatch('change', !checked);
    }
  }}
>
  <div class="a-radio-check">{#if checked}<div class="a-radio-check__inner"></div>{/if}</div>
  {#if label}<div class="a-radio__label">{label}</div>{/if}
</div>
