<template>
  <a
    :class="{
      'a-card': true,
      'a-card--has-link': !!link,
      'a-card--clean': clean,
    }"
    :style="cardStyle"
    :href="link || 'javascript:;'"
  >
    <div v-if="hasHeader" class="a-card-header">
      <span class="a-card-header__title">{{ title }}</span>
      <slot name="header"></slot>
    </div>
    <div
      :class="{
        'a-card-body': true,
        'a-card-body--no-header': !hasHeader,
        'a-card-body--no-footer': !hasFooter,
      }"
    >
      <slot></slot>
    </div>
    <div v-if="hasFooter" class="a-card-footer" name="footer">
      <slot name="footer"></slot>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, useSlots, computed } from 'vue';

export default defineComponent({
  name: 'ACard',
  props: {
    // the title of the card, it not empty, the card will have a default header.
    title: {
      type: String,
      default: '',
    },
    // the width of the card, can be a percentage or a number.
    width: {
      type: [Number, String],
      default: 240,
    },
    // if true, the card will not have any border and padding.
    clean: {
      type: Boolean,
      default: false,
    },
    // if true, the card will be applied with "cursor: pointer" style.
    link: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const hasHeader = !!useSlots().header || !!props.title;
    const hasFooter = !!useSlots().footer;

    const cardStyle = computed(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    }));

    return {
      hasHeader,
      hasFooter,
      cardStyle,
    };
  },
});
</script>

<style lang="scss">
.a-card {
  height: max-content;
  position: relative;
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-sm, 0 2px 6px var(--shadow-4));
  border-radius: var(--a-radius-xl, 22px);
  overflow: hidden;
  background: var(--a-surface, var(--bg-bright));
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  border: 1px solid var(--a-surface-border-color, var(--line));
  display: block;
  text-decoration: none;
  user-select: none;
  cursor: default;
  > div {
    box-sizing: border-box;
  }
  &-header {
    width: 100%;
    padding: 14px 20px 6px 20px;
    &__title {
      color: var(--text);
      font-size: 16px;
      font-weight: 700;
      width: 100%;
      line-height: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      letter-spacing: 0.02rem;
    }
  }
  &-body {
    width: 100%;
    height: max-content;
    position: relative;
    padding: 0px 20px 12px 20px;
  }
  &-body--no-header {
    padding-top: 14px;
  }
  &-body--no-footer {
    padding-bottom: 16px;
  }
  &-footer {
    width: 100%;
    height: max-content;
    position: relative;
    padding: 10px 20px 11px 20px;
    border-top: 1px solid var(--line);
  }
}
.a-card--has-link {
  cursor: pointer;
  transition:
    transform var(--anim-duration, 200ms) var(--a-ease-spring, ease),
    box-shadow var(--anim-duration, 200ms) ease;
}
.a-card--has-link:hover {
  transform: translateY(-2px);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-lg, 0 12px 24px var(--shadow-8));
}
.a-card--clean {
  .a-card-body {
    padding: 0;
  }
  .a-card-footer {
    padding: 0;
    border: none;
  }
}
</style>
