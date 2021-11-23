<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Card</p>
    <div class="testground-flex">
      <a-card>
        <p>No Header</p>
      </a-card>
      <a-card title="Title">
        <p>With header</p>
      </a-card>
      <a-card>
        <p>With footer</p>
        <template v-slot:footer>
          <p>This is a footer</p>
        </template>
      </a-card>
      <a-card title="Title">
        <p>With header and footer</p>
        <template v-slot:footer>
          <p>This is a footer</p>
        </template>
      </a-card>
      <a-card clean>
        <p>This is a clean card</p>
        <template v-slot:footer>
          <p>This is a footer</p>
        </template>
      </a-card>
    </div>
  </div>
</template>