<template>
  <div class="a-chat">
    <a-virtual-list
      ref="virtualListRef"
      :items="transformedMessages"
      :enable-deep-watch="enableDeepWatch"
    >
      <template #default="scope">
        <div
          :class="{
            'a-chat__message': true,
            'a-chat__message--self': scope.item.role === 'self',
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
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';

import type { RawVirtualListItem } from '../virtualList';
import AVirtualList from '../virtualList';

import type { AChatMessage } from './types';

const props = defineProps({
  // the messages which match the AChatMessage ({ id: string | number; content: string; role: AChatMessageRole; }) type.
  messages: {
    type: Array as PropType<AChatMessage[]>,
    default: () => [],
  },
  // if true, the component will watch the changes of messages deeply.
  enableDeepWatch: {
    type: Boolean,
    default: false,
  },
});

const transformedMessages = computed(() => props.messages as RawVirtualListItem<AChatMessage>[]);

const virtualListRef = ref<typeof AVirtualList | undefined>();

watch(
  () => props.messages,
  () => {
    virtualListRef.value?.scrollToBottom();
  },
  { deep: true },
);
</script>

<style lang="scss">
.a-chat {
  width: 100%;
  height: 100%;
  position: relative;

  .a-virtual-list {
    padding: 0 12px;
    overflow-y: overlay;

    .a-virtual-list__item:last-child {
      .a-chat__message {
        padding-bottom: 12px;
      }
    }
  }

  &__message {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 24px;

    .a-chat__content {
      max-width: 84%;
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
        color: var(--text-btn);
      }
    }
  }

  &__message--self {
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
