<template>
  <div
    :class="{
      'a-button': true,
      [`a-button--${size}`]: size && size !== 'default',
      [`a-button--${type}`]: !!type,
      'a-button--text-shadow': textShadow,
      'a-button--round': round,
      'a-button--fill': fill,
      'a-button--anim': anim,
      'a-button--disabled': disabled,
      'a-button--icon': !!icon,
      'a-button--icon-leading': !!icon && hasContent && iconPosition === 'leading' && !loading,
      'a-button--icon-trailing': !!icon && hasContent && iconPosition === 'trailing' && !loading,
      'a-button--loading': loading,
    }"
    :disabled="disabled"
    @click="onButtonClicked"
  >
    <Icon v-if="icon && iconPosition === 'leading' && !loading" :icon="icon" />
    <span v-if="loading" class="a-button__loading">
      <span class="a-button__spinner">
        <Icon :icon="loadingIcon"></Icon>
      </span>
    </span>
    <span class="a-button__inner" :style="{ visibility: loading ? 'hidden' : 'visible' }"
      ><slot></slot
    ></span>
    <Icon v-if="icon && iconPosition === 'trailing' && !loading" :icon="icon" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, useSlots } from 'vue';
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';

import type { ButtonType, IconPosition } from './types';

// This ui component is a button.
export default defineComponent({
  name: 'AButton',
  components: {
    Icon,
  },
  props: {
    // Style type of the button
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    // If true, a rounded border will be applied to the button
    round: {
      type: Boolean,
      default: false,
    },
    // If true, the button will perform an move up animation on hover
    anim: {
      type: Boolean,
      default: false,
    },
    // Button size
    size: {
      type: String,
      default: 'default',
    },
    // If true, the button will be disabled
    disabled: {
      type: Boolean,
      default: false,
    },
    // If true, the button will fill the parent container
    fill: {
      type: Boolean,
      default: false,
    },
    // If true, the text in the button will have be applied a text-shadow.
    textShadow: {
      type: Boolean,
      default: false,
    },
    // The icon in the button
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: '',
    },
    // The position of the icon
    iconPosition: {
      type: String as PropType<IconPosition>,
      default: 'leading',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingIcon: {
      type: String as PropType<IconPosition>,
      default: 'quill:loading-spin',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const hasContent = !!useSlots().default;

    const onButtonClicked = (e: MouseEvent) => {
      if (props.disabled || props.loading) {
        return;
      }
      emit('click', e);
    };

    return {
      hasContent,
      onButtonClicked,
    };
  },
});
</script>

<style lang="scss">
@keyframes a-button-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.a-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  height: 42px;
  line-height: 30px;
  padding: 4px 20px;
  background: var(--bg);
  border-radius: 6px;
  box-shadow: 0px 4px 10px var(--shadow-6);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  color: var(--primary);
  cursor: pointer;
  border: 1px solid var(--primary);
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
  transition: filter 120ms ease;

  &__inner {
    color: inherit;
  }

  &__loading {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.16);
    border-radius: inherit;
    color: inherit;
    cursor: not-allowed;
    transition: background-color 120ms ease;
    font-size: 1.2em;
  }

  &__spinner {
    position: relative;
    display: inline-block;
    color: inherit;

    svg {
      display: block;
      animation: 0.75s a-button-spinner ease 0s infinite;
    }
  }
}

.a-button:hover {
  filter: brightness(1.1);
}
.a-button:active {
  filter: brightness(1.05);
}

.a-button.a-button--round {
  border-radius: 24px;
}
.a-button.a-button--large {
  font-size: 16px;
  line-height: 36px;
  padding: 6px 24px;
  height: 52px;
  border-radius: 8px;
}
.a-button.a-button--large.a-button--round {
  border-radius: 30px;
}
.a-button.a-button--small {
  font-size: 12px;
  line-height: 30px;
  padding: 3px 14px;
  height: 32px;
  border-radius: 5px;
}
.a-button.a-button--small.a-button--round {
  border-radius: 18px;
}

.a-button.a-button--fill {
  width: 100%;
}
.a-button.a-button--depth {
  text-shadow: 2px 2px 4px var(--shadow-12);
}
.a-button.a-button--text-shadow {
  text-shadow: 2px 2px 4px var(--shadow-12);
}

@mixin coloredButton($color) {
  .a-button.a-button--#{$color} {
    background: var(--#{$color});
    color: var(--text-btn);
    border: none;
  }
  .a-button.a-button--#{$color}:hover {
    filter: none;
    background: var(--#{$color}-85);
  }
  .a-button.a-button--#{$color}:active {
    filter: none;
    background: var(--#{$color}-75);
  }
}

@include coloredButton('primary');
@include coloredButton('secondary');
@include coloredButton('info');
@include coloredButton('warn');
@include coloredButton('danger');

.a-button.a-button--gradient {
  box-shadow: 0 2px 12px var(--shadow-12);
  background: linear-gradient(42deg, var(--primary), var(--secondary));
  color: var(--text-btn);
  border: none;
}
.a-button.a-button--gradient-reverse {
  background: linear-gradient(42deg, var(--secondary), var(--primary));
  box-shadow: 0 2px 12px var(--shadow-12);
  color: var(--text-btn);
  border: none;
}

.a-button.a-button--depth {
  background: linear-gradient(180deg, var(--primary-l-6) 36%, var(--primary-d-4));
  box-shadow: 0 2px 12px var(--shadow-12);
  color: var(--text-btn);
  border: none;
}

.a-button.a-button--anim {
  transition: all var(--anim-duration, 200ms) ease;
}
.a-button.a-button--anim:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px var(--shadow-24);
}

.a-button.a-button--disabled {
  transition: none;
  border: none;
  background: var(--bg-disabled) !important;
  color: var(--text-disabled) !important;
  box-shadow: 0 3px 12px var(--shadow-5);
  cursor: not-allowed;
}

.a-button--icon {
  display: flex;
  align-items: center;
  padding: 6px 12px;

  svg {
    font-size: 1.25em;
    flex-shrink: 0;
  }
}

.a-button--small.a-button--icon {
  padding: 4px 10px;
  svg {
    font-size: 1.125em;
  }
}
.a-button--large.a-button--icon {
  padding: 8px 15px;
  svg {
    font-size: 1.375em;
  }
}
.a-button--round.a-button--icon {
  padding: 6px 11.375px;
  svg {
    font-size: 1.375em;
  }
}
.a-button--small.a-button--round.a-button--icon {
  padding: 4px 8px;
}
.a-button--large.a-button--round.a-button--icon {
  padding: 8px 15px;
  svg {
    font-size: 1.375em;
  }
}

// leading position icon with text
.a-button--icon-leading {
  padding: 6px 18px 6px 16px;
  svg {
    margin-right: 4px;
  }
}
.a-button--small.a-button--icon-leading {
  padding: 4px 12px 4px 10px;
  svg {
    margin-right: 3px;
  }
}
.a-button--large.a-button--icon-leading {
  padding: 8px 22px 8px 18px;
  svg {
    margin-right: 6px;
  }
}
.a-button--round.a-button--icon-leading {
  padding: 6px 14px 6px 12px;
  svg {
    margin-right: 4px;
  }
}
.a-button--round.a-button--small.a-button--icon-leading {
  padding: 4px 10px 4px 8px;
  svg {
    margin-right: 3px;
  }
}
.a-button--round.a-button--large.a-button--icon-leading {
  padding: 8px 20px 8px 16px;
  svg {
    margin-right: 6px;
  }
}

// trailing position icon with text
.a-button--icon-trailing {
  padding: 6px 16px 6px 18px;
  svg {
    margin-left: 4px;
  }
}
.a-button--small.a-button--icon-trailing {
  padding: 4px 10px 4px 12px;
  svg {
    margin-left: 3px;
  }
}
.a-button--large.a-button--icon-trailing {
  padding: 8px 18px 8px 22px;
  svg {
    margin-left: 6px;
  }
}
.a-button--round.a-button--icon-trailing {
  padding: 6px 12px 6px 16px;
  svg {
    margin-left: 4px;
  }
}
.a-button--round.a-button--small.a-button--icon-trailing {
  padding: 4px 8px 4px 11px;
  svg {
    margin-left: 3px;
  }
}
.a-button--round.a-button--large.a-button--icon-trailing {
  padding: 8px 16px 8px 21px;
  svg {
    margin-left: 6px;
  }
}

.a-button--loading:hover {
  transform: none;

  .a-button__loading {
    background-color: rgba(0, 0, 0, 0.24);
  }
}
.a-button--loading:active {
  transform: none;

  .a-button__loading {
    background-color: rgba(0, 0, 0, 0.24);
  }
}
</style>
