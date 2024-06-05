<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Avatar</p>
    <div class="container">
      <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.Large" round />
      <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.Medium" />
      <a-avatar src="https://0.gravatar.com/avatar/" :width="40" />
      <a-avatar src="https://0.gravatar.com/avatar/" width="50px" round />
      <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.XSmall" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar as AAvatar, AvatarSize } from '../../';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
