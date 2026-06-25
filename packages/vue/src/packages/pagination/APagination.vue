<template>
  <div
    :class="[
      'a-pagination',
      `a-pagination--shape-${shape}`,
      { 'a-pagination--animated': animated, 'a-pagination--shown': shown },
    ]"
  >
    <div
      :class="[
        'a-pagination__guide',
        'a-pagination__prev',
        { 'a-pagination__guide--disable': shouldDisablePrev },
      ]"
      @click="handlePrevClicked"
    >
      <Icon :icon="prevIcon" />
    </div>
    <div ref="pagesRef" class="a-pagination__pages">
      <div class="a-pagination__indicator" :style="indicatorStyle">
        <span>{{ currentPage }}</span>
      </div>
      <div
        v-for="item in displayList"
        :key="item.value"
        :data-value="item.value"
        :class="{
          'a-pagination__page': true,
          'a-pagination__page--selected': item.value === pagination?.current,
          'a-pagination__page--disabled': item.disabled,
        }"
        @click="() => handlePageClicked(item.value)"
      >
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div
      :class="[
        'a-pagination__guide',
        'a-pagination__next',
        { 'a-pagination__guide--disable': shouldDisableNext },
      ]"
      @click="handleNextClicked"
    >
      <Icon :icon="nextIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { CSSProperties, PropType } from 'vue';
import { defineComponent } from 'vue';

import type { PaginationMeta, PaginationShape } from './types';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    pagination: {
      type: Object as PropType<PaginationMeta>,
    },
    // how many page button should show on each side of the current page
    siblingCount: {
      type: Number,
      default: 1,
    },
    boundaryCount: {
      type: Number,
      default: 1,
    },
    prevIcon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'uil:angle-left',
    },
    nextIcon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: 'uil:angle-right',
    },
    shape: {
      type: String as PropType<PaginationShape>,
      default: 'rounded',
    },
  },
  emits: ['change', 'update:pagination'],
  data() {
    return {
      animated: false,
      shown: false,
      indicatorStyle: { opacity: 0 } as CSSProperties,
    };
  },
  computed: {
    currentPage() {
      return this.pagination?.current || 1;
    },
    totalPages() {
      if (!this.pagination?.pageSize || !this.pagination?.total) {
        console.warn('[a-pagination] wrong pageSize or total value.');
        return 0;
      }
      const totalPageValue = this.pagination.total / this.pagination.pageSize;
      if (`${totalPageValue}`.includes('.')) {
        return Math.floor(totalPageValue) + 1;
      }
      return totalPageValue;
    },
    startPageCount() {
      return Math.min(this.boundaryCount, this.totalPages);
    },
    endPageCount() {
      return (
        this.totalPages -
        Math.max(this.totalPages - this.boundaryCount + 1, this.boundaryCount + 1) +
        1
      );
    },
    siblingStart() {
      return Math.max(
        Math.min(
          this.currentPage - this.siblingCount,
          this.totalPages - this.boundaryCount - this.siblingCount * 2 - 1,
        ),
        this.boundaryCount + 2,
      );
    },
    siblingEnd() {
      return Math.min(
        Math.max(
          this.currentPage + this.siblingCount,
          this.boundaryCount + this.siblingCount * 2 + 2,
        ),
        this.endPageCount ? this.totalPages - this.endPageCount - 1 : this.totalPages - 1,
      );
    },
    displayList() {
      return [
        // start page
        ...Array.from({ length: this.startPageCount }, (_, idx) => ({
          text: `${idx + 1}`,
          value: idx + 1,
          disabled: false,
        })),
        // start ellipsis
        ...(this.siblingStart > this.boundaryCount + 2
          ? [
              {
                text: '...',
                value: -1,
                disabled: true,
              },
            ]
          : this.boundaryCount + 1 < this.totalPages - this.boundaryCount
          ? [
              {
                text: `${this.boundaryCount + 1}`,
                value: this.boundaryCount + 1,
                disabled: false,
              },
            ]
          : []),
        // middle range
        ...Array.from({ length: this.siblingEnd - this.siblingStart + 1 }, (_, idx) => ({
          text: `${this.siblingStart + idx}`,
          value: this.siblingStart + idx,
          disabled: false,
        })),
        // end ellipsis
        ...(this.siblingEnd < this.totalPages - this.boundaryCount - 1
          ? [
              {
                text: '...',
                value: -1,
                disabled: true,
              },
            ]
          : this.totalPages - this.boundaryCount > this.boundaryCount
          ? [
              {
                text: `${this.totalPages - this.boundaryCount}`,
                value: this.totalPages - this.boundaryCount,
                disabled: false,
              },
            ]
          : []),
        // end page
        ...Array.from({ length: this.endPageCount }, (_, idx) => ({
          text: `${this.totalPages - this.endPageCount + idx + 1}`,
          value: this.totalPages - this.endPageCount + idx + 1,
          disabled: false,
        })),
      ];
    },
    shouldDisablePrev() {
      return this.currentPage > 1;
    },
    shouldDisableNext() {
      return this.currentPage < this.totalPages;
    },
  },
  watch: {
    currentPage() {
      this.$nextTick(this.updateIndicator);
    },
    shape() {
      this.$nextTick(this.updateIndicator);
    },
  },
  mounted() {
    this.updateIndicator();
    // enable the transition on the next tick so the first position set
    // (which runs without the animated flag) does not slide from 0
    requestAnimationFrame(() => {
      this.animated = true;
    });
  },
  methods: {
    emitPaginationChange(pagination: Partial<PaginationMeta>) {
      this.$emit('update:pagination', pagination);
      this.$emit('change', pagination);
    },
    handlePrevClicked() {
      this.emitPaginationChange({
        ...this.pagination,
        current: Math.max(1, this.currentPage - 1),
      });
    },
    handleNextClicked() {
      this.emitPaginationChange({
        ...this.pagination,
        current: Math.min(this.totalPages, this.currentPage + 1),
      });
    },
    handlePageClicked(page: number) {
      this.emitPaginationChange({
        ...this.pagination,
        current: page,
      });
    },
    updateIndicator() {
      const container = this.$refs.pagesRef as HTMLElement | undefined;
      if (!container) return;
      const selected = container.querySelector<HTMLElement>('.a-pagination__page--selected');
      if (!selected) {
        this.indicatorStyle = { opacity: 0 };
        this.shown = false;
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const buttonRect = selected.getBoundingClientRect();
      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;
      this.indicatorStyle = {
        opacity: 1,
        transform: `translateX(${left}px)`,
        width: `${width}px`,
      };
      this.shown = true;
    },
  },
});
</script>

<style lang="scss">
@mixin inline-center() {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

$regular-size: 32px;

@mixin regular-size-rect() {
  width: $regular-size;
  height: $regular-size;
}

$indicator-squircle-clip: polygon(
  32px 16px, 31.73px 24.14px, 30.89px 27.31px, 29.45px 29.45px, 27.31px 30.89px,
  24.14px 31.73px, 16px 32px, 7.86px 31.73px, 4.69px 30.89px, 2.55px 29.45px,
  1.11px 27.31px, 0.27px 24.14px, 0px 16px, 0.27px 7.86px, 1.11px 4.69px,
  2.55px 2.55px, 4.69px 1.11px, 7.86px 0.27px, 16px 0px, 24.14px 0.27px,
  27.31px 1.11px, 29.45px 2.55px, 30.89px 4.69px, 31.73px 7.86px
);

.a-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  &__guide {
    height: $regular-size;
    color: var(--text);
    cursor: pointer;
    @include inline-center();
    transition: opacity var(--anim-duration-quick, 100ms) ease,
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);
    font-size: 20px;
    line-height: $regular-size;
    position: relative;

    svg {
      height: 100%;
      line-height: 100%;
      @include inline-center();
    }
  }

  &__guide:hover {
    opacity: 0.75;
  }

  &__guide:active {
    opacity: 0.6;
    transform: scale(0.96);
  }

  &__guide--disabled {
    transition: none;
    opacity: 0.7;
    cursor: forbidden;
  }

  &__pages {
    @include inline-center();
    position: relative;
  }

  &__indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: $regular-size;
    width: $regular-size;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    box-shadow: 0 4px 12px -4px color-mix(in srgb, var(--primary) 45%, transparent),
      2px 2px 6px var(--shadow-8);
    border-radius: var(--a-radius-sm, 10px);
    will-change: transform;

    > span {
      @include inline-center();
      @include regular-size-rect();
      line-height: $regular-size;
      color: var(--text-btn);
      font-weight: 600;
      opacity: 0;
    }
  }

  &--shown &__indicator > span {
    opacity: 1;
  }

  &--animated &__indicator {
    transition: transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      width var(--anim-duration, 200ms) var(--a-ease-spring, ease),
      opacity var(--anim-duration-quick, 120ms) ease;
  }

  &--shape-rounded &__indicator {
    border-radius: var(--a-radius-sm, 10px);
    clip-path: none;
  }

  &--shape-squircle &__indicator {
    border-radius: 0;
    clip-path: $indicator-squircle-clip;
  }

  &--shape-circle &__indicator {
    border-radius: 50%;
    clip-path: none;
  }

  &__page {
    @include inline-center();
    @include regular-size-rect();

    cursor: pointer;
    margin: 0 4px;
    transition: opacity var(--anim-duration-quick, 100ms) ease,
      color var(--anim-duration-quick, 100ms) ease,
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      background-color var(--anim-duration-quick, 100ms) ease;
    line-height: 32px;
    position: relative;
    border-radius: var(--a-radius-sm, 10px);

    span {
      @include inline-center();
      @include regular-size-rect();
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      color: var(--text);
      transition: color var(--anim-duration-quick, 100ms) ease;
    }
  }

  &__page::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: transparent;
    opacity: 0;
    transition: opacity var(--anim-duration-quick, 100ms) ease,
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease);
  }

  &__page:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &__page:hover::before {
    opacity: 1;
    background: var(--a-item-hover-bg, var(--bg-hover));
  }

  &__page:active {
    transform: scale(0.96);
  }

  &__page--selected {
    cursor: default;
    font-weight: 600;

    span {
      opacity: 0;
    }
  }

  &__page--selected::before {
    opacity: 0;
    transition: none;
  }

  &__page--selected:hover {
    transform: scale(1.03);
  }

  &__page--selected:hover::before {
    opacity: 0;
  }

  &__page--selected:active {
    transform: none;
    transition: none;
  }

  &__page--disabled {
    cursor: default;
  }

  &__page--disabled:hover {
    opacity: 1;
    transform: none;
    transition: none;
  }

  &__page--disabled:hover::before {
    opacity: 0;
  }

  &__page--disabled:active {
    transform: none;
    transition: none;
  }
}
</style>
