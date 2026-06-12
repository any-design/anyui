<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Types</div>
      <div class="demo-row">
        <a-button @click="popup('default')">Default</a-button>
        <a-button @click="popup('info')">Info</a-button>
        <a-button @click="popup('success')">Success</a-button>
        <a-button @click="popup('warning')">Warning</a-button>
        <a-button @click="popup('error')">Error</a-button>
        <a-button @click="popupRound">Round</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from '@/packages/message';
import type { MessageType } from '@/packages/message/types';

const popup = (type: MessageType) => {
  message({
    type,
    content: type,
  });
};

const popupRound = () => {
  message({
    type: 'info',
    content: 'Round',
    round: true,
  });
};
</script>
