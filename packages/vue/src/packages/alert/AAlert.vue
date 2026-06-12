<template>
  <transition name="a-alert">
    <div v-if="visible" :class="['a-alert', `a-alert--${type}`]" role="alert">
      <div v-if="showIcon" class="a-alert__icon">
        <slot name="icon">
          <Icon :icon="iconName" />
        </slot>
      </div>
      <div class="a-alert__main">
        <div v-if="title" class="a-alert__title">{{ title }}</div>
        <div v-if="hasContent" class="a-alert__content">
          <slot></slot>
        </div>
      </div>
      <button
        v-if="closable"
        type="button"
        class="a-alert__close"
        aria-label="Close"
        @click="onCloseClicked"
      >
        <Icon :icon="CLOSE_ICON" />
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { computed, defineComponent, ref, useSlots } from 'vue';

import { DefaultIcon } from '../message/constants';

import type { AlertType } from './types';

const CLOSE_ICON = 'ic:round-close';

// default icons per type, reusing the message icon set
const AlertIcon: Record<AlertType, string> = {
  info: DefaultIcon.info,
  success: DefaultIcon.success,
  warn: DefaultIcon.warning,
  danger: DefaultIcon.error,
};

// A static inline banner for contextual feedback.
export default defineComponent({
  name: 'AAlert',
  components: {
    Icon,
  },
  props: {
    // type of the alert, can be 'info', 'success', 'warn' or 'danger'.
    type: {
      type: String as PropType<AlertType>,
      default: 'info',
    },
    // the title of the alert.
    title: {
      type: String,
      default: '',
    },
    // if true, a small close button will be rendered.
    closable: {
      type: Boolean,
      default: false,
    },
    // whether to show the type icon.
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(true);
    const hasContent = !!useSlots().default;

    const iconName = computed(() => AlertIcon[props.type] || AlertIcon.info);

    const onCloseClicked = () => {
      visible.value = false;
      emit('close');
    };

    return {
      CLOSE_ICON,
      visible,
      hasContent,
      iconName,
      onCloseClicked,
    };
  },
});
</script>

<style lang="scss">
// leave transition: quick fade & shrink
.a-alert-leave-active {
  transition:
    opacity var(--anim-duration, 200ms) ease,
    transform var(--anim-duration, 200ms) var(--a-ease-soft, ease);
}
.a-alert-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.a-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--a-radius, 14px);
  border: 1px solid transparent;
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  box-shadow: var(--a-surface-highlight, 0 0 #0000);

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 1;
    // optically align with the first text line
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
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0.02rem;
  }

  &__content {
    font-size: 14px;
    line-height: 22px;
    color: var(--text-80, var(--text));
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

@mixin colored-alert($type) {
  .a-alert--#{$type} {
    background: color-mix(in srgb, var(--#{$type}) 12%, var(--a-alert-surface, var(--bg-bright)));
    border-color: color-mix(in srgb, var(--#{$type}) 25%, transparent);

    .a-alert__icon,
    .a-alert__title {
      color: var(--#{$type});
    }
  }
}

@include colored-alert('info');
@include colored-alert('success');
@include colored-alert('warn');
@include colored-alert('danger');
</style>
