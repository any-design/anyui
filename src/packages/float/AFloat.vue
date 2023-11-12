<template>
  <teleport to="body">
    <transition name="a-float-fade">
      <div
        v-if="visible"
        :class="[
          'a-float',
          {
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
    className: {
      type: String,
    },
    top: {
      type: [Number, String],
      default: 96,
    },
    padding: {
      type: [Number, String],
      default: 16,
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
  },
  emits: ['close', 'update:visible'],
  computed: {
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
        padding: formatStyleSize(this.padding),
        'margin-top': formatStyleSize(this.top),
        'border-radius': formatStyleSize(this.roundRadius || this.defaultRoundRadius),
      };
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
    background: var(--mask, rgba(0, 0, 0, 0.8));
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    backdrop-filter: blur(8px);
  }

  &__content {
    height: max-content;
    background: var(--bg);
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    box-shadow: 0 1px 12px var(--shadow-w-6);
    box-sizing: border-box;
  }
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
