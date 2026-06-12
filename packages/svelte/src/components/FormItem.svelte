<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { derived, writable } from 'svelte/store';
  let {
    label = '',
    field = '',
    prop = '',
    isValid = true,
    invalid = false,
    invalidMessage = '',
    class: className = '',
    children,
  } = $props();
  const form = getContext<any>('anyui-form') ?? {};
  const fallbackValidation = writable<Record<string, { isValid: boolean; message: string }>>({});
  const fallbackClearSignals = writable<Record<string, number>>({});
  const fallbackClearAllSignal = writable(0);
  const validationStore = form.validation ?? fallbackValidation;
  const clearSignalsStore = form.clearSignals ?? fallbackClearSignals;
  const clearAllSignalStore = form.clearAllSignal ?? fallbackClearAllSignal;
  const fieldStore = writable('');
  const formatStyleSize = (value: string | number | undefined) => (typeof value === 'number' ? value + 'px' : value);
  const formattedLabelWidth = $derived(formatStyleSize(form.labelWidth));
  const fieldName = $derived(prop || field);
  $effect(() => {
    fieldStore.set(fieldName);
  });
  const formValidation = $derived(fieldName ? $validationStore[fieldName] : undefined);
  const valid = $derived(Boolean(isValid) && !invalid && formValidation?.isValid !== false);
  const message = $derived(invalidMessage || formValidation?.message || '');
  const itemRules = $derived(fieldName ? form.rules?.[fieldName] : undefined);
  const notifyChange = () => {
    if (fieldName && itemRules?.some((item: any) => item.triggerType === 'change')) setTimeout(() => form.validateField?.(fieldName));
  };
  const notifyBlur = () => {
    if (fieldName && itemRules?.some((item: any) => item.triggerType === 'blur')) setTimeout(() => form.validateField?.(fieldName));
  };
  const clearSignalStore = derived([clearSignalsStore, clearAllSignalStore, fieldStore], ([$clearSignals, $clearAllSignal, $field]) =>
    ($field ? $clearSignals[$field] ?? 0 : 0) + $clearAllSignal,
  );
  setContext('anyui-form-item', {
    fieldStore,
    clearSignalStore,
    notifyChange,
    notifyBlur,
  });
</script>

<div class="a-form-item {!valid ? 'a-form-item--invalid' : ''} {className}" data-field={fieldName || undefined}>
  <div class="a-form-item-inner">
    {#if label}
      <div class="a-form-item-inner__label" style:width={formattedLabelWidth}><span>{label}</span></div>
    {/if}
    <div class="a-form-item-inner__content">{@render children?.()}</div>
  </div>
  {#if !valid}
    <div class="a-form-item-invalid">
      {#if label}<div class="a-form-item-invalid__placeholder" style:width={formattedLabelWidth}></div>{/if}
      <div class="a-form-item-invalid__msg">{message}</div>
    </div>
  {/if}
</div>
