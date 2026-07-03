<script lang="ts">
  import { Button, confirmModal } from '@any-design/anyui-svelte';

  const ask = async () => {
    await confirmModal({
      title: 'Save changes',
      content: 'Your changes will be saved to the cloud.',
      confirmText: 'Save',
    });
  };
</script>

<div>
  <div class="demo-row">
    <Button type="primary" onClick={ask}>click me</Button>
  </div>
</div>