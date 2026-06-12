<script lang="ts">
  let {
    label = '',
    checked = false,
    class: className = '',
    onChange,
  } = $props();
</script>

<div
  class="a-radio {checked ? 'a-radio--checked' : ''} {className}"
  role="radio"
  tabindex="0"
  aria-checked={checked}
  onclick={() => !checked && onChange?.(!checked)}
  onkeydown={(event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !checked) {
      event.preventDefault();
      onChange?.(!checked);
    }
  }}
>
  <div class="a-radio-check">{#if checked}<div class="a-radio-check__inner"></div>{/if}</div>
  {#if label}<div class="a-radio__label">{label}</div>{/if}
</div>
