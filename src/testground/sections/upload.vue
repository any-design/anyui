<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Upload</p>
    <div style="display: flex; margin-bottom: 20px">
      <a-button
        round
        size="small"
        style="margin-right: 8px"
        @click="updateUploadStatus('uploading')"
      >Uploading</a-button>
      <a-button
        round
        size="small"
        style="margin-right: 8px"
        @click="updateUploadStatus('error')"
      >Error</a-button>
      <a-button
        round
        size="small"
        style="margin-right: 8px"
        @click="updateUploadStatus('success')"
      >Success</a-button>
    </div>
    <div style="width: 200px; height: 200px">
      <a-upload :status="uploadStatus">
        <span>Default</span>
        <template #dragging>
          <span>Dragging</span>
        </template>
        <template #uploading>
          <span>Uploading</span>
        </template>
        <template #error>
          <span>Error</span>
        </template>
        <template #success>
          <span>Success</span>
        </template>
      </a-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const uploadStatus = ref('');
    const updateUploadStatus = (status: string) => {
      uploadStatus.value = status;
    };
    return {
      uploadStatus,
      updateUploadStatus,
    };
  },
});
</script>
