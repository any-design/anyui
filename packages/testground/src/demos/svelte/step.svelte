<script lang="ts">
  import { Button, Step } from '@any-design/anyui-svelte';

  let current = $state(1);
  const steps = ['Cart', 'Shipping', 'Payment', 'Done'];
  const finishSteps = ['Profile', 'Workspace', 'Invite', 'Launch'];
  const currentLabel = $derived(current > steps.length ? 'Completed' : steps[current - 1]);

  const move = (delta: number) => {
    // Allow current to reach length + 1 so every step can be marked completed.
    current = Math.min(steps.length + 1, Math.max(1, current + delta));
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">With labels</div>
    <div class="step-preview-shell">
      <div class="step-preview-shell__meta">
        <div class="step-preview-shell__eyebrow">Checkout</div>
        <div class="step-preview-shell__title">{currentLabel}</div>
        <div class="step-preview-shell__caption">
          Step {Math.min(current, steps.length)} of {steps.length}{current > steps.length ? ' · Done' : ''}
        </div>
      </div>
      <div class="demo-row" style="margin-bottom: 18px">
        <Button round size="small" onClick={() => move(-1)}>Prev</Button>
        <Button round size="small" type="primary" onClick={() => move(1)}>Next</Button>
      </div>
      <Step steps={steps} {current} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom finish color</div>
    <div class="step-preview-shell">
      <div class="step-preview-shell__meta">
        <div class="step-preview-shell__eyebrow">Onboarding</div>
        <div class="step-preview-shell__title">Invite team</div>
        <div class="step-preview-shell__caption">Step 3 of 4</div>
      </div>
      <Step steps={finishSteps} current={3} finishColor="#1faeff" />
    </div>
  </div>
</div>
