<template>
  <div class="testground-content__item">
    <p class="testground-content-title">List Menu</p>
    <div class="testground-flex">
      <a-layout>
        <a-side>
          <a-list-menu :menu="listMenu"></a-list-menu>
        </a-side>
        <a-layout>
          <a-content></a-content>
        </a-layout>
      </a-layout>
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
</script>

<style lang="scss" scoped>
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
