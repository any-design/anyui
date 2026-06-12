<script lang="ts">
  let {
    status = 'default',
    clickable = true,
    disabled = false,
    multiple = false,
    accept = undefined,
    class: className = '',
    children,
    dragging,
    uploading,
    error,
    success,
    onUpload,
  } = $props();
  let inputEl = $state<HTMLInputElement>();
  let isDragging = $state(false);
  const showDefault = $derived((status === 'default' || !status) && !isDragging);
  const choose = () => {
    if (!clickable || disabled) return;
    inputEl?.click();
  };
  const emitUpload = (files?: FileList | null) => {
    const file = files?.[0];
    if (file) onUpload?.(file);
  };
  const handleChange = (event: Event) => {
    emitUpload((event.currentTarget as HTMLInputElement).files);
  };
  const handleDrop = (event: DragEvent) => {
    if (!disabled) emitUpload(event.dataTransfer?.files);
    isDragging = false;
    event.preventDefault();
    event.stopPropagation();
  };
</script>

<div
  class="a-upload {clickable ? 'a-upload--clickable' : ''} {disabled ? 'a-upload--disabled' : ''} {className}"
  role="button"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled}
  onclick={choose}
  ondragenter={(event) => {
    isDragging = true;
    event.preventDefault();
  }}
  ondragover={(event) => event.preventDefault()}
  ondragleave={(event) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    isDragging = false;
  }}
  ondrop={handleDrop}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose();
    }
  }}
>
  <input bind:this={inputEl} type="file" hidden {multiple} {accept} onchange={handleChange} />
  {#if isDragging}
    {@render dragging?.()}
  {:else if status === 'uploading'}
    {@render uploading?.()}
  {:else if status === 'error'}
    {@render error?.()}
  {:else if status === 'success'}
    {@render success?.()}
  {:else if showDefault}
    {@render children?.()}
  {/if}
</div>
