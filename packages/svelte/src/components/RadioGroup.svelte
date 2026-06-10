<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  export let items: ARadioGroupItems = [];
  export let modelValue: string | number | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const update = (value: string | number) => {
    dispatch('update:modelValue', value);
    dispatch('change', value);
  };
</script>

<div class="a-radio-group {className}">
  {#each items as item}
    <div
      class="a-radio {modelValue === item.value ? 'a-radio--checked' : ''}"
      role="radio"
      tabindex="0"
      aria-checked={modelValue === item.value}
      on:click={() => update(item.value)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item.value);
        }
      }}
    >
      <div class="a-radio-check">{#if modelValue === item.value}<div class="a-radio-check__inner"></div>{/if}</div>
      <div class="a-radio__label">{item.label}</div>
    </div>
  {/each}
</div>
