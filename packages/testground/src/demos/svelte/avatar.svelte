<script lang="ts">
  import { Avatar } from '@any-design/anyui-svelte';

  const src = `${import.meta.env.BASE_URL}logo.png`;
  const iconSrc = `${import.meta.env.BASE_URL}favicon.png`;
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-row">
      <Avatar {src} size="xlarge" />
      <Avatar {src} size="large" />
      <Avatar {src} size="medium" />
      <Avatar src={iconSrc} size="small" />
      <Avatar src={iconSrc} size="xsmall" />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Round &amp; Custom Width</div>
    <div class="demo-row">
      <Avatar {src} size="large" round />
      <Avatar {src} width={40} />
      <Avatar src={iconSrc} width="56px" round />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Fallback</div>
    <div class="demo-row">
      <Avatar size="large" round>AU</Avatar>
      <Avatar size="large" fallback="A" />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Name initials fallback</div>
    <div class="demo-row">
      <Avatar src="" name="Ada Lovelace" size="large" round />
      <Avatar src="" name="Turing" size="large" />
      <Avatar src="" name="宮崎駿" size="large" round />
      <Avatar src="" name="Grace Hopper" width={40} round />
      <Avatar src="" name="Linus Torvalds" size="small" round />
    </div>
  </div>
</div>
