<script lang="ts">
  import { Button, Message, message } from '@any-design/anyui-svelte';
  import type { MessageType } from '@any-design/anyui-svelte';

  const popup = (type: MessageType) => {
    message({ type, content: `This is a ${type} message` });
  };

  const popupRound = () => {
    message({ type: 'info', content: 'Round message', round: true });
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Popup Messages</div>
    <div class="demo-row">
      <Button size="small" onClick={() => popup('default')}>Default</Button>
      <Button size="small" onClick={() => popup('info')}>Info</Button>
      <Button size="small" onClick={() => popup('success')}>Success</Button>
      <Button size="small" onClick={() => popup('warning')}>Warning</Button>
      <Button size="small" onClick={() => popup('error')}>Error</Button>
      <Button size="small" onClick={popupRound}>Round</Button>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Inline Message Component</div>
    <div class="demo-col">
      <Message type="success" content="Success message" />
      <Message type="warning" content="Warning message" />
      <Message type="error" content="Error message" round />
    </div>
  </div>
</div>
