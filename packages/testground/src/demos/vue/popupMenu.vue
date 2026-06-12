<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Triggers</div>
      <div class="demo-row">
        <a-popup-menu :items="items" @command="handleCommand">
          <span>trigger (hover)</span>
        </a-popup-menu>
        <a-popup-menu :items="items" triggerType="click">
          <span>trigger (click)</span>
        </a-popup-menu>
        <a-popup-menu :items="items" :appendToBody="false">
          <span>trigger (inset)</span>
        </a-popup-menu>
        <a-popup-menu :items="items" triggerType="click" hideAfterClick>
          <span>trigger (click &amp; hideAfterClick)</span>
        </a-popup-menu>
        <a-popup-menu :items="items" triggerType="contextmenu" hideAfterClick>
          <span>trigger (contextmenu)</span>
        </a-popup-menu>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Grouped</div>
      <div class="demo-row">
        <a-popup-menu group="test" :items="items" triggerType="click" hideAfterClick>
          <span>trigger (click) (grouped)</span>
        </a-popup-menu>
        <a-popup-menu group="test" :items="items" triggerType="contextmenu" hideAfterClick>
          <span>trigger (contextmenu) (grouped)</span>
        </a-popup-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PopMenuCommandExtra } from '@/packages/popupMenu/types';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const handleCommand = (command: string, extra: PopMenuCommandExtra) => {
  console.log('command', command, 'extra', extra);
};
</script>
