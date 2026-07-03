<template>
  <div>
    <div class="demo-block">
      <div class="demo-row">
        <a-button type="primary" @click="basicVisible = true">Basic</a-button>
        <a-button type="primary" @click="customVisible = true">Custom footer</a-button>
        <a-button type="primary" @click="persistentVisible = true">Persistent</a-button>
      </div>
    </div>
    <a-dialog
      v-model="basicVisible"
      title="Delete workspace"
      @confirm="lastAction = 'confirm'"
      @cancel="lastAction = 'cancel'"
    >
      This action cannot be undone. All files in the workspace will be removed.
    </a-dialog>
    <a-dialog v-model="customVisible" title="Custom footer" :width="380">
      A dialog with a custom footer slot.
      <template #footer>
        <a-button size="small" type="gradient" fill @click="customVisible = false">Got it</a-button>
      </template>
    </a-dialog>
    <a-dialog
      v-model="persistentVisible"
      title="Persistent"
      :mask-closable="false"
      @confirm="lastAction = 'confirm'"
      @cancel="lastAction = 'cancel'"
    >
      Clicking the mask won't close this one — use the buttons.
    </a-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicVisible = ref(false);
const customVisible = ref(false);
const persistentVisible = ref(false);
const lastAction = ref('');
</script>