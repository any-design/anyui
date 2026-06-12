<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Positions</div>
      <div class="demo-row">
        <a-button type="primary" @click="openDrawer('left')">Left</a-button>
        <a-button type="primary" @click="openDrawer('right')">Right</a-button>
        <a-drawer v-model="drawerVisible" :position="drawerPosition" appendToBody>
          <span>This is a drawer</span>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DrawerPosition } from '@/packages/drawer';

const drawerPosition = ref<DrawerPosition>('left');
const drawerVisible = ref(false);

const openDrawer = (position: DrawerPosition) => {
  drawerPosition.value = position;
  drawerVisible.value = true;
};
</script>
