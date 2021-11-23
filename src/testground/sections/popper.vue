<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Popper</p>
    <div class="textground-flex">
      <a-popper placement="right">
        <template v-slot:popup>
          <span>popup</span>
        </template>
        <span>trigger</span>
      </a-popper>
    </div>
  </div>
</template>