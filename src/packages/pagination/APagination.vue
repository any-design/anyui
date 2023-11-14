<template>
  <div class="a-pagination">
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
    <div class="a-pagination__pages">
      <div
        v-for="item in displayList"
        :key="item.value"
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
import type { PropType} from 'vue';
import { defineComponent } from 'vue';
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';

import type { PaginationMeta } from './types';

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
  },
  emits: ['change', 'update:pagination'],
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

.a-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &__guide {
    height: $regular-size;
    color: var(--text);
    cursor: pointer;
    @include inline-center();
    transition: opacity 100ms ease;
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
  }

  &__guide--disabled {
    transition: none;
    opacity: 0.7;
    cursor: forbidden;
  }

  &__pages {
    @include inline-center();
  }

  &__page {
    @include inline-center();
    @include regular-size-rect();

    cursor: pointer;
    margin: 0 4px;
    transition: opacity 100ms ease, color 100ms ease;
    line-height: 32px;
    position: relative;

    span {
      @include inline-center();
      @include regular-size-rect();
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      color: var(--text);
    }
  }

  &__page:hover {
    opacity: 0.75;
  }

  &__page:active {
    opacity: 0.6;
  }

  &__page--selected {
    cursor: default;
    font-weight: 600;

    span {
      color: var(--text-btn);
    }
  }

  &__page--selected::before {
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    box-shadow: 2px 2px 6px var(--shadow-8);
    @include regular-size-rect();
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    z-index: 1;
  }

  &__page--selected:hover {
    opacity: 1;
    transition: none;
  }

  &__page--selected:active {
    opacity: 1;
    transition: none;
  }

  &__page--disabled {
    cursor: default;
  }

  &__page--disabled:hover {
    opacity: 1;
    transition: none;
  }

  &__page--disabled:active {
    opacity: 1;
    transition: none;
  }
}
</style>
