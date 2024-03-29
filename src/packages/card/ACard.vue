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
  box-shadow: 0 8px 12px var(--shadow-5);
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-bright);
  display: block;
  text-decoration: none;
  user-select: none;
  cursor: default;
  > div {
    box-sizing: border-box;
  }
  &-header {
    width: 100%;
    padding: 10px 18px 4px 18px;
    &__title {
      color: var(--text);
      font-size: 18px;
      font-weight: 600;
      width: 100%;
      line-height: 32px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      letter-spacing: 0.05rem;
    }
  }
  &-body {
    width: 100%;
    height: max-content;
    position: relative;
    padding: 0px 18px 12px 18px;
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
    padding: 10px 18px 11px 18px;
    border-top: 1px solid var(--border-semi-dark);
  }
}
.a-card--has-link {
  cursor: pointer;
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
