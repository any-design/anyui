<template>
  <div
    :class="{
      'a-accordion-item': true,
      'a-accordion-item--expanded': expanded,
      'a-accordion-item--disabled': disabled,
    }"
  >
    <div
      class="a-accordion-item__header"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="expanded"
      :aria-disabled="disabled"
      @click="toggle"
      @keydown="handleKeyDown"
    >
      <span v-if="icon" class="a-accordion-item__icon">
        <Icon :icon="icon" />
      </span>
      <span class="a-accordion-item__title">
        <slot name="header">{{ title }}</slot>
      </span>
      <span class="a-accordion-item__arrow">
        <Icon :icon="expandIcon" />
      </span>
    </div>
    <ACollapse :visible="expanded" always-render>
      <div class="a-accordion-item__content">
        <slot></slot>
      </div>
    </ACollapse>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { Icon } from '@iconify/vue';

import ACollapse from '@/packages/collapse/ACollapse.vue';
import { ACCORDION_CONTEXT } from './constants';

export default defineComponent({
  name: 'AAccordionItem',
  components: { Icon, ACollapse },
  props: {
    // the value that identifies this item. when omitted, the index is used.
    value: {
      type: [String, Number],
      default: undefined,
    },
    // header text. ignored when the header slot is used.
    title: {
      type: String,
      default: '',
    },
    // leading icon name (iconify).
    icon: {
      type: String,
      default: '',
    },
    // expand / collapse icon name (iconify).
    expandIcon: {
      type: String,
      default: 'ic:round-keyboard-arrow-down',
    },
    // disable this item.
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const ctx = inject(ACCORDION_CONTEXT, undefined as any);
    const expanded = ctx ? ctx.isItemExpanded(props.value) : ref(false);

    const toggle = () => {
      if (props.disabled) return;
      ctx?.toggle(props.value);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (props.disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    };

    return {
      expanded,
      toggle,
      handleKeyDown,
    };
  },
});
</script>

<style lang="scss">
.a-accordion-item {
  // inset hairline divider — anyui uses --line for these, never --border, so
  // the divisions read as gentle guides instead of hard rules
  border-bottom: 1px solid var(--line);
  transition: background-color var(--anim-duration-quick, 120ms) ease;

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    transition:
      background-color var(--anim-duration-quick, 120ms) ease,
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);

    // the shared anyui item hover wash; the glass theme overrides this token
    &:hover {
      background: var(--a-item-hover-bg, var(--bg-hover));
    }
    &:active {
      // a small squish on tap, like buttons / checkboxes
      transform: scale(0.995);
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    color: var(--text-secondary);
    transition: color var(--anim-duration, 200ms) ease;
  }

  &__title {
    flex: 1;
    font-size: 14px;
    color: var(--text);
    font-weight: 600;
    letter-spacing: 0.04rem;
    transition: color var(--anim-duration, 200ms) ease;
  }

  &__arrow {
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    color: var(--text-disabled);
    // springy overshoot for the chevron flip — the cute "toggle" feel
    transition:
      transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      color var(--anim-duration, 200ms) ease;
  }

  &__content {
    width: 100%;
    padding: 4px 18px 18px;
    box-sizing: border-box;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.65;
  }

  // collapse uses max-content width; force the item content to fill the panel
  .a-collapse {
    width: 100%;
  }

  &--expanded {
    .a-accordion-item__arrow {
      transform: rotate(180deg);
      color: var(--primary);
    }
    .a-accordion-item__title {
      color: var(--primary);
    }
    .a-accordion-item__icon {
      color: var(--primary);
    }
    // a whisper of primary wash on the open item so the active panel feels alive
    .a-accordion-item__header {
      background: var(--primary-6, color-mix(in srgb, var(--primary) 6%, transparent));
    }
  }

  &--disabled {
    .a-accordion-item__header {
      cursor: not-allowed;
      color: var(--text-disabled);
      &:hover,
      &:active {
        background: transparent;
        transform: none;
      }
    }
    .a-accordion-item__title,
    .a-accordion-item__icon {
      color: var(--text-disabled);
    }
  }
}

// when the accordion is borderless, give each item its own little rounded
// surface (the "deep" list-view look) so it still reads as a stack of cards
.a-accordion:not(.a-accordion--border) .a-accordion-item {
  border-bottom: none;
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-bright));
  box-shadow: var(--a-shadow-xs, 0 1px 3px var(--shadow-4), 0 2px 8px var(--shadow-4));
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>