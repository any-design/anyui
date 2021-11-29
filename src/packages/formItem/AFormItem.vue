<template>
  <div
    :class="{
      'a-form-item': true,
      'a-form-item--invalid': !isValid,
    }"
  >
    <div class="a-form-item-inner">
      <div v-if="label" class="a-form-item-inner__label" :style="labelStyle">
        <span>{{ label }}</span>
      </div>
      <div class="a-form-item-inner__content">
        <slot></slot>
      </div>
    </div>
    <div v-if="!isValid" class="a-form-item-invalid">
      <div v-if="label" class="a-form-item-invalid__placeholder" :style="labelStyle"></div>
      <div class="a-form-item-invalid__msg">{{ inValidMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Handler } from 'mitt';
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue';
import { ClearEventPayload, FormEventEmitter, SetValidEventPayload } from '../form/bus';
import { getCertainParent } from '../../utils';
import formItemEventEmitterFactory from './bus';

export default defineComponent({
  name: 'AFormItem',
  props: {
    prop: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  setup(props, { expose }) {
    const formParent = getCertainParent('AForm', getCurrentInstance());
    const formEventEmitter = formParent?.exposed?.emitter as FormEventEmitter | undefined;
    const formItemEventEmitter = formItemEventEmitterFactory();

    if (!formEventEmitter) {
      console.warn('[AnyUI][FormItem] Cannot get emitter from parent node.');
    }
    const formattedLabelWidth = formParent?.exposed?.formattedLabelWidth as string | number;
    if (!formattedLabelWidth) {
      console.warn('[AnyUI][FormItem] Cannot get label width from parent node.');
    }
    const labelStyle = {
      width: formattedLabelWidth,
    };

    const isValid = ref(true);
    const inValidMessage = ref('');

    const setValidHandler: Handler<SetValidEventPayload> = (payload) => {
      if (!payload.field || !props.prop || payload.field !== props.prop) {
        return;
      }
      inValidMessage.value = !payload.isValid
        ? payload.message || `${props.prop || 'Unknown form item'} is invalid`
        : '';
      isValid.value = payload.isValid;
    };

    const clearHandler: Handler<ClearEventPayload> = (payload) => {
      if (payload.type === 'all') {
        formItemEventEmitter.emit('clear');
        return;
      }
      if (props.prop && payload.field !== props.prop) {
        return;
      }
      formItemEventEmitter.emit('clear');
    };

    onMounted(() => {
      formEventEmitter?.on('setValid', setValidHandler);
      formEventEmitter?.on('clear', clearHandler);
    });

    onUnmounted(() => {
      formEventEmitter?.off('setValid', setValidHandler);
      formEventEmitter?.off('clear', clearHandler);
    });

    expose({
      emitter: formItemEventEmitter,
    });

    return {
      labelStyle,
      isValid,
      inValidMessage,
    };
  },
});
</script>

<style lang="scss">
.a-form-item {
  width: 100%;
  position: relative;
  margin-bottom: 18px;
  &-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    &__content {
      flex: 1;
    }
  }
  &-invalid {
    margin-top: 12px;
    display: flex;
    &__msg {
      font-size: 15px;
      color: var(--danger);
      flex: 1;
    }
  }
}
.a-form-item--invalid {
  .a-form-item-inner {
    &__content {
      input {
        border: 1px solid var(--danger) !important;
      }
    }
  }
}
.a-form-item:last-of-type {
  margin-bottom: 0;
}
</style>