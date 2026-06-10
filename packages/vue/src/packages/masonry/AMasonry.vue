<template>
  <div ref="container" class="a-masonry" :style="containerStyle">
    <template v-if="displayItems.length">
      <div
        v-for="(item, index) in displayItems"
        :key="getKey(item, index)"
        class="a-masonry__item"
        :style="getItemStyles(item)"
      >
        <slot :data="item" :position="positionMap[item._masonryIndex]" :colWidth="colWidth"> </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType, StyleValue } from 'vue';
import { defineComponent } from 'vue';

import type { MasonryItem, PositionItem, SectionRecord } from './types';

import type { Timeout } from '@/utils/types';

export default defineComponent({
  name: 'AMasonry',
  props: {
    // a getter method for getting the height of the item
    itemHeightGetter: {
      type: Function as PropType<(item: unknown) => number>,
      required: true,
    },
    // items to be rendered in the masonry
    items: {
      type: Array as PropType<MasonryItem[]>,
      required: true,
    },
    // the width of the column
    colWidth: {
      type: Number,
      required: true,
    },
    // total columns count
    col: {
      type: Number,
      default: 0,
    },
    // gap between cards
    gap: {
      type: Number,
      default: 16,
    },
    // if true, the masonry will fit the container automatically
    fit: {
      type: Boolean,
      default: false,
    },
    // the number of rows in one render section
    rowsPerSection: {
      type: Number,
      default: 3,
    },
    // how much items will be included in a render group
    groupSize: {
      type: Number,
      default: 100,
    },
    // the additional render distance out of the screen
    additionalDistance: {
      type: Number,
      default: 1600,
    },
    // if true, the DOM node will be reused.
    recycleNode: {
      type: Boolean,
      default: false,
    },
    // the debounce time for scroll handler execution
    scrollDebounceTime: {
      type: Number,
      default: 200,
    },
    // the throttle time for scroll handler execution
    scrollThrottleTime: {
      type: Number,
      default: 100,
    },
    // if not specified, the scroll event handler will be attached to the window
    scrollEventTarget: {
      type: String,
    },
    // the resize throttle time
    resizeThrottleTime: {
      type: Number,
      default: 100,
    },
    // the resize debounce time
    resizeDebounceTime: {
      type: Number,
      default: 200,
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
      displayItems: [] as any[],
      storedItemsLength: 0,
      currentSectionCount: 0,
      containerWidth: 0,
      maxHeight: 0,
      restoreContainerWidth: false,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      scrollTarget: null as HTMLElement | null,
      scrollTop: document.documentElement.scrollTop,
      containerOffset: 0,
      lastScroll: 0,
      lastResizeTriggered: 0,
      resizeTimer: null as Timeout | null,
      scrollTimer: null as Timeout | null,
      setDisplayExecCounter: 0,
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
      return this.columns * this.colWidth + (this.columns - 1) * this.gap;
    },
    containerStyle() {
      const width =
        this.fit && this.columns && !this.restoreContainerWidth
          ? `${this.containerFitWidth}px`
          : '';
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
      // this debounce is used for ensuring the resize event will be finally triggered
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.screenWidthChanged();
      }, this.resizeDebounceTime);
      // throttle
      if (Date.now() - this.lastResizeTriggered >= this.resizeThrottleTime) {
        this.screenWidthChanged();
        this.lastResizeTriggered = Date.now();
      }
    },
  },
  created() {
    this.resetWidthStore();
    this.resetHeightStore();
    this.resetPositionMap();
    if (this.scrollEventTarget) {
      const scrollTarget = document.querySelector(this.scrollEventTarget);
      if (scrollTarget) {
        scrollTarget.addEventListener('scroll', this.handleScroll);
        this.scrollTarget = scrollTarget as HTMLElement;
      } else {
        console.warn('[AMasonry] Cannot find the scroll event target element.');
      }
    }
    if (!this.scrollTarget) {
      window.addEventListener('scroll', this.handleScroll);
    }
    window.addEventListener('resize', this.handleWindowResize);
  },
  async mounted() {
    this.containerWidth = await this.getContainerWidth();
    this.containerOffset = this.getContainerOffset();
    this.renderMasonry();
  },
  async updated() {
    // if the col is not speicified, getContainerWidth will restore the original width, which will trigger the updated hook and cause dead loop.
    if (this.fit && !this.col) {
      return;
    }
    this.containerWidth = await this.getContainerWidth();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    if (this.scrollTarget) {
      this.scrollTarget.removeEventListener('scroll', this.handleScroll);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    getKey(item: MasonryItem, index: number) {
      // set key to index, vue will auto reuse the dom node.
      return this.recycleNode ? index : item._masonryIndex;
    },
    // masonry container
    async getContainerWidth() {
      if (this.fit) {
        if (this.col) {
          return this.containerFitWidth;
        } else {
          // need to remove the width style on the container element to get the original width
          this.restoreContainerWidth = true;
          await this.$nextTick();
        }
      }
      const container = this.$refs.container as HTMLDivElement;
      const containerWidth = container ? container.offsetWidth : 0;
      this.restoreContainerWidth = false;
      return containerWidth;
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
      if (typeof item._masonryIndex === 'undefined') {
        return;
      }
      const styles: Partial<StyleValue> = {
        width: `${this.colWidth}px`,
        height: `${this.positionMap[item._masonryIndex].height}px`,
        transform: `translateX(${this.positionMap[item._masonryIndex].left}px) translateY(${
          this.positionMap[item._masonryIndex].top
        }px)`,
      };
      return styles;
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
    async screenWidthChanged() {
      this.containerWidth = await this.getContainerWidth();
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
      this.setDisplayExecCounter += 1;
      this.updateDisplay(this.setDisplayExecCounter);
    },
    updateDisplay(seq: number) {
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
      if (window.requestAnimationFrame && seq >= this.setDisplayExecCounter) {
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
        this.scrollTimer = null;
      }
      this.scrollTimer = setTimeout(() => {
        this.handleScroll();
      }, this.scrollDebounceTime);
      if (this.lastScroll && Date.now() - this.lastScroll < this.scrollThrottleTime) {
        return;
      }
      this.containerOffset = this.getContainerOffset();
      this.scrollTop = document.documentElement.scrollTop - this.containerOffset;
      this.setDisplay();
      this.lastScroll = Date.now();
    },
  },
});
</script>

<style lang="scss">
.a-masonry {
  position: relative;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  .a-masonry__item {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
