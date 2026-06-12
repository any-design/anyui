<script lang="ts">
  import { Button, Card, LoadingMask, loadingMask } from '@any-design/anyui-svelte';

  let cardLoading = $state(false);

  const showFullscreen = () => {
    loadingMask.show({ text: 'Hold on...' });
    setTimeout(() => {
      loadingMask.hide();
    }, 2000);
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Wrap content</div>
    <div class="demo-row">
      <LoadingMask loading={cardLoading} text="Loading...">
        <Card title="Project stats" width={280}>
          <p style="margin: 0;">Stars: 1,024</p>
          <p style="margin: 6px 0 0;">Forks: 256</p>
        </Card>
      </LoadingMask>
      <Button type="primary" onClick={() => (cardLoading = !cardLoading)}>
        {cardLoading ? 'Stop' : 'Start'} loading
      </Button>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Fullscreen helper</div>
    <div class="demo-row">
      <Button onClick={showFullscreen}>Show fullscreen for 2s</Button>
    </div>
  </div>
</div>
