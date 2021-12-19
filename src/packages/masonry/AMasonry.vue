<template>
  <div ref="container" class="a-masonry" :style="containerStyle">
    <template v-if="displayItems.length">
      <div
        v-for="(item, index) in displayItems"
        :key="getKey(item, index)"
        class="a-masonry__item"
        :style="getItemStyles(item)"
      >
        <slot
          :data="item"
          :position="{
            ...positionMap[item._masonryIndex],
            colWidth,
          }"
        >
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';

interface MasonryItem extends Object {
  _masonryIndex: number;
}

interface SectionRecord {
  head?: number;
  tail?: number;
}

interface PositionItem {
  left?: number;
  height?: number;
  top?: number;
}

export default defineComponent({
  props: {
    itemHeightGetter: {
      type: Function,
      required: true,
    },
    items: {
      type: Array as PropType<MasonryItem[]>,
      required: true,
    },
    colWidth: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      default: 0,
    },
    gap: {
      type: Number,
      default: 16,
    },
    fit: {
      type: Boolean,
      default: false,
    },
    rowsPerSection: {
      type: Number,
      default: 3,
    },
    groupSize: {
      type: Number,
      default: 100,
    },
    additionalDistance: {
      type: Number,
      default: 300,
    },
    recycleNode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const heightStore: Record<number, number> = {};
    const widthStore: Record<number, number> = {};
    const positionMap: Record<number, PositionItem> = {};
    const group: Record<number, number[]> = {};
    const inGroup: Record<number, boolean> = {};
    return {
      positionMap,
      widthStore,
      heightStore,
      group,
      inGroup,
      sections: [{}] as SectionRecord[],
      sectionsIdx: 0,
      displayItems: [] as unknown[],
      storedItemsLength: 0,
      currentSectionCount: 0,
      containerWidth: 0,
      maxHeight: 0,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      scrollTop: document.documentElement.scrollTop,
      containerOffset: 0,
      lastScroll: 0,
      resizeTimer: 0 as ReturnType<typeof setTimeout>,
      scrollTimer: 0 as ReturnType<typeof setTimeout>,
    };
  },
  computed: {
    columns() {
      if (this.col) {
        return this.col;
      } else {
        return Math.floor((this.containerWidth + this.gap) / (this.colWidth + this.gap));
      }
    },
    containerFitWidth() {
      return this.col * this.colWidth + (this.col - 1) * this.gap;
    },
    containerStyle() {
      const width = this.fit && this.col ? `${this.containerFitWidth}px` : null;
      const height = `${this.maxHeight || 0}px`;
      return {
        width,
        height,
      };
    },
  },
  watch: {
    items: 'itemsChanged',
    columns: 'columnsChanged',
    colWidth: 'colWidthChanged',
    screenWidth() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.screenWidthChanged();
      }, 300);
    },
  },
  created() {
    this.resetWidthStore();
    this.resetHeightStore();
    this.resetPositionMap();
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleScroll, {
      passive: true,
    });
  },
  mounted() {
    this.containerWidth = this.getContainerWidth();
    this.containerOffset = this.getContainerOffset();
    this.renderMasonry();
  },
  updated() {
    this.containerWidth = this.getContainerWidth();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getKey(item: MasonryItem, index: number) {
      // set key to index, vue will auto reuse the dom node.
      return this.recycleNode ? index : item._masonryIndex;
    },
    // waterfall container
    getContainerWidth() {
      if (this.fit && this.col) {
        return this.containerFitWidth;
      }
      const container = this.$refs.container as HTMLDivElement;
      if (container) {
        return container.offsetWidth;
      } else {
        return 0;
      }
    },
    getContainerOffset() {
      const container = this.$refs.container as HTMLDivElement;
      if (!container) {
        return 0;
      }
      const bodyRect = document.documentElement.getBoundingClientRect();
      const elRect = container.getBoundingClientRect();
      return elRect.top - bodyRect.top;
    },
    getItemStyles(item: MasonryItem) {
      return {
        width: `${this.colWidth}px`,
        height: `${this.positionMap[item._masonryIndex].height}px`,
        transform: `translateX(${this.positionMap[item._masonryIndex].left}px) translateY(${
          this.positionMap[item._masonryIndex].top
        })px`,
      };
    },
    // waterfall items
    itemsChanged() {
      if (this.items.length <= this.storedItemsLength) {
        this.renderMasonry();
      } else {
        this.computePosition();
        this.setMaxHeight();
        this.setDisplay();
      }
      this.storedItemsLength = this.items.length;
    },
    columnsChanged() {
      this.renderMasonry();
    },
    colWidthChanged() {
      this.renderMasonry();
    },
    screenWidthChanged() {
      this.containerWidth = this.getContainerWidth();
    },
    renderMasonry() {
      this.resetGroup();
      this.resetSections();
      this.resetWidthStore();
      this.resetHeightStore();
      this.resetPositionMap();
      this.setMaxHeight();
      this.setDisplay();
    },
    setDisplay() {
      const countPerSection = this.rowsPerSection * this.columns;
      const showCondHead = this.scrollTop - this.additionalDistance;
      const showCondTail = this.scrollTop + this.screenHeight + this.additionalDistance;
      const start = Math.floor(showCondHead / this.groupSize);
      const end = Math.floor(showCondTail / this.groupSize);

      let list: unknown[] = [];
      const inList: Record<number, boolean> = {};

      for (let i = start; i <= end; i++) {
        if (!this.group[i]) {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let j = 0; j < this.group[i].length; j++) {
          const idx = this.group[i][j];
          if (inList[idx]) {
            continue;
          }
          list = list.concat(this.items.slice(idx * countPerSection, (idx + 1) * countPerSection));
          inList[idx] = true;
        }
      }

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.displayItems = list;
          this.$forceUpdate();
        });
      } else {
        this.displayItems = list;
        this.$forceUpdate();
      }
    },
    resetWidthStore() {
      this.widthStore = {};
      for (let i = 0; i < this.columns; i++) {
        this.widthStore[i] = (this.colWidth + this.gap) * i;
      }
    },
    resetHeightStore() {
      this.heightStore = {};
      for (let i = 0; i < this.columns; i++) {
        this.heightStore[i] = 0;
      }
    },
    resetPositionMap() {
      this.displayItems = [];
      this.positionMap = {};
      this.computePosition();
    },
    resetGroup() {
      this.group = {};
      this.inGroup = {};
    },
    resetSections() {
      this.sections = [{}];
      this.currentSectionCount = 0;
    },
    computePosition() {
      if (!this.widthStore || !this.heightStore || !this.columns) {
        return;
      }
      const countPerSection = this.columns * this.rowsPerSection;
      this.items.forEach((item: MasonryItem, index) => {
        // ignore computed
        const mapKey = index;
        // eslint-disable-next-line no-param-reassign
        item._masonryIndex = index;
        if (this.positionMap[mapKey]) {
          return;
        }
        this.positionMap[mapKey] = {};
        // compute load height
        const h = this.itemHeightGetter(item);
        this.positionMap[mapKey].height = h;
        // compute position
        let left;
        let top;
        let storeIdx;
        if (index < this.columns) {
          left = this.widthStore[index];
          top = 0;
          storeIdx = index;
        } else {
          const minHeightIdx = this.getMinHeightCol();
          left = this.widthStore[minHeightIdx];
          top = this.heightStore[minHeightIdx];
          storeIdx = minHeightIdx;
        }
        // check section count
        if (this.currentSectionCount < countPerSection) {
          this.currentSectionCount += 1;
        } else {
          this.currentSectionCount = 1;
          this.sections.push({});
        }
        // set position
        this.positionMap[mapKey].left = left;
        this.positionMap[mapKey].top = top;
        this.heightStore[storeIdx] += h + this.gap;
        // set position to section
        const sectionIdx = this.sections.length - 1;
        const { head, tail } = this.sections[sectionIdx];
        if (typeof head === 'undefined' || top < head) {
          this.sections[sectionIdx].head = top;
        }
        const bottom = top + h;
        if (typeof tail === 'undefined' || bottom > tail) {
          this.sections[sectionIdx].tail = bottom;
        }
      });
      this.sections.forEach((section, idx) => {
        // 把所有的section放到groupMap里面
        if (this.inGroup[idx]) {
          return;
        }
        const { head, tail } = section;
        if (typeof head === 'undefined' || typeof tail === 'undefined') {
          return;
        }
        const start = Math.floor(head / this.groupSize);
        const end = Math.floor(tail / this.groupSize);
        for (let i = start; i <= end; i++) {
          if (!this.group[i]) {
            this.group[i] = [];
          }
          this.group[i].push(idx);
        }
        this.inGroup[idx] = true;
      });
    },
    getMinHeightCol() {
      let min = Number.MAX_VALUE;
      let minIndex = 0;
      for (let i = 0; i < this.columns; i++) {
        if (this.heightStore[i] < min) {
          min = this.heightStore[i];
          minIndex = i;
        }
      }
      return minIndex;
    },
    getMaxHeight() {
      let max = 0;
      for (let i = 0; i < this.columns; i++) {
        if (this.heightStore[i] > max) {
          max = this.heightStore[i];
        }
      }
      return max;
    },
    setMaxHeight() {
      this.maxHeight = this.getMaxHeight();
    },
    // window event handler
    handleWindowResize() {
      this.screenWidth = document.documentElement.clientWidth;
      this.screenHeight = document.documentElement.clientHeight;
      this.containerOffset = this.getContainerOffset();
    },
    handleScroll() {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = 0;
      }
      this.scrollTimer = setTimeout(() => {
        this.handleScroll();
      }, 200);
      if (this.lastScroll && Date.now() - this.lastScroll < 200) {
        return;
      }
      this.lastScroll = Date.now();
      this.containerOffset = this.getContainerOffset();
      this.scrollTop = document.documentElement.scrollTop - this.containerOffset;
      this.setDisplay();
      clearTimeout(this.scrollTimer);
      this.scrollTimer = 0;
    },
  },
});
</script>

<style lang="scss">
.a-masonry {
  position: relative;
  -webkit-overflow-scrolling: touch;
  .a-masonry__item {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
