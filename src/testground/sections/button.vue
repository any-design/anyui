<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Button</p>
    <div class="testground-flex">
      <a-button>Default</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary" round>Round</a-button>
      <a-button type="primary" round anim>Anim</a-button>
      <a-button size="large" round>Large</a-button>
      <a-button size="small" round>Small</a-button>
      <a-button type="primary" round :disabled="true">Disabled</a-button>
    </div>
    <div class="testground-flex" style="margin-top: 20px">
      <a-button type="primary" icon="eva:alert-circle-fill"></a-button>
      <a-button type="primary" icon="eva:alert-circle-fill">Icon Button</a-button>
      <a-button type="primary" size="large" icon="eva:alert-circle-fill"
        >Large Icon Button</a-button
      >
      <a-button type="primary" size="small" icon="eva:alert-circle-fill"
        >Small Icon Button</a-button
      >
    </div>
  </div>
</template>