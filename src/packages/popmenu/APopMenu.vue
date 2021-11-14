<template>
  <a-popper ref="popper" :placement="placement" :offset="offset">
    <slot></slot>
    <template v-slot:popup>
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
import { defineComponent } from 'vue';
import { formatStyleSize } from '../../utils';
import type { APopper } from '../popper';

interface AnyUIPopMenuItem {
  name: string;
  key?: string;
}

export default defineComponent({
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
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 180,
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
      const menuItem = item as string | AnyUIPopMenuItem;
      if (typeof menuItem === 'string') {
        return menuItem;
      }
      return menuItem.key || menuItem.name;
    },
    getItemName(item: unknown) {
      const menuItem = item as string | AnyUIPopMenuItem;
      return typeof menuItem === 'string' ? menuItem : menuItem.name;
    },
    handleItemClick(key: string) {
      if (this.$refs.popper && this.hideAfterClick) {
        const popper = this.$refs.popper as APopper;
        popper.hide();
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
    padding: 6px 14px;
    font-size: 14px;
    user-select: none;
    transition: all 100ms ease;
  }
  &__item:hover {
    background: var(--bg);
  }
}
</style>