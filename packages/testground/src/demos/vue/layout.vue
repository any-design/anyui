<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Side + Header / Content / Footer</div>
      <div class="layout-wrapper">
        <a-layout>
          <a-side>Side</a-side>
          <a-layout>
            <a-header :height="60">Header</a-header>
            <a-content>Content</a-content>
            <a-footer>Footer</a-footer>
          </a-layout>
        </a-layout>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Side on the Right</div>
      <div class="layout-wrapper">
        <a-layout>
          <a-layout>
            <a-content>Content</a-content>
            <a-footer>Footer</a-footer>
          </a-layout>
          <a-side>Side</a-side>
        </a-layout>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
}
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
}
</style>
