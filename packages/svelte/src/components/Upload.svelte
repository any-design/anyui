<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let status = 'default';
  export let clickable = true;
  export let disabled = false;
  export let multiple = false;
  export let accept: string | undefined = undefined;
  export let className = '';
  export { className as class };
  const dispatch = createEventDispatcher();
  let inputEl: HTMLInputElement;
  let dragging = false;
  $: showDefault = (status === 'default' || !status) && !dragging;
  const choose = () => {
    if (!clickable || disabled) return;
    inputEl?.click();
  };
  const onChange = (event: Event) => {
    const files = (event.currentTarget as HTMLInputElement).files;
    const file = files?.[0];
    dispatch('upload', file);
    dispatch('change', file);
  };
  const onDrop = (event: DragEvent) => {
    if (!disabled) {
      const file = event.dataTransfer?.files?.[0];
      dispatch('upload', file);
    }
    dragging = false;
    event.preventDefault();
    event.stopPropagation();
  };
</script>

<div
  class="a-upload {clickable ? 'a-upload--clickable' : ''} {disabled ? 'a-upload--disabled' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  on:click={choose}
  on:dragenter={(event) => {
    dragging = true;
    event.preventDefault();
  }}
  on:dragover={(event) => event.preventDefault()}
  on:dragleave={(event) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    dragging = false;
  }}
  on:drop={onDrop}
  on:keydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
  }}
>
  <input bind:this={inputEl} type="file" hidden {multiple} {accept} on:change={onChange} />
  {#if dragging}
    <slot name="dragging" />
  {:else if status === 'uploading'}
    <slot name="uploading" />
  {:else if status === 'error'}
    <slot name="error" />
  {:else if status === 'success'}
    <slot name="success" />
  {:else if showDefault}
    <slot />
  {/if}
</div>
