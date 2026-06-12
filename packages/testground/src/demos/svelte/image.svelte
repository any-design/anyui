<script lang="ts">
  import { Image } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Image src="https://picsum.photos/seed/anyui/300/200" width={160} height={100} />
      <Image
        src="https://picsum.photos/seed/anyui/300/200"
        width={160}
        height={100}
        size="contain"
      />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">States</div>
    <div class="demo-row">
      <Image width={160} height={100} loading="Loading..." />
      <Image width={160} height={100} error="Failed to load" />
    </div>
  </div>
</div>
