<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let modelValue = false;
  export let disabled = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: checked = Boolean(modelValue);
  const update = () => {
    if (disabled) return;
    checked = !checked;
    dispatch('update:modelValue', checked);
    dispatch('change', checked);
  };
</script>

<span
  class="a-switch {checked ? 'a-switch--checked' : ''} {disabled ? 'a-switch--disabled' : ''} {className}"
  role="switch"
  tabindex={disabled ? -1 : 0}
  aria-checked={checked}
  aria-disabled={disabled}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
></span>
