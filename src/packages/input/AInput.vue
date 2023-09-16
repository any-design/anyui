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
      @keydown.enter="handleEnterDown"
    />
    <div v-if="hasPrefix" class="a-input__prefix"><slot name="prefix"></slot></div>
    <div v-if="hasPostButton" class="a-input__post-button"><slot name="post-button"></slot></div>
    <div v-else-if="hasPostfix" class="a-input__postfix"><slot name="postfix"></slot></div>
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
} from 'vue';
import { formatStyleSize, getCertainParent } from '../../utils';
import { FormItemEventEmitter } from '../formItem/bus';

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
  },
  emits: ['update:modelValue', 'submit'],
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
    };
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit('update:modelValue', target.value);
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
    const hasPostButton = computed(() => !!useSlots()['post-button']);
    const postButtonWidth = ref(0);
    let postButtonObserver: ResizeObserver | undefined;

    const extraPaddingOnPostButton = computed(() => {
      if (props.size === 'large') {
        return 12;
      }
      return 8;
    });

    const extraInnerStyle = computed(() => {
      if (hasPostButton.value && postButtonWidth.value) {
        return {
          paddingRight: `${postButtonWidth.value + extraPaddingOnPostButton.value}px`,
        };
      }
      return undefined;
    });

    const wrapperStyle = computed(() => ({
      width: formatStyleSize(props.width),
    }));

    onBeforeMount(() => {
      storedValue.value = `${props.modelValue}`;
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
      if (hasPostButton.value && inputWrapperRef.value) {
        const postButton = inputWrapperRef.value.querySelector('.a-input__post-button');
        if (!postButton) {
          console.error('Cannot get the element of post button.');
          return;
        }
        postButtonWidth.value = postButton?.clientWidth || 0;
        postButtonObserver = new ResizeObserver((entries) => {
          const button = entries?.[0];
          if (!postButton || !button) {
            return;
          }
          postButtonWidth.value = postButton?.clientWidth;
        });
        postButtonObserver.observe(postButton);
      }
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
      postButtonObserver?.disconnect();
    });

    return {
      inputWrapperRef,
      storedValue,
      hasPrefix: !!useSlots().prefix,
      hasPostfix: !!useSlots().postfix,
      hasPostButton: hasPostButton,
      wrapperStyle,
      extraInnerStyle,
      handleInput,
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
