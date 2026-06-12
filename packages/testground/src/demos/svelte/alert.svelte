<script lang="ts">
  import { Alert } from '@any-design/anyui-svelte';

  let closedCount = $state(0);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Types</div>
    <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px;">
      <Alert type="info" title="Heads up">Something informational happened.</Alert>
      <Alert type="success" title="Saved">Your changes have been saved.</Alert>
      <Alert type="warn" title="Storage almost full">Only 5% of space is left.</Alert>
      <Alert type="danger" title="Sync failed">Could not reach the server.</Alert>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Closable / no icon</div>
    <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 12px;">
      <Alert type="info" title="Dismiss me" closable onClose={() => (closedCount += 1)}>
        A closable alert with a close event. Closed {closedCount} time(s) so far.
      </Alert>
      <Alert type="success" showIcon={false}>A content-only alert without an icon.</Alert>
    </div>
  </div>
</div>
