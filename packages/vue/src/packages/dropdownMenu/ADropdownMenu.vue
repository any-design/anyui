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
    :triggerType="disabled ? 'manual' : triggerType"
    :group="group"
    @popupStatusChanged="handlePopupStatusChanged"
  >
    <slot></slot>
    <template #popup>
      <div :class="['a-dropdown-menu', menuClass]" :style="menuStyle">
        <div
          v-for="(item, index) in items"
          :key="item.command"
          :class="[
            'a-dropdown-menu__item-wrapper',
            { 'a-dropdown-menu__item-wrapper--divided': item.divided && index > 0 },
          ]"
        >
          <div
            :class="[
              'a-dropdown-menu__item',
              {
                'a-dropdown-menu__item--danger': item.danger && !item.disabled,
                'a-dropdown-menu__item--disabled': item.disabled,
              },
            ]"
            @click="handleItemClick(item)"
          >
            <slot name="item" :item="item">
              <Icon v-if="item.icon" class="a-dropdown-menu__icon" :icon="item.icon" />
              <span class="a-dropdown-menu__label">{{ item.label }}</span>
            </slot>
          </div>
        </div>
      </div>
    </template>
  </a-popper>
</template>

<script lang="ts">
import type { Placement } from '@popperjs/core';
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { formatStyleSize } from '../../utils';
import APopper from '../popper';
import type { APopperTriggerType } from '../popper/types';

import type { DropdownMenuItem } from './types';

// A dropdown menu based on popper, with structured items support.
export default defineComponent({
  name: 'ADropdownMenu',
  components: {
    APopper,
    Icon,
  },
  props: {
    // items to render in the menu
    items: {
      type: Array as PropType<DropdownMenuItem[]>,
      default: () => [],
    },
    // the trigger type of the dropdown
    triggerType: {
      type: String as PropType<Extract<APopperTriggerType, 'click' | 'hover'>>,
      default: 'click',
    },
    // The placement position of the popper, same as the APopper component.
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom-start',
    },
    // if true, the dropdown will not open
    disabled: {
      type: Boolean,
      default: false,
    },
    // if true, menu will hide itself automatically after clicking an item
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    // menu min-width
    width: {
      type: [Number, String],
    },
    // the menu position offset to the trigger element, unit is px
    offset: {
      type: Number,
      default: 12,
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
    // group id for mutex
    group: {
      type: String,
      default: '',
    },
  },
  emits: ['command', 'visible-change'],
  computed: {
    menuStyle() {
      if (this.width === undefined) {
        return undefined;
      }
      return {
        minWidth: formatStyleSize(this.width),
      };
    },
  },
  methods: {
    handleItemClick(item: DropdownMenuItem) {
      if (item.disabled) {
        return;
      }
      if (this.hideAfterClick) {
        const popperRef = this.$refs.popper as InstanceType<typeof APopper> | undefined;
        popperRef?.hide();
      }
      // will be emitted when user click on an enabled menu item
      this.$emit('command', item.command, item);
    },
    handlePopupStatusChanged(visible: boolean) {
      // will be emitted when the menu visibility changed
      this.$emit('visible-change', visible);
    },
  },
});
</script>

<style lang="scss">
.a-dropdown-menu {
  min-width: 160px;
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

  &__item-wrapper--divided {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid var(--line);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    line-height: 20px;
    font-size: 14px;
    color: var(--text);
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

  &__icon {
    width: 16px;
    height: 16px;
    font-size: 16px;
    flex-shrink: 0;
  }

  &__label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__item--danger {
    color: var(--danger);
  }

  &__item--danger:hover {
    background-color: color-mix(in srgb, var(--danger) 10%, transparent);
  }

  &__item--disabled,
  &__item--disabled:hover {
    color: var(--text-disabled);
    background-color: transparent;
    box-shadow: none;
    cursor: not-allowed;
  }

  &__item--disabled:active {
    transform: none;
  }
}
</style>
