<script lang="ts">
  import { Tag } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-row">
      <Tag size="small">small</Tag>
      <Tag>default</Tag>
      <Tag size="large">large</Tag>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Round &amp; Custom Color</div>
    <div class="demo-row">
      <Tag round>round</Tag>
      <Tag color="#1faeff">custom color</Tag>
      <Tag round color="#e52e71" bgColor="#ffe2ec">custom bg</Tag>
    </div>
  </div>
</div>
