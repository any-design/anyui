<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">List Menu</div>
      <div class="demo-row">
        <div class="menu-wrapper">
          <a-list-menu v-model="menuSelected" :menu="listMenu" selected-variant="solid"></a-list-menu>
        </div>
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
  width: 220px;
}
</style>
