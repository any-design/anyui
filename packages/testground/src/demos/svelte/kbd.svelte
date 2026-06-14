<script lang="ts">
  import { Kbd } from '@any-design/anyui-svelte';
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Single keys</div>
    <div class="demo-row">
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>A</Kbd>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Combos</div>
    <div class="demo-row">
      <span class="kbd-combo"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
      <span class="kbd-combo"><Kbd>⌃</Kbd><Kbd>⌥</Kbd><Kbd>Del</Kbd></span>
      <span class="kbd-combo"><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>P</Kbd></span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Small size inside text</div>
    <div class="demo-row">
      <span>
        Press <Kbd size="small">⌘</Kbd> <Kbd size="small">K</Kbd> to open the command palette, or
        <Kbd size="small">/</Kbd> to search.
      </span>
    </div>
  </div>
</div>

<style>
  .kbd-combo {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
</style>
