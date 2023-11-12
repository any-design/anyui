<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Button</p>
    <div class="testground-flex">
      <a-button size="small">Small</a-button>
      <a-button>Default</a-button>
      <a-button size="large">Large</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary" round>Round</a-button>
      <a-button type="primary" round anim>Anim</a-button>
      <a-button size="small" round>Small Round</a-button>
      <a-button size="large" round>Large</a-button>
      <a-button type="primary" round disabled>Disabled</a-button>
    </div>
    <div class="testground-flex" style="margin-top: 24px">
      <a-button type="primary" size="small" icon="eva:alert-circle-fill"></a-button>
      <a-button type="primary" icon="eva:alert-circle-fill"></a-button>
      <a-button type="primary" size="large" icon="eva:alert-circle-fill"></a-button>
      <a-button type="primary" size="small" icon="eva:alert-circle-fill" round></a-button>
      <a-button type="primary" icon="eva:alert-circle-fill" round></a-button>
      <a-button type="primary" size="large" icon="eva:alert-circle-fill" round></a-button>
      <a-button type="primary" size="small" icon="eva:alert-circle-fill"
        >Small Icon Button</a-button
      >
      <a-button type="primary" icon="eva:alert-circle-fill">Icon Button</a-button>
      <a-button type="primary" size="large" icon="eva:alert-circle-fill"
        >Large Icon Button</a-button
      >
    </div>
    <div class="testground-flex" style="margin-top: 24px">
      <a-button type="primary" size="small" icon="eva:alert-circle-fill" round
        >Small Icon Button</a-button
      >
      <a-button type="primary" icon="eva:alert-circle-fill" round>Icon Button</a-button>
      <a-button type="primary" size="large" icon="eva:alert-circle-fill" round
        >Large Icon Button</a-button
      >
      <a-button type="primary" size="small" icon="eva:alert-circle-fill" iconPosition="trailing"
        >Small Icon Button</a-button
      >
      <a-button type="primary" icon="eva:alert-circle-fill" iconPosition="trailing"
        >Icon Button</a-button
      >
      <a-button type="primary" size="large" icon="eva:alert-circle-fill" iconPosition="trailing"
        >Large Icon Button</a-button
      >
    </div>
    <div class="testground-flex" style="margin-top: 24px">
      <a-button
        type="primary"
        size="small"
        icon="eva:alert-circle-fill"
        iconPosition="trailing"
        round
        >Small Icon Button</a-button
      >
      <a-button type="primary" icon="eva:alert-circle-fill" iconPosition="trailing" round
        >Icon Button</a-button
      >
      <a-button
        type="primary"
        size="large"
        icon="eva:alert-circle-fill"
        iconPosition="trailing"
        round
        >Large Icon Button</a-button
      >
      <a-button type="primary" textShadow>Text Shadow 1</a-button>
      <a-button textShadow>Text Shadow 2</a-button>
      <a-button type="depth">Depth</a-button>
      <a-button type="gradient">Gradient</a-button>
      <a-button type="gradient-reverse">Gradient (Reverse)</a-button>
    </div>
    <div class="testground-flex" style="margin-top: 24px">
      <a-button loading></a-button>
      <a-button loading type="primary">按钮文本</a-button>
      <a-button loading type="secondary">按钮文本</a-button>
      <a-button loading type="primary" round>按钮文本</a-button>
      <a-button loading type="gradient" round>按钮文本</a-button>
      <a-button loading type="depth" round>按钮文本</a-button>
      <a-button loading type="anim" round>按钮文本</a-button>
      <a-button type="primary" icon="eva:alert-circle-fill" iconPosition="trailing" loading
        >Icon Button</a-button
      >
    </div>
  </div>
</template>
