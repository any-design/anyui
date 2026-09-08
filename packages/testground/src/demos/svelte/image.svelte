<script lang="ts">
  import { Image } from '@any-design/anyui-svelte';

  const imageSrc = `${import.meta.env.BASE_URL}logo.png`;
  const iconSrc = `${import.meta.env.BASE_URL}favicon.png`;
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <Image src={imageSrc} width={160} height={100} />
      <Image src={iconSrc} width={160} height={100} size="contain" />
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
