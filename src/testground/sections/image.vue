<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Image</p>
    <div class="textground-flex">
      <a-image
        src="https://avatars.githubusercontent.com/u/93182835?s=200&v=4"
        width="200"
        height="200"
      >
        <template v-slot:loading><span>Loading</span></template>
        <template v-slot:error><span>Error</span></template>
      </a-image>
    </div>
  </div>
</template>