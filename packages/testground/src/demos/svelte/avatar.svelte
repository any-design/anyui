<script lang="ts">
  import { Avatar } from '@any-design/anyui-svelte';

  const src = 'https://i.pravatar.cc/120?img=12';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Sizes</div>
    <div class="demo-row">
      <Avatar {src} size="xlarge" />
      <Avatar src="https://i.pravatar.cc/96?img=12" size="large" />
      <Avatar src="https://i.pravatar.cc/64?img=12" size="medium" />
      <Avatar src="https://i.pravatar.cc/48?img=12" size="small" />
      <Avatar src="https://i.pravatar.cc/32?img=12" size="xsmall" />
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Round &amp; Custom Width</div>
    <div class="demo-row">
      <Avatar src="https://i.pravatar.cc/96?img=12" size="large" round />
      <Avatar src="https://i.pravatar.cc/80?img=12" width={40} />
      <Avatar src="https://i.pravatar.cc/96?img=5" width="56px" round />
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
      <Avatar src="https://broken.example/missing.png" name="Grace Hopper" width={40} round />
      <Avatar src="" name="Linus Torvalds" size="small" round />
    </div>
  </div>
</div>
