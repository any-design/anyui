<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Types &amp; Sizes</div>
      <div class="demo-row">
        <a-button size="small">Small</a-button>
        <a-button>Default</a-button>
        <a-button size="large">Large</a-button>
        <a-button type="primary">Primary</a-button>
        <a-button type="secondary">Secondary</a-button>
        <a-button type="gradient">Gradient</a-button>
        <a-button type="depth">Depth</a-button>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Round &amp; States</div>
      <div class="demo-row">
        <a-button type="primary" round>Round</a-button>
        <a-button type="primary" round anim>Anim</a-button>
        <a-button type="primary" round disabled>Disabled</a-button>
        <a-button type="primary" loading>Loading</a-button>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Icons</div>
      <div class="demo-row">
        <a-button type="primary" icon="eva:alert-circle-fill"></a-button>
        <a-button type="primary" icon="eva:alert-circle-fill" round></a-button>
        <a-button type="primary" icon="eva:alert-circle-fill">Leading</a-button>
        <a-button type="primary" icon="eva:alert-circle-fill" icon-position="trailing"
          >Trailing</a-button
        >
      </div>
    </div>
  </div>
</template>
