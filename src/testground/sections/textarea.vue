<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Textarea</p>
    <div class="testground-flex">
      <a-textarea placeholder="This is a textarea..."></a-textarea>
      <a-textarea
        placeholder="This is a textarea..."
        :minRows="1"
        :maxRows="6"
        disableResizeCorner
      ></a-textarea>
      <a-textarea placeholder="This is a textarea..." borderless></a-textarea>
      <a-textarea
        placeholder="This is a textarea..."
        :minRows="1"
        :maxRows="6"
        disableResizeCorner
        autoMatchHeight
        borderless
      ></a-textarea>
    </div>
  </div>
</template>
