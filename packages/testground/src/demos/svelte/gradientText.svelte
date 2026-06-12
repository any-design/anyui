<script lang="ts">
  import { GradientText } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Basic</div>
    <div class="demo-row">
      <GradientText>Default gradient</GradientText>
      <GradientText reverseGradient>Reversed</GradientText>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Custom</div>
    <div class="demo-row">
      <GradientText gradient="linear-gradient(90deg, #f6d365, #fda085)">
        Custom gradient
      </GradientText>
      <GradientText size={24}>Large text</GradientText>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Glow</div>
    <div class="demo-row">
      <GradientText size={24} glow>Glowing text</GradientText>
      <GradientText size={24} glow reverseGradient>Reversed glow</GradientText>
    </div>
  </div>
</div>
