<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let items: Array<string | number> = [];
  export let modelValue: Array<string | number> = [];
  export let gap: string | number = 16;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  $: values = new Set(modelValue);
  $: formattedGap = formatStyleSize(gap);
  const update = (item: string | number) => {
    const next = new Set(values);
    next.has(item) ? next.delete(item) : next.add(item);
    const nextValue = Array.from(next);
    dispatch('update:modelValue', nextValue);
    dispatch('change', nextValue);
  };
</script>

<div class="a-checkbox-group {className}">
  {#each items as item, index}
    <div
      class="a-checkbox {values.has(item) ? 'a-checkbox--checked' : ''}"
      style:margin-right={index === items.length - 1 ? undefined : formattedGap}
      role="checkbox"
      tabindex="0"
      aria-checked={values.has(item)}
      on:click={() => update(item)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item);
        }
      }}
    >
      <div class="a-checkbox-checker">{#if values.has(item)}<span class="a-checkbox-checker__icon"></span>{/if}</div>
      <div class="a-checkbox-label">{item}</div>
    </div>
  {/each}
  <slot />
</div>
