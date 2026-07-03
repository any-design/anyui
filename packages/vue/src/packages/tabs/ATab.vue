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

    const tab = ctx?.registerTab(props.value);
    const active = tab?.active ?? false;

    const handleClick = () => {
      if (props.disabled) return;
      if (tab) {
        ctx?.select(tab.key);
      }
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
  color: var(--text-secondary, var(--text));
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  position: relative;
  z-index: 1;
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
    color: inherit;
    transition: color var(--anim-duration, 200ms) ease;
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

  // default variant: the active tab reads as clearly primary — primary color +
  // a bolder weight so it stands out from the muted inactive tabs even before
  // any surrounding content is registered.
  .a-tabs--default &,
  .a-tabs--line & {
    &--active {
      color: var(--primary);
      font-weight: 700;
      .a-tab__icon {
        color: var(--primary);
      }
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

// card variant: tabs are rounded pills inside a soft tray. The active tab owns
// its filled state so the selected label stays readable even before the
// indicator has measured.
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
      background: linear-gradient(180deg, var(--primary-l-6, var(--primary)) 0%, var(--primary-d-4, var(--primary)) 100%);
      color: var(--text-btn, #fff);
      box-shadow:
        var(--a-surface-highlight, 0 0 #0000),
        0 6px 18px -6px color-mix(in srgb, var(--primary) 55%, transparent),
        0 2px 6px var(--shadow-4);

      .a-tab__icon {
        color: var(--text-btn, #fff);
      }

      &:hover {
        background: linear-gradient(180deg, var(--primary) 0%, var(--primary-85, var(--primary)) 100%);
        box-shadow:
          var(--a-surface-highlight, 0 0 #0000),
          0 8px 22px -6px color-mix(in srgb, var(--primary) 62%, transparent),
          0 2px 6px var(--shadow-4);
        transform: translateY(-1px);
      }

      &:active {
        background: var(--primary-75, var(--primary));
        box-shadow:
          var(--a-surface-highlight, 0 0 #0000),
          0 4px 12px -4px color-mix(in srgb, var(--primary) 48%, transparent);
        transform: translateY(0) scale(0.97);
      }
    }
  }
}

.a-tabs--card.a-tabs--small .a-tab {
  border-radius: var(--a-radius-sm, 10px);
}
.a-tabs--card.a-tabs--large .a-tab {
  border-radius: var(--a-radius-lg, 18px);
}
</style>
