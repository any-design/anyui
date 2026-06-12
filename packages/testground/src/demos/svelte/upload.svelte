<script lang="ts">
  import { Button, Upload } from '@any-design/anyui-svelte';

  let status = $state('default');
  let lastFile = $state('');

  const onUpload = (file: File) => {
    lastFile = file?.name ?? '';
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Status</div>
    <div class="demo-row">
      <Button round size="small" onClick={() => (status = 'default')}>Default</Button>
      <Button round size="small" onClick={() => (status = 'uploading')}>Uploading</Button>
      <Button round size="small" onClick={() => (status = 'error')}>Error</Button>
      <Button round size="small" onClick={() => (status = 'success')}>Success</Button>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Upload Area</div>
    <div class="demo-col">
      <div style="width: 200px; height: 160px;">
        <Upload {status} {onUpload}>
          <span>Click or drop a file</span>
          {#snippet dragging()}
            <span>Drop it!</span>
          {/snippet}
          {#snippet uploading()}
            <span>Uploading...</span>
          {/snippet}
          {#snippet error()}
            <span>Upload failed</span>
          {/snippet}
          {#snippet success()}
            <span>Uploaded</span>
          {/snippet}
        </Upload>
      </div>
      <span>Last file: {lastFile || 'none'}</span>
    </div>
  </div>
</div>
