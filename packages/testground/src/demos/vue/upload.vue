<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Status</div>
      <div class="demo-row">
        <a-button round size="small" @click="uploadStatus = 'uploading'">Uploading</a-button>
        <a-button round size="small" @click="uploadStatus = 'error'">Error</a-button>
        <a-button round size="small" @click="uploadStatus = 'success'">Success</a-button>
      </div>
      <div style="width: 200px; height: 200px; margin-top: 14px">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uploadStatus = ref('');
</script>
