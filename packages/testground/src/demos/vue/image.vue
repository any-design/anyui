<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">With Slots</div>
      <div class="demo-row">
        <a-image src="/favicon.png" width="200" height="200">
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
