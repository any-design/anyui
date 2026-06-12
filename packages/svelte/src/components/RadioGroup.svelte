<script lang="ts">
  import type { ARadioGroupItems } from '../types';
  let {
    items = [] as ARadioGroupItems,
    modelValue = $bindable(undefined),
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = (value: string | number) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
  };
</script>

<div class="a-radio-group {className}">
  {#each items as item}
    <div
      class="a-radio {modelValue === item.value ? 'a-radio--checked' : ''}"
      role="radio"
      tabindex="0"
      aria-checked={modelValue === item.value}
      onclick={() => update(item.value)}
      onkeydown={(event) => {
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
