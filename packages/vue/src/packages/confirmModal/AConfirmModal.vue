<template>
  <ADialog
    v-model="visible"
    :title="title"
    :width="width"
    :mask-closable="maskClosable"
    :append-to-body="appendToBody"
    :z-index="zIndex"
    @close="$emit('close')"
  >
    <div class="a-confirm-modal__content">
      <slot>{{ content }}</slot>
    </div>
    <template #footer>
      <AButton size="small" @click="onCancelClicked">{{ cancelText }}</AButton>
      <AButton size="small" :type="confirmButtonType" :loading="loading" @click="onConfirmClicked">
        {{ confirmText }}
      </AButton>
    </template>
  </ADialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

import AButton from '../button/AButton.vue';
import ADialog from '../dialog/ADialog.vue';

import type { ConfirmModalType } from './types';

// A thin confirmation wrapper over ADialog.
export default defineComponent({
  name: 'AConfirmModal',
  components: {
    ADialog,
    AButton,
  },
  props: {
    // the visibility value which will be bound to the component.
    modelValue: {
      type: Boolean,
      default: false,
    },
    // the title of the confirm modal.
    title: {
      type: String,
      default: '',
    },
    // the content text, can be overridden by the default slot.
    content: {
      type: String,
      default: '',
    },
    // the text of the confirm button.
    confirmText: {
      type: String,
      default: 'OK',
    },
    // the text of the cancel button.
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    // 'primary' or 'danger', danger renders a danger confirm button.
    type: {
      type: String as PropType<ConfirmModalType>,
      default: 'primary',
    },
    // if true, the confirm button shows a loading state.
    loading: {
      type: Boolean,
      default: false,
    },
    // if false, the modal stays open after confirm (for async flows).
    closeOnConfirm: {
      type: Boolean,
      default: true,
    },
    // the width of the modal, can be a number (px) or any css width.
    width: {
      type: [Number, String],
      default: 420,
    },
    // if true, clicking the mask (or pressing Esc) closes the modal.
    maskClosable: {
      type: Boolean,
      default: true,
    },
    // if true, the modal will be teleported to body.
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // the z-index value of the modal.
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['update:modelValue', 'confirm', 'cancel', 'close'],
  setup(props, { emit }) {
    const visible = computed({
      get: () => props.modelValue,
      set: (value: boolean) => {
        emit('update:modelValue', value);
      },
    });

    const confirmButtonType = computed(() => (props.type === 'danger' ? 'danger' : 'primary'));

    const onCancelClicked = () => {
      emit('cancel');
      visible.value = false;
    };

    const onConfirmClicked = () => {
      if (props.loading) {
        return;
      }
      emit('confirm');
      if (props.closeOnConfirm) {
        visible.value = false;
      }
    };

    return {
      visible,
      confirmButtonType,
      onCancelClicked,
      onConfirmClicked,
    };
  },
});
</script>

<style lang="scss">
.a-confirm-modal__content {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-80, var(--text));
  word-break: break-word;
}
</style>
