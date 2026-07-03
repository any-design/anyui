<template>
  <div>
    <div class="demo-row">
      <a-button type="primary" @click="ask">click me</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { confirmModal } from '@/packages/confirmModal';

const ask = async () => {
  await confirmModal({
    title: 'Save changes',
    content: 'Your changes will be saved to the cloud.',
    confirmText: 'Save',
  });
};
</script>