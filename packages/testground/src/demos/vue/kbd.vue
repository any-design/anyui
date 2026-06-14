<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Single keys</div>
      <div class="demo-row">
        <a-kbd>Esc</a-kbd>
        <a-kbd>Tab</a-kbd>
        <a-kbd>Enter</a-kbd>
        <a-kbd>⇧</a-kbd>
        <a-kbd>A</a-kbd>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Combos</div>
      <div class="demo-row">
        <span class="kbd-combo"><a-kbd>⌘</a-kbd><a-kbd>K</a-kbd></span>
        <span class="kbd-combo"><a-kbd>⌃</a-kbd><a-kbd>⌥</a-kbd><a-kbd>Del</a-kbd></span>
        <span class="kbd-combo"><a-kbd>⌘</a-kbd><a-kbd>⇧</a-kbd><a-kbd>P</a-kbd></span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Small size inside text</div>
      <div class="demo-row">
        <span>
          Press <a-kbd size="small">⌘</a-kbd> <a-kbd size="small">K</a-kbd> to open the command
          palette, or <a-kbd size="small">/</a-kbd> to search.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-combo {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
