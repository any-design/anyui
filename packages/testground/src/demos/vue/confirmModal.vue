<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Imperative helper</div>
      <div class="demo-row">
        <a-button type="primary" @click="ask('primary')">Confirm</a-button>
        <a-button type="danger" @click="ask('danger')">Danger confirm</a-button>
        <span>Result: {{ result === null ? 'none' : result }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Component with loading</div>
      <div class="demo-row">
        <a-button @click="modalVisible = true">Open modal</a-button>
        <a-confirm-modal
          v-model="modalVisible"
          title="Apply changes"
          content="Applying will restart the service. Continue?"
          confirm-text="Apply"
          :loading="applying"
          :close-on-confirm="false"
          @confirm="onApply"
          @cancel="result = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { confirmModal } from '@/packages/confirmModal';
import type { ConfirmModalType } from '@/packages/confirmModal';

const result = ref<boolean | null>(null);
const modalVisible = ref(false);
const applying = ref(false);

const ask = async (type: ConfirmModalType) => {
  result.value = await confirmModal({
    title: type === 'danger' ? 'Delete item' : 'Save changes',
    content:
      type === 'danger'
        ? 'The item will be permanently deleted.'
        : 'Your changes will be saved to the cloud.',
    confirmText: type === 'danger' ? 'Delete' : 'Save',
    type,
  });
};

const onApply = () => {
  applying.value = true;
  setTimeout(() => {
    applying.value = false;
    modalVisible.value = false;
    result.value = true;
  }, 1500);
};
</script>
