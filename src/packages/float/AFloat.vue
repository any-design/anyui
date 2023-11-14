<template>
  <teleport to="body">
    <transition name="a-float-fade">
      <div
        v-if="visible"
        :class="[
          'a-float',
          {
            'a-float--centered': shouldBeCentered,
            'a-float--round': round,
          },
          className || null,
        ]"
        :style="floatStyles"
        role="dialog"
        @click.stop
      >
        <div class="a-float__mask" @click.stop="onClose"></div>
        <div class="a-float__content" :style="contentStyles">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { formatStyleSize } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AFloat',
  props: {
    class: {
      type: String,
    },
    top: {
      type: [Number, String],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    width: {
      type: [String, Number],
      default: 800,
    },
    padding: {
      type: [String, Number],
    },
    roundRadius: {
      type: [Number, String],
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    scrollLockTarget: {
      type: String,
      default: 'html',
    },
    round: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'update:visible'],
  computed: {
    className() {
      return this.class;
    },
    defaultRoundRadius() {
      return this.round ? 24 : 4;
    },
    floatStyles() {
      return {
        'z-index': this.zIndex,
      };
    },
    contentStyles() {
      return {
        width: formatStyleSize(this.width),
        'border-radius': formatStyleSize(this.roundRadius || this.defaultRoundRadius),
        ...(this.padding
          ? {
              padding:
                typeof this.padding === 'number' ? formatStyleSize(this.padding) : this.padding,
            }
          : null),
        ...(!this.centered
          ? {
              'margin-top': formatStyleSize(this.top || 96),
            }
          : null),
      };
    },
    // if top is not set, the float should be centered
    shouldBeCentered() {
      return typeof this.top === 'undefined';
    },
  },
  watch: {
    visible: {
      handler(v) {
        const dom = document.querySelector(this.scrollLockTarget);
        if (!v) {
          // show
          dom?.classList.contains('scroll-locked') && dom.classList.remove('scroll-locked');
          this.$emit('close');
        } else {
          // hide
          dom && !dom.classList.contains('scroll-locked') && dom.classList.add('scroll-locked');
        }
      },
    },
  },
  methods: {
    onClose() {
      // will be emitted when the float has been closed.
      this.$emit('close');
      // will be emitted when the visibility value changed.
      this.$emit('update:visible', false);
    },
  },
});
</script>

<style lang="scss">
.scroll-locked {
  overflow: hidden;
}

.a-float {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  &__mask {
    width: 100%;
    height: 100%;
    background: var(--mask, rgba(0, 0, 0, 0.6));
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    backdrop-filter: blur(8px);
  }

  &__content {
    height: max-content;
    background: var(--bg-semi-light);
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    padding: 16px;
    box-shadow: 0 1px 12px var(--shadow-w-6);
    box-sizing: border-box;
    position: relative;
  }
}

.a-float--centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-float-fade-enter-active,
.a-float-fade-leave-active {
  transition: opacity var(--anim-duration, 200ms) ease;
}

.a-float-fade-enter-from,
.a-float-fade-leave-to {
  opacity: 0;
}

@if (not variable-exists(__anyui__enable-responsive-styles__)) or
  $__anyui__enable-responsive-styles__
{
  @media screen and (max-width: 767px) {
    .a-float {
      &__content {
        width: 90% !important;
      }
    }
  }
}
</style>
