<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Inset</div>
      <div class="demo-row">
        <a-popper placement="right" :appendToBody="false">
          <template #popup>
            <span>popup</span>
          </template>
          <span>trigger</span>
        </a-popper>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">With Transition</div>
      <div class="demo-row">
        <a-popper placement="right" transition="fade">
          <template #popup>
            <span>popup</span>
          </template>
          <span>trigger (transition)</span>
        </a-popper>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all var(--anim-duration, 200ms) ease;
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
