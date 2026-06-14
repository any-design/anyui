<script lang="ts">
  import { Slider } from '@any-design/anyui-svelte';

  let value = $state(30);
  let stepValue = $state(40);
  let lastChange = $state<number | undefined>(undefined);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basics</div>
    <div class="demo-col">
      <Slider bind:modelValue={value} />
      <span>Value: {value}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Step</div>
    <div class="demo-col">
      <Slider bind:modelValue={stepValue} step={10} onChange={(next) => (lastChange = next)} />
      <span>Value: {stepValue} (step 10) — last change: {lastChange ?? 'none'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Disabled</div>
    <div class="demo-col">
      <Slider modelValue={45} disabled />
    </div>
  </div>
</div>
