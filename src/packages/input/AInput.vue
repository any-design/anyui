<template>
  <div
    ref="inputWrapperRef"
    :class="{
      'a-input': true,
      'a-input--large': size === 'large',
      'a-input--round': round,
      'a-input--borderless': borderless,
      'a-input--has-prefix': hasPrefix,
      'a-input--has-postfix': hasPostfix,
      'a-input--has-post-button': hasPostButton,
      'a-input--disabled': disabled,
      'a-input--readonly': readonly,
    }"
    :style="wrapperStyle"
  >
    <div v-if="hasPrefix" class="a-input__prefix" :style="prefixStyle">
      <slot name="prefix"></slot>
    </div>
    <input
      :value="storedValue"
      class="a-input__inner"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly || !editable"
      :maxlength="maxlength"
      :minlength="minlength"
      :max="max"
      :min="min"
      :type="type"
      :autocomplete="autocomplete"
      :style="extraInnerStyle"
      @input="handleInput"
      @change="handleChange"
      @keydown.enter="handleEnterDown"
      @blur="handleBlur"
    />
    <div v-if="hasPostButton" class="a-input__post-button"><slot name="post-button"></slot></div>
    <div v-else-if="hasPostfix" class="a-input__postfix" :style="postfixStyle">
      <slot name="postfix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Handler } from 'mitt';
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watch,
  computed,
  Ref,
} from 'vue';
import { formatStyleSize, getCertainParent } from '../../utils';
import { FormItemEventEmitter } from '../formItem/bus';

// extra padding to slot elements
const SLOT_EXTRA_PADDING = 12;

export default defineComponent({
  name: 'AInput',
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },
    size: {
      type: String,
      default: 'default',
    },
    round: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    maxlength: {
      type: Number,
    },
    minlength: {
      type: Number,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    prefixPadding: {
      type: Number,
    },
    postfixPadding: {
      type: Number,
    },
    leftPadding: {
      type: Number,
    },
    rightPadding: {
      type: Number,
    },
    measureSlots: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'submit', 'input', 'change', 'blur'],
  setup(props, { emit }) {
    // refs
    const inputWrapperRef = ref<HTMLDivElement | undefined>();

    // form related
    const storedValue = ref<string>('');

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    // methods
    const clear = () => {
      storedValue.value = '';
      emit('update:modelValue', '');
      emit('change', '');
    };
    const handleInput = (e: Event) => {
      if (!e.target) {
        return;
      }
      emit('update:modelValue', (e.target as HTMLInputElement).value);
      emit('input', e);
    };
    const handleBlur = (e: Event) => {
      emit('blur', e);
      formItemEventEmitter?.emit('blur');
    };
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.value);
      emit('change', target.value);
      formItemEventEmitter?.emit('change');
    };
    const handleEnterDown = () => {
      emit('submit', storedValue.value);
    };
    const handleClear: Handler = () => {
      clear();
    };

    // life hooks
    watch(
      () => props.modelValue,
      () => {
        storedValue.value = `${props.modelValue}`;
      },
    );

    // styles
    const hasPrefix = computed(() => !!useSlots()['prefix']);
    const hasPostfix = computed(() => !!useSlots()['postfix']);
    const hasPostButton = computed(() => !!useSlots()['post-button']);

    const prefixSlotWidth = ref(0);
    const postfixSlotWidth = ref(0);
    const postButtonWidth = ref(0);

    let prefixSlotObserver: ResizeObserver | undefined;
    let postfixSlotObserver: ResizeObserver | undefined;
    let postButtonObserver: ResizeObserver | undefined;

    const wrapperStyle = computed(() => ({
      width: formatStyleSize(props.width),
    }));

    const prefixStyle = computed(() => ({
      paddingLeft: props.prefixPadding ? formatStyleSize(props.prefixPadding) : undefined,
    }));

    const postfixStyle = computed(() => ({
      paddingRight: props.postfixPadding ? formatStyleSize(props.postfixPadding) : undefined,
    }));

    const extraPaddingOnPostButton = computed(() => {
      if (props.size === 'large') {
        return 12;
      }
      return 8;
    });

    const extraInnerStyle = computed(() => {
      let leftPadding: number | undefined;
      let rightPadding: number | undefined;

      if (props.leftPadding) {
        leftPadding = props.leftPadding;
      } else if (hasPrefix.value && prefixSlotWidth.value) {
        leftPadding = prefixSlotWidth.value + SLOT_EXTRA_PADDING;
      }

      if (props.rightPadding) {
        rightPadding = props.rightPadding;
      } else if (hasPostButton.value && postButtonWidth.value) {
        rightPadding = postButtonWidth.value + extraPaddingOnPostButton.value;
      } else if (hasPostfix.value && postfixSlotWidth.value) {
        rightPadding = postfixSlotWidth.value + SLOT_EXTRA_PADDING;
      }

      return {
        paddingLeft: leftPadding ? formatStyleSize(leftPadding) : undefined,
        paddingRight: rightPadding ? formatStyleSize(rightPadding) : undefined,
      };
    });

    const createSizeObserver = (targetRef: Ref<number>, targetSelector: string) => {
      const postButton = inputWrapperRef.value?.querySelector(targetSelector);
      if (!postButton) {
        console.error('Cannot get the element of post button.');
        return;
      }
      targetRef.value = postButton?.clientWidth || 0;
      const observer = new ResizeObserver((entries) => {
        const button = entries?.[0];
        if (!postButton || !button) {
          return;
        }
        targetRef.value = postButton?.clientWidth;
      });
      observer.observe(postButton);
      return observer;
    };

    watch(hasPrefix, (newVal) => {
      if (!newVal) {
        prefixSlotObserver?.disconnect();
        prefixSlotObserver = undefined;
      } else if (!prefixSlotObserver && props.measureSlots) {
        prefixSlotObserver = createSizeObserver(prefixSlotWidth, '.a-input__prefix');
      }
    });

    watch(hasPostfix, (newVal) => {
      if (!newVal) {
        postfixSlotObserver?.disconnect();
        postfixSlotObserver = undefined;
      } else if (!postfixSlotObserver && props.measureSlots) {
        postfixSlotObserver = createSizeObserver(postfixSlotWidth, '.a-input__postfix');
      }
    });

    watch(hasPostButton, (newVal) => {
      if (!newVal) {
        postButtonObserver?.disconnect();
        postButtonObserver = undefined;
      } else if (!postButtonObserver) {
        postButtonObserver = createSizeObserver(postButtonWidth, '.a-input__post-button');
      }
    });

    onBeforeMount(() => {
      storedValue.value = `${props.modelValue}`;
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
      if (hasPostButton.value) {
        postButtonObserver = createSizeObserver(postButtonWidth, '.a-input__post-button');
      }
      if (props.measureSlots) {
        if (hasPrefix.value) {
          prefixSlotObserver = createSizeObserver(prefixSlotWidth, '.a-input__prefix');
        }
        if (hasPostfix.value) {
          postfixSlotObserver = createSizeObserver(postfixSlotWidth, '.a-input__postfix');
        }
      }
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
      postButtonObserver?.disconnect();
    });

    return {
      inputWrapperRef,
      storedValue,
      hasPrefix,
      hasPostfix,
      hasPostButton,
      wrapperStyle,
      extraInnerStyle,
      prefixStyle,
      postfixStyle,
      handleInput,
      handleBlur,
      handleChange,
      handleEnterDown,
    };
  },
});
</script>

<style lang="scss">
.a-input {
  height: var(--comp-height--default);
  position: relative;
  box-sizing: border-box;

  &__inner {
    width: 100%;
    line-height: 32px;
    padding: 4px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    box-sizing: border-box;
    background: var(--bg-semi-light);
    font-size: 14px;
    letter-spacing: 0.02rem;
    box-shadow: 1px 3px 10px var(--shadow-4);
    transition: border-color 100ms ease-out, box-shadow 100ms ease-out;
    outline: none !important;
  }

  &__inner:focus {
    box-shadow: 1px 3px 10px var(--primary-12);
    border: 1px solid var(--primary-80);
  }

  &__inner::placeholder {
    color: var(--placeholder);
  }
}

.a-input.a-input--round {
  .a-input__inner {
    border-radius: 20px;
    padding: 4px 18px;
  }
}

.a-input.a-input--borderless {
  .a-input__inner {
    border: none;
  }
}

@mixin input-inserted {
  position: absolute;
  top: 0;
  line-height: var(--comp-height--default);
  display: flex;
  align-items: center;
  height: 100%;
}

.a-input.a-input--has-prefix {
  .a-input__prefix {
    left: 0;
    padding-left: 12px;

    @include input-inserted();

    svg {
      width: 14px;
      height: 14px;
      path {
        stroke: var(--placeholder);
      }
    }
  }
  .a-input__inner {
    padding-left: 36px;
  }
}
.a-input.a-input--has-postfix {
  .a-input__postfix {
    right: 0;
    padding-right: 12px;

    @include input-inserted();

    svg {
      width: 14px;
      height: 14px;
      path {
        stroke: var(--placeholder);
      }
    }
  }

  .a-input__inner {
    padding-right: 36px;
  }
}
.a-input--large {
  height: var(--comp-height--large);

  .a-input__inner {
    line-height: 40px;
    font-size: 16px;
    padding: 4px 18px;
    border-radius: 8px;
    box-shadow: 2px 3px 14px var(--shadow-6);
  }

  .a-input__inner:focus {
    box-shadow: 2px 3px 14px var(--primary-20);
  }
}
.a-input.a-input--round.a-input--large {
  .a-input__inner {
    border-radius: 24px;
    padding: 4px 22px;
  }
}

.a-input.a-input--large.a-input--has-prefix {
  .a-input__prefix {
    line-height: var(--comp-height--large);
    svg {
      width: 26px;
      height: 26px;
    }
  }
  .a-input__inner {
    padding-left: 36px;
  }
}

.a-input.a-input--large.a-input--has-postfix {
  .a-input__postfix {
    line-height: var(--comp-height--large);
    svg {
      width: 26px;
      height: 26px;
    }
  }
  .a-input__inner {
    padding-right: 36px;
  }
}

.a-input.a-input--round.a-input--large.a-input--has-prefix {
  .a-input__prefix {
    padding-left: 12px;
  }
  .a-input__inner {
    padding-left: 40px;
  }
}

.a-input.a-input--round.a-input--large.a-input--has-postfix {
  .a-input__postfix {
    padding-right: 12px;
  }
  .a-input__inner {
    padding-right: 40px;
  }
}

.a-input.a-input--disabled {
  .a-input__inner {
    color: var(--text-disabled);
    background: var(--bg-disabled);
    cursor: not-allowed;
  }
}

.a-input.a-input--readonly {
  .a-input__inner {
    background: var(--bg-readonly);
  }
}

.a-input.a-input--readonly.a-input--borderless {
  .a-input__inner {
    box-shadow: 3px 2px 8px var(--shadow-8);
  }
}

.a-input.a-input--has-post-button {
  .a-input__post-button {
    position: absolute;
    right: 4px;
    top: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 4px 0;
    box-sizing: border-box;

    .a-button {
      height: 100%;
      line-height: calc(100% - 8px);
    }
  }
}
</style>
