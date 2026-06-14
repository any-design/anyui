<script lang="ts">
  let {
    modelValue = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showTooltip = true,
    width = undefined,
    class: className = '',
    onUpdateModelValue,
    onChange,
  } = $props();
  let trackEl = $state<HTMLDivElement>();
  let dragging = $state(false);
  let hovering = $state(false);
  const clampToStep = (raw: number) => {
    const stepStr = String(step);
    const dotIndex = stepStr.indexOf('.');
    const decimals = dotIndex === -1 ? 0 : stepStr.length - dotIndex - 1;
    const stepped = min + Math.round((raw - min) / step) * step;
    return Math.min(max, Math.max(min, Number(stepped.toFixed(decimals))));
  };
  const value = $derived(clampToStep(Number(modelValue)));
  const percent = $derived(max > min ? ((value - min) / (max - min)) * 100 : 0);
  const formattedWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );
  const tooltipVisible = $derived(showTooltip && !disabled && (dragging || hovering));
  const commit = (raw: number) => {
    const next = clampToStep(raw);
    if (next === value) return;
    modelValue = next;
    onUpdateModelValue?.(next);
  };
  const valueFromPointer = (clientX: number) => {
    if (!trackEl) return value;
    const rect = trackEl.getBoundingClientRect();
    if (!rect.width) return value;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return min + ratio * (max - min);
  };
  const handlePointerDown = (e: PointerEvent) => {
    if (disabled || e.button !== 0) return;
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.focus({ preventScroll: true });
    target.setPointerCapture(e.pointerId);
    dragging = true;
    commit(valueFromPointer(e.clientX));
    const handleMove = (moveEvent: PointerEvent) => commit(valueFromPointer(moveEvent.clientX));
    const handleUp = (upEvent: PointerEvent) => {
      target.removeEventListener('pointermove', handleMove);
      target.removeEventListener('pointerup', handleUp);
      target.removeEventListener('pointercancel', handleUp);
      if (target.hasPointerCapture(upEvent.pointerId)) target.releasePointerCapture(upEvent.pointerId);
      dragging = false;
      onChange?.(value);
    };
    target.addEventListener('pointermove', handleMove);
    target.addEventListener('pointerup', handleUp);
    target.addEventListener('pointercancel', handleUp);
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    let next: number | undefined;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - step;
    else if (e.key === 'Home') next = min;
    else if (e.key === 'End') next = max;
    else return;
    e.preventDefault();
    commit(next);
    onChange?.(clampToStep(next));
  };
</script>

<div
  class="a-slider {disabled ? 'a-slider--disabled' : ''} {dragging ? 'a-slider--dragging' : ''} {className}"
  style:width={formattedWidth}
  role="slider"
  tabindex={disabled ? -1 : 0}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-valuenow={value}
  aria-disabled={disabled}
  onpointerdown={handlePointerDown}
  onkeydown={handleKeyDown}
>
  <div class="a-slider__track" bind:this={trackEl}>
    <div class="a-slider__fill" style:width={percent + '%'}></div>
    <div
      class="a-slider__thumb"
      style:left={percent + '%'}
      onpointerenter={() => (hovering = true)}
      onpointerleave={() => (hovering = false)}
    >
      {#if tooltipVisible}
        <div class="a-slider__tooltip">{value}</div>
      {/if}
    </div>
  </div>
</div>
