<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-row">
        <a-button type="primary" @click="basicVisible = true">Open dialog</a-button>
        <a-dialog
          v-model="basicVisible"
          title="Delete workspace"
          @confirm="onAction('confirm')"
          @cancel="onAction('cancel')"
        >
          This action cannot be undone. All files in the workspace will be removed.
        </a-dialog>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Custom footer</div>
      <div class="demo-row">
        <a-button @click="customVisible = true">Open dialog</a-button>
        <a-dialog v-model="customVisible" title="Custom footer" :width="380">
          A dialog with a custom footer slot.
          <template #footer>
            <a-button size="small" type="gradient" fill @click="customVisible = false">
              Got it
            </a-button>
          </template>
        </a-dialog>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Last action</div>
      <div class="demo-row">
        <span>{{ lastAction || 'none' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicVisible = ref(false);
const customVisible = ref(false);
const lastAction = ref('');

const onAction = (action: string) => {
  lastAction.value = action;
};
</script>
