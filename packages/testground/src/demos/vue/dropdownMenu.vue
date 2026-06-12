<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic (click trigger)</div>
      <div class="demo-row">
        <a-dropdown-menu :items="items" @command="handleCommand" @visible-change="handleVisibleChange">
          <a-button>Open Menu</a-button>
        </a-dropdown-menu>
        <a-dropdown-menu :items="items" disabled @command="handleCommand">
          <a-button>Disabled Dropdown</a-button>
        </a-dropdown-menu>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Hover trigger</div>
      <div class="demo-row">
        <a-dropdown-menu :items="items" triggerType="hover" @command="handleCommand">
          <a-button type="primary">Hover Me</a-button>
        </a-dropdown-menu>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Custom width</div>
      <div class="demo-row">
        <a-dropdown-menu :items="items" :width="240" @command="handleCommand">
          <a-button>Wide Menu (240px)</a-button>
        </a-dropdown-menu>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Last Command</div>
      <div class="demo-row">
        <span>{{ lastCommand || '(none)' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DropdownMenuItem } from '@/packages/dropdownMenu/types';

const items: DropdownMenuItem[] = [
  { command: 'edit', label: 'Edit', icon: 'uil:edit' },
  { command: 'duplicate', label: 'Duplicate', icon: 'uil:copy' },
  { command: 'archive', label: 'Archive', icon: 'uil:archive', disabled: true },
  { command: 'delete', label: 'Delete', icon: 'uil:trash-alt', danger: true, divided: true },
];

const lastCommand = ref('');

const handleCommand = (command: string | number, item: DropdownMenuItem) => {
  lastCommand.value = `${command} (${item.label})`;
};

const handleVisibleChange = (visible: boolean) => {
  console.log('dropdown visible:', visible);
};
</script>
