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
    <Transition mode="out-in" name="a-form-item-invalid">
      <div v-if="!isValid" class="a-form-item-invalid">
        <div v-if="label" class="a-form-item-invalid__placeholder" :style="labelStyle"></div>
        <div class="a-form-item-invalid__msg">{{ inValidMessage }}</div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import type { Handler } from 'mitt';
import type {
  ComputedRef} from 'vue';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  computed,
  inject,
} from 'vue';
import type { ClearEventPayload, FormEventEmitter, SetValidEventPayload } from '../form/bus';
import type { FormRuleItem } from '../form/types';
import { getCertainParent } from '../../utils';
import formItemEventEmitterFactory from './bus';

export default defineComponent({
  name: 'AFormItem',
  props: {
    // prop name in the form data
    prop: {
      type: String,
    },
    // the label text in the form item
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
    const formattedLabelWidth = formParent?.exposed?.formattedLabelWidth as ComputedRef<
      string | number
    >;
    if (!formattedLabelWidth.value) {
      console.warn('[AnyUI][FormItem] Cannot get label width from parent node.');
    }
    const labelStyle = computed(() => ({
      width: formattedLabelWidth.value,
    }));

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

    const formRules = inject<ComputedRef<Record<string, FormRuleItem[]>>>('formRules');

    const currentItemRule = computed(() => {
      if (!formRules) {
        return;
      }
      return formRules.value?.[props.prop || ''];
    });

    const shouldRevalidateOnChange = computed(() =>
      currentItemRule.value?.some((item) => item.triggerType === 'change'),
    );
    const shouldRevalidateOnBlur = computed(() =>
      currentItemRule.value?.some((item) => item.triggerType === 'blur'),
    );

    const handleItemChange = () => {
      if (shouldRevalidateOnChange.value && props.prop)
        formEventEmitter?.emit('revalidateField', props.prop);
    };
    const handleItemBlur = () => {
      if (shouldRevalidateOnBlur.value && props.prop)
        formEventEmitter?.emit('revalidateField', props.prop);
    };

    onMounted(() => {
      // for parent
      formEventEmitter?.on('setValid', setValidHandler);
      formEventEmitter?.on('clear', clearHandler);
      // for child
      formItemEventEmitter.on('change', handleItemChange);
      formItemEventEmitter.on('blur', handleItemBlur);
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
    &__label {
      flex-shrink: 0;
    }
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

.a-form-item-invalid-enter-active,
.a-form-item-invalid-leave-active {
  transition: transform var(--anim-duration-quick, 100ms) ease-out;
}
.a-form-item-invalid-enter-to {
  opacity: 1;
  transform: translateY(0px) scaleY(1);
}
.a-form-item-invalid-enter-from,
.a-form-item-invalid-leave-to {
  opacity: 0;
  transform: translateY(-20px) scaleY(0);
}
</style>
