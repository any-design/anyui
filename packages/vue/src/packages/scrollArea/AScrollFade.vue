<template>
  <div :class="rootClass" :style="rootStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent } from 'vue';

import type { AScrollFadeAxis } from './types';

import { formatStyleSize } from '@/utils';

export default defineComponent({
  name: 'AScrollFade',
  props: {
    axis: {
      type: String as PropType<AScrollFadeAxis>,
      default: 'vertical',
      validator: (value: string) => ['vertical', 'horizontal', 'both'].includes(value),
    },
    size: {
      type: [String, Number],
    },
    topSize: {
      type: [String, Number],
    },
    bottomSize: {
      type: [String, Number],
    },
    startSize: {
      type: [String, Number],
    },
    endSize: {
      type: [String, Number],
    },
    reveal: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    maxHeight: {
      type: [String, Number],
    },
    fill: {
      type: Boolean,
      default: false,
    },
    scrollBehavior: {
      type: String as PropType<'auto' | 'smooth'>,
      default: 'smooth',
      validator: (value: string) => ['auto', 'smooth'].includes(value),
    },
  },
  setup(props) {
    const rootClass = computed(() => ({
      'a-scroll-fade': true,
      'a-scroll-fade--vertical': props.axis === 'vertical',
      'a-scroll-fade--horizontal': props.axis === 'horizontal',
      'a-scroll-fade--both': props.axis === 'both',
      'a-scroll-fade--fill': props.fill,
    }));

    const rootStyle = computed<CSSProperties>(() => {
      const style: Record<string, string | undefined> = {};
      const setVar = (key: string, value: string | number | undefined) => {
        if (typeof value !== 'undefined') {
          style[key] = formatStyleSize(value);
        }
      };

      setVar('--a-scroll-fade-size', props.size);
      setVar('--a-scroll-fade-top-size', props.topSize);
      setVar('--a-scroll-fade-bottom-size', props.bottomSize);
      setVar('--a-scroll-fade-start-size', props.startSize);
      setVar('--a-scroll-fade-end-size', props.endSize);
      setVar('--a-scroll-fade-reveal', props.reveal);
      style.height = typeof props.height === 'undefined' ? undefined : formatStyleSize(props.height);
      style.maxHeight =
        typeof props.maxHeight === 'undefined' ? undefined : formatStyleSize(props.maxHeight);
      style.scrollBehavior = props.scrollBehavior;

      return style as CSSProperties;
    });

    return {
      rootClass,
      rootStyle,
    };
  },
});
</script>

<style lang="scss">
@property --a-scroll-fade-top {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 0px;
}

@property --a-scroll-fade-bottom {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 0px;
}

@property --a-scroll-fade-start {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 0px;
}

@property --a-scroll-fade-end {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 0px;
}

@keyframes a-scroll-fade-reveal-top {
  from {
    --a-scroll-fade-top: 0px;
  }

  to {
    --a-scroll-fade-top: var(
      --a-scroll-fade-top-size,
      var(--a-scroll-fade-size, min(12%, 40px))
    );
  }
}

@keyframes a-scroll-fade-reveal-bottom {
  from {
    --a-scroll-fade-bottom: var(
      --a-scroll-fade-bottom-size,
      var(--a-scroll-fade-size, min(12%, 40px))
    );
  }

  to {
    --a-scroll-fade-bottom: 0px;
  }
}

@keyframes a-scroll-fade-reveal-start {
  from {
    --a-scroll-fade-start: 0px;
  }

  to {
    --a-scroll-fade-start: var(
      --a-scroll-fade-start-size,
      var(--a-scroll-fade-size, min(12%, 40px))
    );
  }
}

@keyframes a-scroll-fade-reveal-end {
  from {
    --a-scroll-fade-end: var(
      --a-scroll-fade-end-size,
      var(--a-scroll-fade-size, min(12%, 40px))
    );
  }

  to {
    --a-scroll-fade-end: 0px;
  }
}

.a-scroll-fade {
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  --a-scroll-fade-block-mask: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--a-scroll-fade-top, 0px),
    #000 calc(100% - var(--a-scroll-fade-bottom, 0px)),
    transparent 100%
  );
  --a-scroll-fade-inline-mask: linear-gradient(
    to right,
    transparent 0,
    #000 var(--a-scroll-fade-start, 0px),
    #000 calc(100% - var(--a-scroll-fade-end, 0px)),
    transparent 100%
  );

  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  &:where([dir='rtl'], [dir='rtl'] *) {
    --a-scroll-fade-inline-mask: linear-gradient(
      to left,
      transparent 0,
      #000 var(--a-scroll-fade-start, 0px),
      #000 calc(100% - var(--a-scroll-fade-end, 0px)),
      transparent 100%
    );
  }

  &--vertical {
    -webkit-mask-image: var(--a-scroll-fade-block-mask);
    mask-image: var(--a-scroll-fade-block-mask);
  }

  &--horizontal {
    overflow-y: hidden;
    overflow-x: auto;
    -webkit-mask-image: var(--a-scroll-fade-inline-mask);
    mask-image: var(--a-scroll-fade-inline-mask);
  }

  &--both {
    overflow: auto;
    -webkit-mask-image: var(--a-scroll-fade-block-mask), var(--a-scroll-fade-inline-mask);
    mask-image: var(--a-scroll-fade-block-mask), var(--a-scroll-fade-inline-mask);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  &--fill {
    width: 100%;
    height: 100%;
  }
}

@supports (animation-timeline: scroll()) {
  .a-scroll-fade--vertical,
  .a-scroll-fade--both {
    animation:
      a-scroll-fade-reveal-top 1ms ease-in-out,
      a-scroll-fade-reveal-bottom 1ms ease-in-out;
    animation-timeline: scroll(self y), scroll(self y);
    animation-range:
      0 var(--a-scroll-fade-reveal, 96px),
      calc(100% - var(--a-scroll-fade-reveal, 96px)) 100%;
    animation-fill-mode: both;
  }

  .a-scroll-fade--horizontal {
    animation:
      a-scroll-fade-reveal-start 1ms ease-in-out,
      a-scroll-fade-reveal-end 1ms ease-in-out;
    animation-timeline: scroll(self inline), scroll(self inline);
    animation-range:
      0 var(--a-scroll-fade-reveal, 96px),
      calc(100% - var(--a-scroll-fade-reveal, 96px)) 100%;
    animation-fill-mode: both;
  }

  .a-scroll-fade--both {
    animation-name:
      a-scroll-fade-reveal-top,
      a-scroll-fade-reveal-bottom,
      a-scroll-fade-reveal-start,
      a-scroll-fade-reveal-end;
    animation-timeline: scroll(self y), scroll(self y), scroll(self inline), scroll(self inline);
    animation-range:
      0 var(--a-scroll-fade-reveal, 96px),
      calc(100% - var(--a-scroll-fade-reveal, 96px)) 100%,
      0 var(--a-scroll-fade-reveal, 96px),
      calc(100% - var(--a-scroll-fade-reveal, 96px)) 100%;
  }
}

@supports not (animation-timeline: scroll()) {
  .a-scroll-fade--vertical,
  .a-scroll-fade--both {
    --a-scroll-fade-top: var(--a-scroll-fade-top-size, var(--a-scroll-fade-size, min(12%, 40px)));
    --a-scroll-fade-bottom: var(--a-scroll-fade-bottom-size, var(--a-scroll-fade-size, min(12%, 40px)));
  }

  .a-scroll-fade--horizontal,
  .a-scroll-fade--both {
    --a-scroll-fade-start: var(--a-scroll-fade-start-size, var(--a-scroll-fade-size, min(12%, 40px)));
    --a-scroll-fade-end: var(--a-scroll-fade-end-size, var(--a-scroll-fade-size, min(12%, 40px)));
  }
}
</style>
