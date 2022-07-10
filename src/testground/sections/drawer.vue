<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Drawer</p>
    <div class="testground-flex">
      <a-button type="primary" @click="openDrawer('left')">Left</a-button>
      <a-button type="primary" @click="openDrawer('right')">Right</a-button>
      <a-drawer v-model="drawerVisible" :position="drawerPosition" appendToBody>
        <span>This is a drawer</span>
      </a-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { DrawerPosition } from '@/packages/drawer';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      drawerPosition: 'left',
      drawerVisible: false,
    };
  },
  methods: {
    openDrawer(position: DrawerPosition) {
      this.drawerPosition = position;
      this.drawerVisible = true;
    },
  },
});
</script>
