<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Layout</p>
    <div class="testground-flex" style="height: 400px">
      <a-layout>
        <a-side>Side</a-side>
        <a-layout>
          <a-header :height="80">Header</a-header>
          <a-content>Content</a-content>
          <a-footer>Footer</a-footer>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a-layout-inner {
  background-color: var(--primary);
  color: var(--text-btn);
  display: flex;
  align-items: center;
  justify-content: center;
}
.a-side {
  background-color: var(--bg-light);
  color: var(--primary);
}
.a-content {
  background-color: var(--primary-80);
  height: 100%;
}
</style>
