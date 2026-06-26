<template>
  <div
    ref="element"
    :class="{
      'a-tab': true,
      'a-tab--active': active,
      'a-tab--disabled': disabled,
    }"
    role="tab"
    :aria-selected="active"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <span v-if="icon" class="a-tab__icon">
      <Icon :icon="icon" />
    </span>
    <span class="a-tab__label"><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { TABS_CONTEXT } from './constants';

export default defineComponent({
  name: 'ATab',
  components: { Icon },
  props: {
    // the value that identifies this tab. when omitted, the index is used.
    value: {
      type: [String, Number],
      default: undefined,
    },
    // disable interaction for this tab.
    disabled: {
      type: Boolean,
      default: false,
    },
    // leading icon name (iconify).
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const ctx = inject(TABS_CONTEXT, undefined as any);
    const element = ref<HTMLElement | undefined>();

    const active = ctx
      ? ctx.isTabActive(props.value, () => element.value)
      : false;

    const reportPosition = () => {
      if (!element.value || !ctx) return;
      const containerRect = ctx.getBarRect();
      if (!containerRect) return;
      const rect = element.value.getBoundingClientRect();
      ctx.updateIndicator({
        width: rect.width,
        left: rect.left - containerRect.left,
      });
    };

    const handleClick = () => {
      if (props.disabled) return;
      ctx?.select(props.value);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (props.disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      } else if (ctx) {
        ctx.handleKeyDown(event);
      }
    };

    return {
      element,
      active,
      handleClick,
      handleKeyDown,
      reportPosition,
    };
  },
});
</script>

<style lang="scss">
.a-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  position: relative;
  // springy overshoot for the hover lift, soft ease for the color cross-fade
  transition:
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
    color var(--anim-duration, 200ms) var(--a-ease-soft, ease);

  &__icon {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    color: var(--text-disabled);
    transition: color var(--anim-duration, 200ms) ease;
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &:hover:not(.a-tab--disabled) {
    color: var(--primary);
    // a tiny upward nudge — the signature anyui control hover
    transform: translateY(-1px);
    .a-tab__icon {
      color: var(--primary);
    }
  }
  &:active:not(.a-tab--disabled) {
    // squish on press, like buttons / checkboxes
    transform: translateY(0) scale(0.97);
  }

  &--active {
    color: var(--primary);
    .a-tab__icon {
      color: var(--primary);
    }
  }

  &--disabled {
    cursor: not-allowed;
    color: var(--text-disabled);
    .a-tab__icon {
      color: var(--text-disabled);
    }
  }
}

.a-tabs--small .a-tab {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}
.a-tabs--large .a-tab {
  height: 48px;
  padding: 0 22px;
  font-size: 16px;
}

// card variant: tabs are rounded pills. the active pill lifts with a soft
// primary-tinted gradient + diffuse glow (mirrors the colored Button mixin),
// and hover tints the surface with --primary-12 instead of a flat 10% mix.
.a-tabs--card {
  .a-tab {
    border-radius: var(--a-radius, 14px);
    color: var(--text-secondary, var(--text));
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      background-color var(--anim-duration-quick, 120ms) ease,
      color var(--anim-duration, 200ms) ease,
      box-shadow var(--anim-duration-quick, 120ms) ease;

    &:hover:not(.a-tab--disabled):not(.a-tab--active) {
      background-color: var(--primary-12, color-mix(in srgb, var(--primary) 12%, transparent));
      color: var(--primary);
      transform: translateY(-1px);
    }

    &--active {
      color: var(--text-btn, #fff);
      background: linear-gradient(180deg, var(--primary-l-6, var(--primary)) 0%, var(--primary-d-4, var(--primary)) 100%);
      box-shadow:
        var(--a-surface-highlight, 0 0 #0000),
        0 6px 18px -6px color-mix(in srgb, var(--primary) 55%, transparent),
        0 2px 6px var(--shadow-4);
      .a-tab__icon {
        color: var(--text-btn, #fff);
      }
      &:hover {
        // brighten + deepen the glow rather than shifting to a flat fill
        background: linear-gradient(180deg, var(--primary) 0%, var(--primary-85, var(--primary)) 100%);
        box-shadow:
          var(--a-surface-highlight, 0 0 #0000),
          0 8px 22px -6px color-mix(in srgb, var(--primary) 62%, transparent),
          0 2px 6px var(--shadow-4);
      }
      &:active {
        background: var(--primary-75, var(--primary));
        transform: translateY(0) scale(0.97);
        box-shadow:
          var(--a-surface-highlight, 0 0 #0000),
          0 4px 12px -4px color-mix(in srgb, var(--primary) 48%, transparent);
      }
    }
  }
}
</style>