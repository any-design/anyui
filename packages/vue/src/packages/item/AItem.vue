<template>
  <component
    :is="rootTag"
    :class="[
      'a-item',
      {
        'a-item--small': size === 'small',
        'a-item--outline': variant === 'outline',
        'a-item--clickable': interactive,
        'a-item--disabled': disabled,
      },
    ]"
    :href="rootTag === 'a' ? href : undefined"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive && rootTag !== 'a' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div v-if="$slots.media" class="a-item__media">
      <slot name="media"></slot>
    </div>
    <div class="a-item__content">
      <slot>
        <div v-if="title" class="a-item__title">{{ title }}</div>
        <div v-if="description" class="a-item__description">{{ description }}</div>
      </slot>
    </div>
    <div v-if="$slots.actions" class="a-item__actions">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { AItemSize, AItemVariant } from './types';

// A flexible list item primitive with media / content / actions areas.
export default defineComponent({
  name: 'AItem',
  props: {
    // the title of the item
    title: {
      type: String,
      default: '',
    },
    // the secondary description text, clamped to 2 lines
    description: {
      type: String,
      default: '',
    },
    // if true, the item gets hover / press affordances and emits click
    clickable: {
      type: Boolean,
      default: false,
    },
    // if set, the item renders as an anchor element
    href: {
      type: String,
      default: '',
    },
    // size of the item, can be 'default' or 'small'
    size: {
      type: String as PropType<AItemSize>,
      default: 'default',
    },
    // if true, the item will not respond to interactions
    disabled: {
      type: Boolean,
      default: false,
    },
    // visual variant, 'outline' adds a hairline border + control surface
    variant: {
      type: String as PropType<AItemVariant>,
      default: 'default',
    },
  },
  emits: ['click'],
  computed: {
    rootTag(): string {
      return this.href && !this.disabled ? 'a' : 'div';
    },
    interactive(): boolean {
      return (this.clickable || !!this.href) && !this.disabled;
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      // will be emitted when user click on an enabled item
      this.$emit('click', event);
    },
    handleKeydown(event: KeyboardEvent) {
      if (!this.interactive || this.rootTag === 'a') {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
      }
    },
  },
});
</script>

<style lang="scss">
.a-item {
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: var(--a-radius, 14px);
  color: var(--text);
  text-decoration: none;
  transition:
    background-color var(--anim-duration-quick, 120ms) ease,
    transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);

  &__media {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--a-radius-sm, 10px);
    background: var(--primary-12);
    color: var(--primary);
    font-size: 18px;
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 14.5px;
    font-weight: 600;
    line-height: 20px;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__description {
    font-size: 13px;
    line-height: 18px;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
}

.a-item--small {
  gap: 10px;
  padding: 8px 12px;

  .a-item__media {
    width: 30px;
    height: 30px;
    font-size: 15px;
  }

  .a-item__title {
    font-size: 13.5px;
    line-height: 18px;
  }

  .a-item__description {
    font-size: 12.5px;
    line-height: 16px;
  }
}

.a-item--outline {
  border: 1px solid var(--line);
  background: var(--a-surface-control, var(--bg-bright));
}

.a-item--clickable {
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--a-item-hover-bg, var(--bg-hover));
  }

  &:active {
    transform: scale(0.985);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--a-focus-ring, 0 0 0 3px var(--primary-18));
  }
}

.a-item--disabled {
  cursor: not-allowed;

  .a-item__title,
  .a-item__description {
    color: var(--text-disabled);
  }

  .a-item__media {
    background: var(--bg-disabled);
    color: var(--text-disabled);
  }
}
</style>
