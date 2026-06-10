<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Image</p>
    <div class="testground-flex">
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
</template>
