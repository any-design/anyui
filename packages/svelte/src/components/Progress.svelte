<script lang="ts">
  let {
    value = 0,
    status = 'primary',
    height = undefined,
    width = undefined,
    striped = false,
    active = false,
    showLabel = false,
    indeterminate = false,
    size = 'default',
    format = undefined,
    class: className = '',
  } = $props();
  const percent = $derived(Math.min(100, Math.max(0, Number(value))));
  const label = $derived(format ? format(percent) : Math.round(percent) + '%');
  const formattedHeight = $derived(
    height === undefined ? undefined : typeof height === 'number' ? height + 'px' : height,
  );
  const formattedWidth = $derived(
    width === undefined ? undefined : typeof width === 'number' ? width + 'px' : width,
  );
</script>

<div
  class="a-progress a-progress--{status} {size !== 'default' ? 'a-progress--' + size : ''} {striped ? 'a-progress--striped' : ''} {active ? 'a-progress--active' : ''} {indeterminate ? 'a-progress--indeterminate' : ''} {className}"
  style:height={formattedHeight}
  style:width={formattedWidth}
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={indeterminate ? undefined : percent}
>
  <div class="a-progress__track">
    <div class="a-progress__fill" style:width={percent + '%'}>
      {#if striped}<span class="a-progress__stripes"></span>{/if}
    </div>
  </div>
  {#if showLabel && !indeterminate}
    <span class="a-progress__label">{label}</span>
  {/if}
</div>
