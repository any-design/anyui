<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Variants</div>
      <div class="demo-col">
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
  </div>
</template>
