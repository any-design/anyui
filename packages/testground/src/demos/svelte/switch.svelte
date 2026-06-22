<script lang="ts">
  import { Switch } from '@any-design/anyui-svelte';

  let enabled = $state(true);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Switch</div>
    <div class="demo-row">
      <Switch bind:modelValue={enabled} />
      <span>Enabled: {enabled}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Disabled</div>
    <div class="demo-row">
      <Switch modelValue={true} disabled />
    </div>
  </div>
</div>
