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
  </div>
</template>

<script setup lang="ts">
import { AvatarSize } from '@/packages/avatar';
</script>
