<script lang="ts">
  import { RadioButtonGroup } from '@any-design/anyui-svelte';
  import type { ARadioGroupItems } from '@any-design/anyui-svelte';

  const items: ARadioGroupItems = [
    { label: 'Button 1', value: 1 },
    { label: 'Button 2', value: 2 },
    { label: 'Button 3', value: 3 },
  ];

  let value: string | number | undefined = $state(1);
  let roundValue: string | number | undefined = $state(2);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Default</div>
    <div class="demo-col">
      <RadioButtonGroup {items} bind:modelValue={value} />
      <span>Selected: {value ?? 'none'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Round</div>
    <div class="demo-col">
      <RadioButtonGroup {items} round bind:modelValue={roundValue} />
      <span>Selected: {roundValue ?? 'none'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-row">
      <RadioButtonGroup {items} size="small" />
      <RadioButtonGroup {items} />
      <RadioButtonGroup {items} size="large" />
    </div>
  </div>
</div>
