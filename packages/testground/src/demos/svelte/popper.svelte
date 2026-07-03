<script lang="ts">
  import { Button, Popper } from '@any-design/anyui-svelte';

  let manualPopper = $state<{ show: () => void; hide: () => void }>();

  const openManual = () => {
    manualPopper?.hide();
    requestAnimationFrame(() => manualPopper?.show());
  };
</script>

<div>
  <div class="demo-row popper-demo-row">
    <Popper placement="top">
      <Button>Hover</Button>
      {#snippet popup()}
        <div class="popper-card">
          <strong>Hover panel</strong>
          <p>A small floating panel above.</p>
        </div>
      {/snippet}
    </Popper>
    <Popper placement="bottom" triggerType="click">
      <Button type="primary">Click</Button>
      {#snippet popup()}
        <div class="popper-card">
          <strong>Click panel</strong>
          <p>Click outside to dismiss this.</p>
        </div>
      {/snippet}
    </Popper>
    <Popper placement="bottom-start" triggerType="contextmenu">
      <Button type="secondary">Right click</Button>
      {#snippet popup()}
        <div class="popper-card">
          <strong>Context panel</strong>
          <p>Right-click outside, then trigger it again.</p>
        </div>
      {/snippet}
    </Popper>
    <Popper bind:this={manualPopper} placement="right" triggerType="manual">
      <Button onClick={openManual}>Open</Button>
      {#snippet popup()}
        <div class="popper-card">
          <strong>Manual panel</strong>
          <p>Open can be fired repeatedly.</p>
          <Button size="small" type="secondary" onClick={() => manualPopper?.hide()}>Close</Button>
        </div>
      {/snippet}
    </Popper>
  </div>
</div>

<style>
  .popper-demo-row {
    gap: 12px 14px;
  }

  .popper-card {
    padding: 12px 16px;
    border-radius: var(--a-radius, 14px);
    background: var(--a-surface, var(--bg-bright));
    border: 1px solid var(--line);
    box-shadow: var(--a-shadow-md, 0 4px 10px var(--shadow-5), 0 12px 28px -8px var(--shadow-10));
    color: var(--text);
    font-size: 13px;
    line-height: 1.5;
    max-width: 240px;
  }

  .popper-card strong {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 700;
  }

  .popper-card p {
    margin: 0 0 10px;
    color: var(--text-secondary, var(--text));
  }

  .popper-card p:last-child {
    margin-bottom: 0;
  }
</style>
