<script lang="ts">
  import { Button, Dialog } from '@any-design/anyui-svelte';

  let basicVisible = $state(false);
  let customVisible = $state(false);
  let lastAction = $state('');
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Button type="primary" onClick={() => (basicVisible = true)}>Open dialog</Button>
      <Dialog
        bind:modelValue={basicVisible}
        title="Delete workspace"
        onConfirm={() => (lastAction = 'confirm')}
        onCancel={() => (lastAction = 'cancel')}
      >
        This action cannot be undone. All files in the workspace will be removed.
      </Dialog>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom footer</div>
    <div class="demo-row">
      <Button onClick={() => (customVisible = true)}>Open dialog</Button>
      <Dialog bind:modelValue={customVisible} title="Custom footer" width={380}>
        A dialog with a custom footer.
        {#snippet footer()}
          <Button size="small" type="gradient" fill onClick={() => (customVisible = false)}>
            Got it
          </Button>
        {/snippet}
      </Dialog>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Last action</div>
    <div class="demo-row">
      <span>{lastAction || 'none'}</span>
    </div>
  </div>
</div>
