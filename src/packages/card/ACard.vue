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
import { defineComponent, useSlots } from 'vue';

export default defineComponent({
  name: 'ACard',
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: 240,
    },
    clean: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const hasHeader = !!useSlots().header || !!props.title;
    const hasFooter = !!useSlots().footer;
    const cardStyle = {
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    };
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
  box-shadow: 0 4px 28px var(--shadow-20);
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-alter);
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
    padding: 10px 18px 14px 18px;
    border-top: 1px solid var(--border);
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
    background: var(--bg-alter);
    border: none;
  }
}
</style>
