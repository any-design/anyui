<template>
  <a-popper
    ref="popper"
    :placement="placement"
    :offset="offset"
    :hideDelay="hideDelay"
    :appendToBody="appendToBody"
    :transition="transition"
    :zIndex="zIndex"
    :popupClass="popupClass"
    :triggerType="triggerType"
    :group="group"
  >
    <slot></slot>
    <template #popup>
      <div :class="['a-popup-menu', menuClass]" :style="menuStyle">
        <div
          v-for="item in items"
          :key="getItemKey(item)"
          class="a-popup-menu__item"
          @click="handleItemClick(getItemKey(item))"
        >
          <span>{{ getItemName(item) }}</span>
        </div>
      </div>
    </template>
  </a-popper>
</template>

<script lang="ts">
import type { Placement } from '@popperjs/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { formatStyleSize } from '../../utils';
import APopper from '../popper';
import type { APopperTriggerType } from '../popper/types';

import type { PopMenuCommandExtra, PopMenuItem } from './types';

// This component is a menu based on popper.
export default defineComponent({
  name: 'APopupMenu',
  components: {
    APopper,
  },
  props: {
    // The placement position of the popper, same as the APopper component.
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    // the menu position offset to the trigger element, unit is px
    offset: {
      type: Number,
      default: 12,
    },
    // items to render in the menu
    items: {
      type: Array as PropType<string[] | PopMenuItem[]>,
      default: () => [],
    },
    // menu width
    width: {
      type: Number,
      default: 180,
    },
    // menu hide delay when mouse move out the menu popper
    hideDelay: {
      type: Number,
      default: 100,
    },
    // the z-index of the menu popper
    zIndex: {
      type: Number,
      default: 3000,
    },
    // if true, the menu will be appended to body
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // the transition class name
    transition: {
      type: String,
      default: 'a-trans-popmenu',
    },
    // the class applied to the popup
    popupClass: {
      type: String,
    },
    // the class applied to the menu
    menuClass: {
      type: String,
    },
    // if true, menu will hide itself automatically
    hideAfterClick: {
      type: Boolean,
      default: false,
    },
    triggerType: {
      type: String as PropType<APopperTriggerType>,
      default: 'hover',
    },
    group: {
      type: String,
      default: '',
    },
  },
  emits: ['command'],
  computed: {
    menuStyle() {
      return {
        width: formatStyleSize(this.width),
      };
    },
  },
  methods: {
    getItemKey(item: unknown) {
      const menuItem = item as string | PopMenuItem;
      if (typeof menuItem === 'string') {
        return menuItem;
      }
      return menuItem.key || menuItem.name;
    },
    getItemName(item: unknown) {
      const menuItem = item as string | PopMenuItem;
      return typeof menuItem === 'string' ? menuItem : menuItem.name;
    },
    handleItemClick(key: string) {
      const popperRef = this.$refs.popper as InstanceType<typeof APopper> | undefined;
      if (this.hideAfterClick) {
        popperRef?.hide();
      }
      // will be emitted when user click on a menu item
      const extra: PopMenuCommandExtra = {
        triggerEl: popperRef?.getTriggerEl(),
        popupEl: popperRef?.getPopupEl(),
      };
      this.$emit('command', key, extra);
    },
  },
});
</script>

<style lang="scss">
.a-popup-menu {
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-semi-light));
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  border: 1px solid var(--a-surface-border-color, transparent);
  box-sizing: border-box;
  padding: 6px;
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-md, 0 4px 12px var(--shadow-10));
  overflow: hidden;

  &__item {
    padding: 8px 14px;
    line-height: 24px;
    font-size: 15px;
    user-select: none;
    border-radius: var(--a-radius-sm, 10px);
    transition: background-color var(--anim-duration-quick, 120ms) ease;
  }

  &__item:hover {
    background-color: var(--a-item-hover-bg, var(--bg-hover));
    box-shadow: var(--a-item-selected-highlight, 0 0 #0000);
    cursor: pointer;
  }

  &__item:active {
    transform: scale(0.98);
  }
}

.a-trans-popmenu-enter-active {
  transition:
    opacity var(--anim-duration-quick, 100ms) ease-out,
    transform var(--anim-duration, 200ms) var(--a-ease-spring, ease-out),
    max-height var(--anim-duration-quick, 100ms) ease-out;
}
.a-trans-popmenu-leave-active {
  transition:
    opacity var(--anim-duration-quick, 100ms) ease-out,
    transform var(--anim-duration-quick, 100ms) ease-out,
    max-height var(--anim-duration-quick, 100ms) ease-out;
}
.a-trans-popmenu-enter-to {
  opacity: 1;
  transform: translateY(0px) scale(1);
  max-height: max-content;
}
.a-trans-popmenu-enter-from,
.a-trans-popmenu-leave-to {
  opacity: 0.4;
  transform: translateY(-12px) scale(0.96);
  max-height: 0;
}
</style>
