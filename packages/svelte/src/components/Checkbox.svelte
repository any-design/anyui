<script lang="ts">
  import Icon from '@iconify/svelte';
  let {
    label = '',
    modelValue = $bindable(false),
    checkIcon = 'si-glyph:checked',
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = () => {
    modelValue = !modelValue;
    onUpdateModelValue?.(modelValue);
    onChange?.(modelValue);
  };
</script>

<div
  class="a-checkbox {modelValue ? 'a-checkbox--checked' : ''} {className}"
  role="checkbox"
  tabindex="0"
  aria-checked={modelValue}
  onclick={update}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
>
  <div class="a-checkbox-checker">{#if modelValue}<Icon class="a-checkbox-checker__icon" aria-hidden="true" icon={checkIcon} />{/if}</div>
  <div class="a-checkbox-label">{label}</div>
</div>
