<template>
  <div class="testground-content__item">
    <p class="testground-content-title">PopMenu</p>
    <div class="testground-flex">
      <a-popup-menu :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']">
        <span>trigger</span>
      </a-popup-menu>
      <a-popup-menu :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']" :appendToBody="false">
        <span>trigger</span>
      </a-popup-menu>
    </div>
  </div>
</template>
