<template>
  <button
    :class="{
      'a-button': true,
      [`a-button--${size}`]: size && size !== 'default',
      [`a-button--${type}`]: !!type,
      'a-button--round': round,
      'a-button--fill': fill,
      'a-button--anim': anim,
      'a-button--disabled': disabled,
      'a-button--icon': !!icon,
      'a-button--icon-text': !!icon && hasContent,
    }"
    :disabled="disabled"
  >
    <Icon v-if="icon" :icon="icon" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, useSlots } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'AButton',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: false,
    },
    anim: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup() {
    const hasContent = !!useSlots().default;
    return {
      hasContent,
    };
  },
});
</script>

<style lang="scss">
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
  color: var(--primary);
  border-radius: 4px;
  box-shadow: 0px 6px 12px var(--shadow-5);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05rem;
  cursor: pointer;
  border: 1px solid var(--primary);
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
}
.a-button:hover {
  filter: brightness(1.08);
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
}
.a-button.a-button--large.a-button--round {
  border-radius: 30px;
}
.a-button.a-button--small {
  font-size: 12px;
  line-height: 28px;
  padding: 3px 14px;
  height: 32px;
}
.a-button.a-button--small.a-button--round {
  border-radius: 18px;
}
.a-button.a-button--fill {
  width: 100%;
}
.a-button.a-button--primary {
  background: var(--primary);
  color: var(--btn);
  box-shadow: 0 3px 14px var(--shadow-18);
  border: none;
}
.a-button.a-button--gradient {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: var(--btn);
  box-shadow: 0 3px 14px var(--shadow-18);
  border: none;
}
.a-button.a-button--gradient-reserve {
  background: linear-gradient(90deg, var(--secondary), var(--primary));
  color: var(--btn);
  box-shadow: 0 3px 14px var(--shadow-18);
  border: none;
}
.a-button.a-button--primary:hover {
  filter: none;
  background: var(--primary-85);
}
.a-button.a-button--primary:active {
  filter: none;
  background: var(--primary-75);
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
  background: var(--disabled) !important;
  color: var(--text-disabled) !important;
  box-shadow: 0 3px 12px var(--shadow-5);
  cursor: not-allowed;
}
.a-button--icon {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  svg {
    font-size: 1.2em;
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
  padding: 8px 18px;
  svg {
    font-size: 1.375em;
  }
}
.a-button--round.a-button--icon {
  padding: 6px 12px;
  svg {
    font-size: 1.375em;
  }
}
.a-button--small.a-button--round.a-button--icon {
  padding: 4px 8px;
}
.a-button--large.a-button--round.a-button--icon {
  padding: 8px 16px;
  svg {
    font-size: 1.375em;
  }
}
.a-button--icon-text {
  padding: 6px 18px 6px 16px;
  svg {
    margin-right: 4px;
  }
}
.a-button--small.a-button--icon-text {
  padding: 4px 12px 4px 10px;
  svg {
    margin-right: 3px;
  }
}
.a-button--large.a-button--icon-text {
  padding: 8px 24px 8px 18px;
  svg {
    margin-right: 6px;
  }
}
.a-button--round.a-button--icon-text {
  padding: 6px 16px 6px 12px;
  svg {
    margin-right: 4px;
  }
}
.a-button--round.a-button--small.a-button--icon-text {
  padding: 4px 10px 4px 8px;
  svg {
    margin-right: 3px;
  }
}
.a-button--round.a-button--large.a-button--icon-text {
  padding: 8px 22px 8px 16px;
  svg {
    margin-right: 6px;
  }
}
</style>
