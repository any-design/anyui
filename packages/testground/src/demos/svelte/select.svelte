<script lang="ts">
  import { Select } from '@any-design/anyui-svelte';
  import type { ASelectItems } from '@any-design/anyui-svelte';

  const items: ASelectItems = Array.from({ length: 6 }, (_, index) => ({
    text: `Item ${index}`,
    value: index,
  }));

  let value: string | number | null | undefined = $state('');
  let multiValue: (string | number)[] = $state([]);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-col">
      <Select {items} bind:modelValue={value} placeholder="Select an item" />
      <span>Selected: {value === '' ? '(none)' : value}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Multiple</div>
    <div class="demo-col">
      <Select {items} bind:modelValue={multiValue} multiple placeholder="Select items" />
      <span>Selected: {multiValue.length ? multiValue.join(', ') : '(none)'}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Variants</div>
    <div class="demo-col">
      <Select {items} round placeholder="Round" />
      <Select {items} size="large" placeholder="Large" />
      <Select {items} disabled placeholder="Disabled" />
    </div>
  </div>
</div>
