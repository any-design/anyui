<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    items = [] as Array<string | number>,
    modelValue = $bindable([] as Array<string | number>),
    gap = 16,
    checkIcon = 'si-glyph:checked',
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const values = $derived(new Set(modelValue));
  const formattedGap = $derived(formatStyleSize(gap));
  const update = (item: string | number) => {
    const next = new Set(values);
    next.has(item) ? next.delete(item) : next.add(item);
    const nextValue = Array.from(next);
    modelValue = nextValue;
    onUpdateModelValue?.(nextValue);
    onChange?.(nextValue);
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
      onclick={() => update(item)}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          update(item);
        }
      }}
    >
      <div class="a-checkbox-checker">{#if values.has(item)}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
      <div class="a-checkbox-label">{item}</div>
    </div>
  {/each}
  {@render children?.()}
</div>
