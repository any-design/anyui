<script lang="ts">
  import { Popper } from '@any-design/anyui-svelte';

  let status = $state('');

  const onPopupStatusChanged = (open: boolean) => {
    status = open ? 'open' : 'closed';
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Trigger Types</div>
    <div class="demo-row">
      <Popper {onPopupStatusChanged}>
        <span class="popper-trigger">hover me</span>
        {#snippet popup()}
          <span class="popper-content">Hover popup</span>
        {/snippet}
      </Popper>
      <Popper triggerType="click">
        <span class="popper-trigger">click me</span>
        {#snippet popup()}
          <span class="popper-content">Click popup</span>
        {/snippet}
      </Popper>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Placements</div>
    <div class="demo-row">
      <Popper placement="right">
        <span class="popper-trigger">right</span>
        {#snippet popup()}
          <span class="popper-content">Right popup</span>
        {/snippet}
      </Popper>
      <Popper placement="top">
        <span class="popper-trigger">top</span>
        {#snippet popup()}
          <span class="popper-content">Top popup</span>
        {/snippet}
      </Popper>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Status</div>
    <div class="demo-row">
      <span>First popper status: {status || 'closed'}</span>
    </div>
  </div>
</div>

<style>
  .popper-trigger {
    cursor: pointer;
    text-decoration: underline;
  }
  .popper-content {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--bg-light, #fff);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
  }
</style>
