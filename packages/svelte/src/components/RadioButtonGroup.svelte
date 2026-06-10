<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import type { ARadioGroupItems } from '../types';
  export let items: ARadioGroupItems = [];
  export let modelValue: string | number | undefined = undefined;
  export let round = false;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let containerEl: HTMLDivElement;
  let bgBlockPosition: { width: number; left: number } | undefined = undefined;
  $: paddingValue = round ? 6 : 4;
  $: bgBlockStyle = bgBlockPosition
    ? `opacity: 1; transform: translateX(${bgBlockPosition.left}px) scale(1); width: ${bgBlockPosition.width}px;`
    : 'opacity: 0; transform: scale(0.4);';
  $: if (items && typeof modelValue !== 'undefined') updatePosition(modelValue);
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
    dispatch('update:modelValue', value);
    dispatch('change', value);
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
        on:click={() => update(item.value)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            update(item.value);
          }
        }}
      >{item.label}</div>
    {/each}
  </div>
  <slot />
</div>
