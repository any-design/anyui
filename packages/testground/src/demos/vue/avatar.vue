<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Sizes &amp; Shapes</div>
      <div class="demo-row">
        <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.Large" round />
        <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.Medium" />
        <a-avatar src="https://0.gravatar.com/avatar/" :width="40" />
        <a-avatar src="https://0.gravatar.com/avatar/" width="50px" round />
        <a-avatar src="https://0.gravatar.com/avatar/" :size="AvatarSize.XSmall" />
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Name initials fallback</div>
      <div class="demo-row">
        <a-avatar src="" name="Ada Lovelace" :size="AvatarSize.Large" round />
        <a-avatar src="" name="Turing" :size="AvatarSize.Large" />
        <a-avatar src="" name="宮崎駿" :size="AvatarSize.Large" round />
        <a-avatar src="https://broken.example/missing.png" name="Grace Hopper" :width="40" round />
        <a-avatar src="" name="Linus Torvalds" :size="AvatarSize.Small" round />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AvatarSize } from '@/packages/avatar';
</script>
