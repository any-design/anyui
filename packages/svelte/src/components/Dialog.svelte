<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from './Button.svelte';
  import Popup from './Popup.svelte';
  // A standard dialog built on top of Popup.
  let {
    modelValue = $bindable(false),
    title = '',
    width = 420,
    showClose = true,
    maskClosable = true,
    appendToBody = true,
    zIndex = 1000,
    class: className = '',
    children,
    header,
    footer,
    onUpdateModelValue,
    onConfirm,
    onCancel,
    onOpen,
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
    onConfirm?.();
    close();
  };
</script>

<Popup bind:modelValue {width} {maskClosable} {appendToBody} {zIndex} {onUpdateModelValue} {onOpen} {onClose}>
  <div class="a-dialog {className}">
    <div class="a-dialog__header">
      <div class="a-dialog__header-main">
        {#if header}{@render header()}{:else}<span class="a-dialog__title">{title}</span>{/if}
      </div>
      {#if showClose}
        <button type="button" class="a-dialog__close" aria-label="Close" onclick={close}>
          <Icon class="a-icon" aria-hidden="true" icon="ic:round-close" />
        </button>
      {/if}
    </div>
    <div class="a-dialog__body">{@render children?.()}</div>
    <div class="a-dialog__footer">
      {#if footer}{@render footer()}{:else}
        <Button size="small" onClick={onCancelClicked}>Cancel</Button>
        <Button size="small" type="primary" onClick={onConfirmClicked}>OK</Button>
      {/if}
    </div>
  </div>
</Popup>
