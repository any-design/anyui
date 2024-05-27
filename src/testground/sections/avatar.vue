<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Avatar</p>
    <div class="container">
      <a-avatar src="https://0.gravatar.com/avatar/" size="xlarge" round />
      <a-avatar src="https://0.gravatar.com/avatar/" size="large" />
      <a-avatar src="https://0.gravatar.com/avatar/" size="medium" :width="40" />
      <a-avatar src="https://0.gravatar.com/avatar/" size="small" width="50px" round />
      <a-avatar src="https://0.gravatar.com/avatar/" size="xsmall" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar as AAvatar } from '../../';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
