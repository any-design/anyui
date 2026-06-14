<script lang="ts">
  let {
    modelValue = $bindable(''),
    length = 6,
    disabled = false,
    masked = false,
    autoFocus = false,
    class: className = '',
    onUpdateModelValue,
    onComplete,
  } = $props();
  let inputEl = $state<HTMLInputElement>();
  let activeIndex = $state(0);
  let focused = $state(false);
  const normalize = (raw: string) => String(raw ?? '').replace(/\s/g, '').slice(0, length);
  const value = $derived(normalize(modelValue));
  const cells = $derived(Array.from({ length }, (_, index) => value[index] || ''));
  const clampIndex = (index: number, current: string) =>
    Math.min(Math.max(index, 0), Math.min(current.length, length - 1));
  const update = (next: string) => {
    const normalized = normalize(next);
    if (normalized === value) return;
    modelValue = normalized;
    onUpdateModelValue?.(normalized);
    if (normalized.length === length) onComplete?.(normalized);
  };
  const focusAt = (index: number) => {
    if (disabled) return;
    activeIndex = clampIndex(index, value);
    inputEl?.focus();
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      activeIndex = clampIndex(activeIndex - 1, value);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      activeIndex = clampIndex(activeIndex + 1, value);
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (!value.length) return;
      const next =
        activeIndex < value.length
          ? value.slice(0, activeIndex) + value.slice(activeIndex + 1)
          : value.slice(0, -1);
      update(next);
      activeIndex = clampIndex(activeIndex - 1, next);
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      let next = value;
      if (activeIndex < value.length) next = value.slice(0, activeIndex) + e.key + value.slice(activeIndex + 1);
      else if (value.length < length) next = value + e.key;
      update(next);
      activeIndex = clampIndex(activeIndex + 1, next);
    }
  };
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = normalize(e.clipboardData?.getData('text') || '');
    if (!pasted) return;
    update(pasted);
    activeIndex = clampIndex(pasted.length, pasted);
  };
  $effect(() => {
    if (autoFocus && !disabled) inputEl?.focus();
  });
</script>

<div
  class="a-otp-input {disabled ? 'a-otp-input--disabled' : ''} {className}"
  onpointerdown={(e) => {
    e.preventDefault();
    focusAt(value.length);
  }}
>
  <input
    bind:this={inputEl}
    class="a-otp-input__hidden-input"
    type="text"
    inputmode="numeric"
    autocomplete="one-time-code"
    {disabled}
    onkeydown={handleKeyDown}
    onpaste={handlePaste}
    onfocus={() => (focused = true)}
    onblur={() => (focused = false)}
  />
  {#each cells as char, index (index)}
    <div
      class="a-otp-input__cell {char ? 'a-otp-input__cell--filled' : ''} {focused && index === activeIndex ? 'a-otp-input__cell--active' : ''}"
      onpointerdown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        focusAt(index);
      }}
    >
      {#if char}<span class="a-otp-input__char">{masked ? '•' : char}</span>{/if}
    </div>
  {/each}
</div>
