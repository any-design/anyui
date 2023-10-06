<template>
  <div class="a-list-menu">
    <template v-for="item in displayItems" :key="item.value">
      <AListMenuItem
        v-if="item.type === 'item'"
        :text="item.label"
        :value="item.value"
        :selected="currentSelected"
      />
      <div v-else class="a-list-menu__split">
        <span>{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { AListMenuConfig, AListMenuDisplayItem, AListMenuItemConfig } from './types';
import AListMenuItem from './AListMenuItem.vue';

const props = defineProps({
  menu: {
    type: [Array, Object] as PropType<AListMenuConfig>,
  },
});

const currentSelected = ref('');

const generateDisplayItems = (list: AListMenuItemConfig[]): AListMenuDisplayItem[] => {
  return list.map((item) => {
    if (typeof item === 'string') {
      return {
        type: 'item',
        label: item,
        value: item,
      };
    }
    return {
      type: 'item',
      ...item,
    };
  });
};

const displayItems = computed<AListMenuDisplayItem[]>(() => {
  if (Array.isArray(props.menu)) {
    return generateDisplayItems(props.menu);
  } else {
    const ret: AListMenuDisplayItem[] = [];
    if (!props.menu) {
      return [];
    }
    Object.keys(props.menu).forEach((item: string) => {
      ret.push({
        type: 'split',
        label: item,
      });
      const list = (props.menu as Record<string, AListMenuItemConfig[]>)[item];
      if (!list) {
        return;
      }
      ret.push(...generateDisplayItems(list));
    });
    return ret;
  }
});
</script>

<style lang="scss">
.a-list-menu {
  width: 100%;
  position: relative;
}
</style>
