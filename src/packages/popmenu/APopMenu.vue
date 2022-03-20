<template>
  <a-popper
    ref="popper"
    :placement="placement"
    :offset="offset"
    :hideDelay="hideDelay"
    :appendToBody="appendToBody"
    :transition="transition"
    :zIndex="zIndex"
  >
    <slot></slot>
    <template #popup>
      <div class="a-popup-menu" :style="menuStyle">
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
import { PopMenuItem } from './types';
import type APopper from '../popper';

export default defineComponent({
  name: 'APopMenu',
  props: {
    placement: {
      type: String,
      default: 'bottom',
    },
    offset: {
      type: Number,
      default: 12,
    },
    items: {
      type: Array as PropType<string[] | PopMenuItem[]>,
      default: () => [],
    },
    width: {
      type: Number,
      default: 180,
    },
    hideDelay: {
      type: Number,
      default: 100,
    },
    zIndex: {
      type: Number,
      default: 3000,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: String,
    },
    hideAfterClick: {
      type: Boolean,
      default: false,
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
      this.$emit('command', key);
    },
  },
});
</script>

<style lang="scss">
.a-popup-menu {
  border-radius: 12px;
  background: var(--bg-alter);
  box-sizing: border-box;
  padding: 8px 0;
  box-shadow: 0 4px 12px var(--shadow-10);
  &__item {
    padding: 8px 16px;
    line-height: 24px;
    font-size: 15px;
    user-select: none;
    transition: all 200ms ease;
  }
  &__item:hover {
    background: var(--bg);
  }
}
</style>