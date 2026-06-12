<template>
  <div :class="['a-toast', `a-toast--${type}`]" role="status" @click.stop>
    <div class="a-toast__icon">
      <Icon :icon="iconName" />
    </div>
    <div class="a-toast__main">
      <div v-if="title" class="a-toast__title">{{ title }}</div>
      <div v-if="content" class="a-toast__content">{{ content }}</div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="a-toast__close"
      aria-label="Close"
      @click="$emit('close')"
    >
      <Icon :icon="CLOSE_ICON" />
    </button>
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

import { ToastIcon } from './constants';
import type { ToastType } from './types';

const CLOSE_ICON = 'ic:round-close';

// A single corner notification card, stacked by AToastContainer.
export default defineComponent({
  name: 'AToast',
  components: {
    Icon,
  },
  props: {
    // type of the toast, can be 'info', 'success', 'warning' or 'error'.
    type: {
      type: String as PropType<ToastType>,
      default: 'info',
    },
    // the title of the toast.
    title: {
      type: String,
      default: '',
    },
    // the content of the toast.
    content: {
      type: String,
      default: '',
    },
    // if true, a small close button will be rendered.
    closable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const iconName = computed(() => ToastIcon[props.type] || ToastIcon.info);

    return {
      CLOSE_ICON,
      iconName,
    };
  },
});
</script>

<style lang="scss">
.a-toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  width: 320px;
  max-width: calc(100vw - 32px);
  padding: 14px 16px;
  border-radius: var(--a-radius-lg, 18px);
  background: var(--a-surface, var(--bg-bright));
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  border: 1px solid var(--a-surface-border-color, transparent);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-md, 0 4px 10px var(--shadow-5));
  user-select: none;

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    font-size: 19px;
    line-height: 1;
    // optically align with the title line
    padding-top: 2px;

    svg {
      display: block;
    }
  }

  &__main {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 14.5px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.02rem;
    color: var(--text);
    word-break: break-word;
  }

  &__content {
    font-size: 13.5px;
    line-height: 20px;
    color: var(--text-secondary);
    word-break: break-word;
  }

  &__title + &__content {
    margin-top: 2px;
  }

  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: -1px -4px 0 0;
    padding: 0;
    border: none;
    border-radius: var(--a-radius-full, 999px);
    background: transparent;
    color: var(--text-secondary);
    font-size: 15px;
    cursor: pointer;
    outline: none;
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      background-color var(--anim-duration-quick, 120ms) ease,
      color var(--anim-duration-quick, 120ms) ease;

    &:hover {
      background: var(--a-item-hover-bg, var(--bg-hover));
      color: var(--text);
    }
    &:active {
      transform: scale(0.88);
    }
    &:focus-visible {
      box-shadow: var(--a-focus-ring, 0 0 0 3px var(--primary-18));
    }
  }
}

@mixin colored-toast($type, $color) {
  .a-toast--#{$type} {
    .a-toast__icon {
      color: var(--#{$color});
    }
  }
}

@include colored-toast('info', 'info');
@include colored-toast('success', 'success');
@include colored-toast('warning', 'warn');
@include colored-toast('error', 'danger');
</style>
