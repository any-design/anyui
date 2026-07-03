<template>
  <div>
    <div class="demo-block">
      <div class="demo-row">
        <a-button type="primary" @click="defaultVisible = true">Default</a-button>
        <a-button type="primary" @click="glassVisible = true">Glass 70%</a-button>
        <a-button type="primary" @click="nomaskVisible = true">No mask</a-button>
      </div>
    </div>
    <a-drawer v-model="defaultVisible" position="right" :width="300" append-to-body>
      <div class="drawer-demo">
        <h3 class="drawer-demo__title">Drawer</h3>
        <p class="drawer-demo__text">
          A panel slides in from the right. The body has its own padding and scrolls independently.
        </p>
        <ul class="drawer-demo__list">
          <li>Item one</li>
          <li>Item two</li>
          <li>Item three</li>
        </ul>
        <div class="drawer-demo__actions">
          <a-button size="small" @click="defaultVisible = false">Close</a-button>
        </div>
      </div>
    </a-drawer>
    <a-drawer
      v-model="glassVisible"
      position="right"
      :width="300"
      :glass-opacity="0.7"
      append-to-body
    >
      <div class="drawer-demo">
        <h3 class="drawer-demo__title">Glass drawer</h3>
        <p class="drawer-demo__text">
          Set <code>glass-opacity</code> below 1 to let the backdrop blur show through the panel —
          toggle the Glass theme in the top bar to see it best.
        </p>
        <div class="drawer-demo__actions">
          <a-button size="small" @click="glassVisible = false">Close</a-button>
        </div>
      </div>
    </a-drawer>
    <a-drawer v-model="nomaskVisible" position="right" :width="300" :with-mask="false" append-to-body>
      <div class="drawer-demo">
        <h3 class="drawer-demo__title">No mask</h3>
        <p class="drawer-demo__text">The page behind stays interactive while the drawer is open.</p>
        <div class="drawer-demo__actions">
          <a-button size="small" @click="nomaskVisible = false">Close</a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const defaultVisible = ref(false);
const glassVisible = ref(false);
const nomaskVisible = ref(false);
</script>

<style lang="scss" scoped>
.drawer-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
  }
  &__text {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-80, var(--text));
  }
  &__list {
    margin: 0;
    padding-left: 18px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }
  code {
    padding: 1px 6px;
    border-radius: 6px;
    background: var(--bg-alter);
    font-size: 12px;
  }
}
</style>