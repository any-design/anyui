<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Popper</p>
    <div class="testground-flex">
      <a-popper placement="right" :appendToBody="false">
        <template #popup>
          <span>popup</span>
        </template>
        <span>trigger</span>
      </a-popper>
    </div>
    <div class="testground-flex">
      <a-popper placement="right" transition="fade">
        <template #popup>
          <span>popup</span>
        </template>
        <span>trigger (transition)</span>
      </a-popper>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 200ms ease;
}
.fade-enter-to {
  top: 0 !important;
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  top: -4px !important;
  opacity: 0;
}
</style>
