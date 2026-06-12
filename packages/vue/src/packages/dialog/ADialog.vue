<template>
  <APopup
    v-model="visible"
    :width="width"
    :mask-closable="maskClosable"
    :append-to-body="appendToBody"
    :z-index="zIndex"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <div class="a-dialog">
      <div class="a-dialog__header">
        <div class="a-dialog__header-main">
          <slot name="header">
            <span class="a-dialog__title">{{ title }}</span>
          </slot>
        </div>
        <button
          v-if="showClose"
          type="button"
          class="a-dialog__close"
          aria-label="Close"
          @click="close"
        >
          <Icon :icon="CLOSE_ICON" />
        </button>
      </div>
      <div class="a-dialog__body">
        <slot></slot>
      </div>
      <div class="a-dialog__footer">
        <slot name="footer">
          <AButton size="small" @click="onCancelClicked">Cancel</AButton>
          <AButton size="small" type="primary" @click="onConfirmClicked">OK</AButton>
        </slot>
      </div>
    </div>
  </APopup>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { computed, defineComponent } from 'vue';

import AButton from '../button/AButton.vue';
import APopup from '../popup/APopup.vue';

const CLOSE_ICON = 'ic:round-close';

// A standard dialog built on top of APopup.
export default defineComponent({
  name: 'ADialog',
  components: {
    APopup,
    AButton,
    Icon,
  },
  props: {
    // the visibility value which will be bound to the component.
    modelValue: {
      type: Boolean,
      default: false,
    },
    // the title of the dialog, can be overridden by the header slot.
    title: {
      type: String,
      default: '',
    },
    // the width of the dialog, can be a number (px) or any css width.
    width: {
      type: [Number, String],
      default: 420,
    },
    // if true, a round close button will be rendered in the header.
    showClose: {
      type: Boolean,
      default: true,
    },
    // if true, clicking the mask (or pressing Esc) closes the dialog.
    maskClosable: {
      type: Boolean,
      default: true,
    },
    // if true, the dialog will be teleported to body.
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // the z-index value of the dialog.
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['update:modelValue', 'confirm', 'cancel', 'open', 'close'],
  setup(props, { emit }) {
    const visible = computed({
      get: () => props.modelValue,
      set: (value: boolean) => {
        emit('update:modelValue', value);
      },
    });

    const close = () => {
      visible.value = false;
    };

    const onCancelClicked = () => {
      emit('cancel');
      close();
    };

    const onConfirmClicked = () => {
      emit('confirm');
      close();
    };

    return {
      CLOSE_ICON,
      visible,
      close,
      onCancelClicked,
      onConfirmClicked,
    };
  },
});
</script>

<style lang="scss">
.a-dialog {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  color: var(--text);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 24px 24px 0 24px;
  }

  &__header-main {
    flex: 1;
    min-width: 0;
  }

  &__title {
    display: block;
    font-size: 17px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.02rem;
    color: var(--text);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: var(--a-radius-full, 999px);
    background: transparent;
    color: var(--text-secondary);
    font-size: 18px;
    cursor: pointer;
    outline: none;
    transition:
      transform var(--anim-duration-quick, 120ms) var(--a-ease-spring, ease),
      background-color var(--anim-duration-quick, 120ms) ease,
      color var(--anim-duration-quick, 120ms) ease;

    &:hover {
      background: var(--a-item-hover-bg, var(--bg-hover));
      color: var(--text);
    }
    &:active {
      transform: scale(0.88);
    }
    &:focus-visible {
      box-shadow: var(--a-focus-ring, 0 0 0 3px var(--primary-18));
    }
  }

  &__body {
    padding: 16px 24px;
    font-size: 14.5px;
    line-height: 1.6;
    color: var(--text-80, var(--text));
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 8px 24px 24px 24px;
  }
}
</style>
