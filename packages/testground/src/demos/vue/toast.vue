<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-row">
        <a-button @click="popup('info')">Info</a-button>
        <a-button @click="popup('success')">Success</a-button>
        <a-button @click="popup('warning')">Warning</a-button>
        <a-button @click="popup('error')">Error</a-button>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Options</div>
      <div class="demo-row">
        <a-button @click="popupSticky">Sticky (no auto close)</a-button>
        <a-button @click="popupBottom">Bottom right</a-button>
        <a-button @click="popupContentOnly">Content only</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from '@/packages/toast';
import type { ToastType } from '@/packages/toast';

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
