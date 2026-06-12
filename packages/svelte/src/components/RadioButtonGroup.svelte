<script lang="ts">
  import { tick } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  let {
    items = [] as ARadioGroupItems,
    modelValue = $bindable(undefined),
    round = false,
    class: className = '',
    children,
    onUpdateModelValue,
    onChange,
  } = $props();
  let containerEl = $state<HTMLDivElement>();
  let bgBlockPosition = $state<{ width: number; left: number } | undefined>(undefined);
  const paddingValue = $derived(round ? 6 : 4);
  const bgBlockStyle = $derived(bgBlockPosition
    ? 'opacity: 1; transform: translateX(' + bgBlockPosition.left + 'px) scale(1); width: ' + bgBlockPosition.width + 'px;'
    : 'opacity: 0; transform: scale(0.4);');
  $effect(() => {
    if (items && typeof modelValue !== 'undefined') updatePosition(modelValue);
  });
  const updatePosition = async (value: string | number | undefined) => {
    if (typeof value === 'undefined' || value === null) {
      bgBlockPosition = undefined;
      return;
    }
    await tick();
    const index = items.findIndex((item) => item.value === value);
    const button = containerEl?.querySelectorAll<HTMLElement>('.a-radio-button')[index];
    const containerRect = containerEl?.getBoundingClientRect();
    if (!button || !containerRect) return;
    const buttonRect = button.getBoundingClientRect();
    bgBlockPosition = {
      width: buttonRect.width,
      left: buttonRect.left - containerRect.left - paddingValue,
    };
  };
  const update = (value: string | number) => {
    modelValue = value;
    onUpdateModelValue?.(value);
    onChange?.(value);
    updatePosition(value);
  };
</script>

<div bind:this={containerEl} class="a-radio-button-group {round ? 'a-radio-button-group--round' : ''} {bgBlockPosition ? 'a-radio-button-group--animated' : ''} {className}">
  <div class="a-radio-button-group__bg" style={bgBlockStyle}></div>
  <div class="a-radio-button-group__buttons">
    {#each items as item}
      <div
        class="a-radio-button {modelValue === item.value ? 'a-radio-button--selected' : ''}"
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
      >{item.label}</div>
    {/each}
  </div>
  {@render children?.()}
</div>
