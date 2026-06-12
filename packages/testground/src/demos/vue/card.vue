<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Variants</div>
      <div class="demo-row">
        <a-card>
          <p>No Header</p>
        </a-card>
        <a-card title="Title">
          <p>With header</p>
        </a-card>
        <a-card>
          <p>With footer</p>
          <template #footer>
            <p>This is a footer</p>
          </template>
        </a-card>
        <a-card title="Title">
          <p>With header and footer</p>
          <template #footer>
            <p>This is a footer</p>
          </template>
        </a-card>
        <a-card clean>
          <p>This is a clean card</p>
          <template #footer>
            <p>This is a footer</p>
          </template>
        </a-card>
      </div>
    </div>
  </div>
</template>
