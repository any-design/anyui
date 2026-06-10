<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  export let label: string | number = '';
  export let modelValue = false;
  export let checkIcon: any = 'si-glyph:checked';
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  $: checked = modelValue;
  const update = () => {
    checked = !checked;
    dispatch('update:modelValue', checked);
    dispatch('change', checked);
  };
</script>

<div
  class="a-checkbox {checked ? 'a-checkbox--checked' : ''} {className}"
  role="checkbox"
  tabindex="0"
  aria-checked={checked}
  on:click={update}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <div class="a-checkbox-checker">{#if checked}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
  <div class="a-checkbox-label">{label}</div>
</div>
