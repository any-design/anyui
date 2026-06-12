<script lang="ts">
  import { Button, Step } from '@any-design/anyui-svelte';

  let current = $state(1);

  const move = (delta: number) => {
    current = Math.min(4, Math.max(1, current + delta));
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Controls</div>
    <div class="demo-row">
      <Button round size="small" onClick={() => move(-1)}>Prev</Button>
      <Button round size="small" onClick={() => move(1)}>Next</Button>
      <span>Current: {current}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Numeric Steps</div>
    <div class="demo-col">
      <Step steps={4} {current} />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Named Steps</div>
    <div class="demo-col">
      <Step steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} {current} />
    </div>
  </div>
</div>
