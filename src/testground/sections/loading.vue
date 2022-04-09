<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Loading</p>
    <div class="testground-flex">
      <a-loading class="loading" />
      <a-loading class="spinner" type="spinner" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  font-size: 10px;
}
.spinner {
  font-size: 24px;
}
</style>
