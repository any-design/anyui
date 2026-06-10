<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string | number = '';
  export let value: string | number | undefined = undefined;
  export let selected: string | number | undefined = undefined;
  export let modelValue: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: current = selected ?? modelValue;
  const update = () => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
    dispatch('click', value);
  };
</script>

<div
  class="a-radio-button {current === value ? 'a-radio-button--selected' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={current === value}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <slot>{label}</slot>
</div>
