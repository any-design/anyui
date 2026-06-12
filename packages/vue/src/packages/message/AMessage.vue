<template>
  <div
    :class="[
      'a-message',
      `a-message--${type}`,
      {
        'a-message--has-icon': displayIcon,
        'a-message--round': round,
      },
    ]"
    role="dialog"
    @click.stop
  >
    <div v-if="displayIcon" class="a-message__icon">
      <Icon :icon="iconName" />
    </div>
    <span class="a-message__text">{{ content }}</span>
  </div>
</template>

<script lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { DefaultIcon } from './constants';
import type { MessageType } from './types';

export default defineComponent({
  name: 'AMessage',
  components: {
    Icon,
  },
  props: {
    // type of the message, can be 'default', 'info', 'warning', 'success', 'error'
    type: {
      type: String as PropType<MessageType>,
    },
    //
    content: {
      type: String,
    },
    // the icon which will be used as a prefix, if remains empty, there will be no icon
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      default: '',
    },
    // whether to show the icon
    showIcon: {
      type: Boolean,
      default: true,
    },
    // if true, the message will be rounded style
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayIcon() {
      if (!this.showIcon) {
        return false;
      }
      if (this.icon) {
        return true;
      }
      const defaultIcon = DefaultIcon[this.type!];
      return !!defaultIcon;
    },
    iconName() {
      if (this.icon) {
        return this.icon;
      }
      const defaultIcon = DefaultIcon[this.type!];
      return defaultIcon || '';
    },
  },
});
</script>

<style lang="scss">
@keyframes message-in {
  0% {
    opacity: 0;
    transform: translateY(-60%) scale(0.92);
  }
  60% {
    opacity: 1;
    transform: translateY(6%) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.a-message {
  min-width: 300px;
  max-width: 90vw;
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 40px;
  border-radius: var(--a-radius, 14px);
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    var(--a-shadow-md, 0px 2px 8px var(--shadow-10));
  box-sizing: border-box;
  margin-bottom: 12px;
  background: var(--a-surface, var(--bg-bright));
  -webkit-backdrop-filter: var(--a-surface-backdrop, none);
  backdrop-filter: var(--a-surface-backdrop, none);
  border: 1px solid var(--a-surface-border-color, transparent);
  user-select: none;
  animation: message-in var(--anim-duration-slow, 320ms) var(--a-ease-spring, ease-out) 0s 1 forwards;

  &__icon {
    width: 18px;
    height: 18px;
    position: relative;
    margin-right: 8px;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
  }
}

@mixin white-content {
  .a-message__icon {
    svg {
      path {
        fill: #fff;
      }
    }
  }
  .a-message__text {
    color: #fff;
  }
}

.a-message--has-icon.a-message--round {
  padding: 0 12px;
}
.a-message:last-child {
  margin-bottom: 0;
}

.a-message--round {
  border-radius: var(--a-radius-full, 999px);
  padding: 0 16px;
}

@mixin colored-message($color) {
  background: var(--#{$color});
  box-shadow:
    var(--a-surface-highlight, 0 0 #0000),
    0 6px 18px -6px color-mix(in srgb, var(--#{$color}) 55%, transparent),
    0 2px 6px var(--shadow-4);
  @include white-content();
}

.a-message--success {
  @include colored-message('success');
}
.a-message--error {
  @include colored-message('danger');
}
.a-message--warning {
  @include colored-message('warn');
}
.a-message--info {
  @include colored-message('info');
}
</style>
