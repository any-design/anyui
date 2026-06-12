<script lang="ts">
  import { Button, toast } from '@any-design/anyui-svelte';
  import type { ToastType } from '@any-design/anyui-svelte';

  const TITLES: Record<ToastType, string> = {
    info: 'Heads up',
    success: 'All done',
    warning: 'Careful now',
    error: 'Something broke',
  };

  const popup = (type: ToastType) => {
    toast[type]({
      title: TITLES[type],
      content: `This is a ${type} toast notification.`,
    });
  };

  const popupSticky = () => {
    toast({
      type: 'info',
      title: 'Sticky toast',
      content: 'This one stays until you close it.',
      duration: 0,
    });
  };

  const popupBottom = () => {
    toast.success({
      title: 'From the bottom',
      content: 'Placed in the bottom-right corner.',
      placement: 'bottom-right',
    });
  };

  const popupContentOnly = () => {
    toast.info('A quick content-only toast.');
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Types</div>
    <div class="demo-row">
      <Button onClick={() => popup('info')}>Info</Button>
      <Button onClick={() => popup('success')}>Success</Button>
      <Button onClick={() => popup('warning')}>Warning</Button>
      <Button onClick={() => popup('error')}>Error</Button>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Options</div>
    <div class="demo-row">
      <Button onClick={popupSticky}>Sticky (no auto close)</Button>
      <Button onClick={popupBottom}>Bottom right</Button>
      <Button onClick={popupContentOnly}>Content only</Button>
    </div>
  </div>
</div>
