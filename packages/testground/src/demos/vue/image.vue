<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">With Slots</div>
      <div class="demo-row">
        <a-image :src="imageSrc" width="200" height="200">
          <template #loading>
            <span>Loading</span>
          </template>
          <template #error>
            <span>Error</span>
          </template>
        </a-image>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const imageSrc = `${import.meta.env.BASE_URL}logo.png`;
</script>
