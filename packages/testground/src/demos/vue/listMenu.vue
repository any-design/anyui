<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">In Layout</div>
      <div class="menu-wrapper">
        <a-layout>
          <a-side>
            <a-list-menu v-model="menuSelected" :menu="listMenu"></a-list-menu>
          </a-side>
          <a-layout>
            <a-content>{{ menuSelected }}</a-content>
          </a-layout>
        </a-layout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const listMenu = ref({
  Accounts: ['My Account'],
  UI: ['Theme'],
  Security: ['Storage', 'API'],
});

const menuSelected = ref('Theme');
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
}
.a-layout-inner {
  background-color: var(--primary);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
}
.a-side {
  background-color: var(--bg-light);
  color: var(--primary);
}
.a-content {
  background-color: var(--primary-80);
}
</style>
