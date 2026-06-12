<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Default &amp; Round</div>
      <div class="demo-col">
        <a-split></a-split>
        <a-split height="4px" round></a-split>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Margin &amp; Color</div>
      <div class="demo-col">
        <span>Content above</span>
        <a-split :margin="4" color="var(--primary)"></a-split>
        <span>Content below</span>
      </div>
    </div>
  </div>
</template>
