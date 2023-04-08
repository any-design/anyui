<template>
  <div class="a-chat">
    <a-virtual-list :items="virtualListItems">
      <template #default="scope">
        <div
          :class="{
            'a-chat__message': true,
            'a-chat__message--user': scope.item.role === 'user',
            'a-chat__message--target': scope.item.role === 'target',
          }"
        >
          <div class="a-chat__content">
            <pre>{{ scope.item.content }}</pre>
          </div>
        </div>
      </template>
    </a-virtual-list>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';

import AVirtualList, { RawVirtualListItem } from '../virtualList';

import type { AChatMessage } from './types';

const props = defineProps({
  messages: {
    type: Array as PropType<AChatMessage[]>,
  },
});

const virtualListItems = computed(() => props.messages as RawVirtualListItem<AChatMessage>[]);
</script>

<style lang="scss" scoped>
.a-chat {
  width: 100%;
  height: 100%;
  position: relative;

  .a-virtual-list {
    padding: 0 12px;
    overflow-y: overlay;
  }

  &__message {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 24px;

    .a-chat__content {
      max-width: 45%;
      padding: 14px 20px;
      box-sizing: border-box;
      position: relative;
      border-radius: 12px;
      box-shadow: 2px 2px 8px var(--shadow-6);
      font-size: 15px;

      pre {
        width: max-content;
        max-width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
        margin: 0;
        padding: 0;
        line-height: 24px;
      }
    }
  }

  &__message--target {
    justify-content: flex-start;

    .a-chat__content {
      background-color: var(--primary-80);

      pre {
        color: var(--text-white);
      }
    }
  }

  &__message--user {
    justify-content: flex-end;

    .a-chat__content {
      background-color: var(--bg-light);

      pre {
        color: var(--text);
      }
    }
  }
}
</style>
