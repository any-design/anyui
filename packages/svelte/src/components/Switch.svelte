<script lang="ts">
  let {
    modelValue = $bindable(false),
    disabled = false,
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  const update = () => {
    if (disabled) return;
    modelValue = !modelValue;
    onUpdateModelValue?.(modelValue);
    onChange?.(modelValue);
  };
</script>

<span
  class="a-switch {modelValue ? 'a-switch--checked' : ''} {disabled ? 'a-switch--disabled' : ''} {className}"
  role="switch"
  tabindex={disabled ? -1 : 0}
  aria-checked={modelValue}
  aria-disabled={disabled}
  onclick={update}
  onkeydown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      update();
    }
  }}
></span>
