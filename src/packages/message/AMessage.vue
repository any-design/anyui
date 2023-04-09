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
import { defineComponent, PropType } from 'vue';
import { Icon } from '@iconify/vue';
import { MessageType } from './types';
import { DefaultIcon } from './constants';

export default defineComponent({
  name: 'AMessage',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String as PropType<MessageType>,
    },
    content: {
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
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
.a-message {
  min-width: 300px;
  max-width: 90vw;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px var(--shadow-10);
  box-sizing: border-box;
  margin-bottom: 12px;
  background: var(----bg-semi-light);
  user-select: none;
  &__icon {
    width: 18px;
    height: 18px;
    position: relative;
    margin-right: 8px;
    svg {
      width: 100%;
      height: 100%;
      path {
        fill: var(--text-white);
      }
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
.a-message--has-icon.a-message--round {
  padding: 0 12px;
}
.a-message:last-child {
  margin-bottom: 0;
}
.a-message--round {
  border-radius: 20px;
  padding: 0 16px;
}
.a-message--success {
  background: var(--success);
  .a-message__text {
    color: var(--text-white);
  }
}
.a-message--error {
  background: var(--error);
  .a-message__text {
    color: var(--text-white);
  }
}
.a-message--warning {
  background: var(--warning);
  .a-message__text {
    color: var(--text-white);
  }
}
.a-message--info {
  background: var(--info);
  .a-message__text {
    color: var(--text-white);
  }
}
</style>
