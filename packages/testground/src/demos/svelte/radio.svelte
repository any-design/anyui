<script lang="ts">
  import { Radio, RadioGroup } from '@any-design/anyui-svelte';
  import type { ARadioGroupItems } from '@any-design/anyui-svelte';

  let singleChecked = $state(false);

  const items: ARadioGroupItems = [
    { label: 'Radio 1', value: 1 },
    { label: 'Radio 2', value: 2 },
    { label: 'Radio 3', value: 3 },
  ];

  let groupValue: string | number | undefined = $state(1);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Single Radio</div>
    <div class="demo-row">
      <Radio label="Radio" checked={singleChecked} onChange={() => (singleChecked = true)} />
      <span>Checked: {singleChecked}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Radio Group</div>
    <div class="demo-col">
      <RadioGroup {items} bind:modelValue={groupValue} />
      <span>Selected: {groupValue ?? 'none'}</span>
    </div>
  </div>
</div>
