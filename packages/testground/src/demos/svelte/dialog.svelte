<script lang="ts">
  import { Button, Dialog } from '@any-design/anyui-svelte';

  let basicVisible = $state(false);
  let customVisible = $state(false);
  let persistentVisible = $state(false);
</script>

<div>
  <div class="demo-block">
    <div class="demo-row">
      <Button type="primary" onClick={() => (basicVisible = true)}>Basic</Button>
      <Button type="primary" onClick={() => (customVisible = true)}>Custom footer</Button>
      <Button type="primary" onClick={() => (persistentVisible = true)}>Persistent</Button>
    </div>
  </div>
</div>

<Dialog bind:modelValue={basicVisible} title="Delete workspace">
  This action cannot be undone. All files in the workspace will be removed.
</Dialog>

<Dialog bind:modelValue={customVisible} title="Custom footer" width={380}>
  A dialog with a custom footer slot.
  {#snippet footer()}
    <Button size="small" type="gradient" fill onClick={() => (customVisible = false)}>
      Got it
    </Button>
  {/snippet}
</Dialog>

<Dialog bind:modelValue={persistentVisible} title="Persistent" maskClosable={false}>
  Clicking the mask won't close this one — use the buttons.
</Dialog>