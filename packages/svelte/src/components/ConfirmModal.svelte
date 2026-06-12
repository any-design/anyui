<script lang="ts">
  import Button from './Button.svelte';
  import Dialog from './Dialog.svelte';
  // A thin confirmation wrapper over Dialog.
  let {
    modelValue = $bindable(false),
    title = '',
    content = '',
    confirmText = 'OK',
    cancelText = 'Cancel',
    type = 'primary',
    loading = false,
    closeOnConfirm = true,
    width = 420,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    class: className = '',
    children,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onClose,
  } = $props();

  const close = () => {
    modelValue = false;
    onUpdateModelValue?.(false);
  };

  const onCancelClicked = () => {
    onCancel?.();
    close();
  };

  const onConfirmClicked = () => {
    if (loading) return;
    onConfirm?.();
    if (closeOnConfirm) close();
  };
</script>

<Dialog bind:modelValue {title} {width} {maskClosable} {appendToBody} {zIndex} {onUpdateModelValue} {onClose}>
  <div class="a-confirm-modal__content {className}">
    {#if children}{@render children()}{:else}{content}{/if}
  </div>
  {#snippet footer()}
    <Button size="small" onClick={onCancelClicked}>{cancelText}</Button>
    <Button size="small" type={type === 'danger' ? 'danger' : 'primary'} {loading} onClick={onConfirmClicked}>
      {confirmText}
    </Button>
  {/snippet}
</Dialog>
