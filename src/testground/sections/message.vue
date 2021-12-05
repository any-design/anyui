<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Message</p>
    <div class="testground-flex">
      <a-button @click="popup('default')">Default</a-button>
      <a-button @click="popup('info')">Info</a-button>
      <a-button @click="popup('success')">Success</a-button>
      <a-button @click="popup('warning')">Warning</a-button>
      <a-button @click="popup('error')">Error</a-button>
      <a-button @click="popupRound">Round</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { MessageType } from '../../index';
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    popup(type: MessageType) {
      this.$message({
        type,
        content: type,
      });
    },
    popupRound() {
      this.$message({
        type: 'info',
        content: 'Round',
        round: true,
      });
    },
  },
});
</script>
