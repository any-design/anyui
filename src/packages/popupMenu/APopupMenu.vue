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
import { defineComponent, PropType } from 'vue';
import { formatStyleSize } from '../../utils';

import type APopper from '../popper';

import { PopMenuItem } from './types';
import { APopperTriggerType } from '../popper/types';

// This component is a menu based on popper.
export default defineComponent({
  name: 'APopupMenu',
  props: {
    // The placement position of the popper, same as the APopper component.
    placement: {
      type: String,
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
      if (this.$refs.popper && this.hideAfterClick) {
        (this.$refs.popper as InstanceType<typeof APopper>).hide();
      }
      // will be emitted when user click on a menu item
      this.$emit('command', key);
    },
  },
});
</script>

<style lang="scss">
.a-popup-menu {
  border-radius: 12px;
  background: var(--bg-semi-light);
  box-sizing: border-box;
  padding: 8px 0;
  box-shadow: 0 4px 12px var(--shadow-10);
  overflow: hidden;

  &__item {
    padding: 8px 16px;
    line-height: 24px;
    font-size: 15px;
    user-select: none;
    transition: background-color var(--anim-duration, 200ms) ease;
  }

  &__item:hover {
    background-color: var(--bg-semi-dark);
    cursor: pointer;
  }
}

.a-trans-popmenu-enter-active,
.a-trans-popmenu-leave-active {
  transition: opacity var(--anim-duration-quick, 100ms) ease-out,
    transform var(--anim-duration-quick, 100ms) ease-out,
    max-height var(--anim-duration-quick, 100ms) ease-out;
}
.a-trans-popmenu-enter-to {
  opacity: 1;
  transform: translateY(0px);
  max-height: max-content;
}
.a-trans-popmenu-enter-from,
.a-trans-popmenu-leave-to {
  opacity: 0.4;
  transform: translateY(-12px);
  max-height: 0;
}
</style>
