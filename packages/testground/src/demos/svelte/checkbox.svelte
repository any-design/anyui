<script lang="ts">
  import { Checkbox, CheckboxGroup } from '@any-design/anyui-svelte';

  let checked = $state(true);
  let selected: Array<string | number> = $state(['Option 1']);

  const items = ['Option 1', 'Option 2', 'Option 3'];
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Checkbox</div>
    <div class="demo-row">
      <Checkbox label="Checkbox" bind:modelValue={checked} />
      <span>Checked: {checked}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Checkbox Group</div>
    <div class="demo-col">
      <CheckboxGroup {items} bind:modelValue={selected} />
      <span>Selected: {selected.join(', ') || 'none'}</span>
    </div>
  </div>
</div>
