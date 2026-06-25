<script lang="ts">
  import { Button, Step } from '@any-design/anyui-svelte';

  let current = $state(1);
  const steps = ['Cart', 'Shipping', 'Payment', 'Done'];
  const currentLabel = $derived(current > steps.length ? 'Completed' : steps[current - 1]);

  const move = (delta: number) => {
    // Allow current to reach length + 1 so every step can be marked completed.
    current = Math.min(steps.length + 1, Math.max(1, current + delta));
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Workflow</div>
    <div class="demo-row">
      <Button round size="small" onClick={() => move(-1)}>Prev</Button>
      <Button round size="small" onClick={() => move(1)}>Next</Button>
      <span>Current: {currentLabel}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="step-preview-shell">
      <div class="step-preview-shell__meta">
        <div class="step-preview-shell__eyebrow">Checkout</div>
        <div class="step-preview-shell__title">{currentLabel}</div>
        <div class="step-preview-shell__caption">
          Step {Math.min(current, steps.length)} of {steps.length}{current > steps.length ? ' · Done' : ''}
        </div>
      </div>
      <Step steps={steps} {current} />
    </div>
  </div>
</div>
