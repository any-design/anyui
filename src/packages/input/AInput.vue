<template>
  <div
    :class="{
      'a-input': true,
      'a-input--large': size === 'large',
      'a-input--round': round,
      'a-input--has-prefix': hasPrefix,
      'a-input--has-postfix': hasPostfix,
      'a-input--disabled': disabled,
      'a-input--readonly': readonly,
    }"
    :style="style"
  >
    <input
      v-model="storedValue"
      class="a-input__inner"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      @input="handleInput"
      @keydown.enter="handleEnterDown"
    />
    <div v-if="hasPrefix" class="a-input__prefix"><slot name="prefix"></slot></div>
    <div v-if="hasPostfix" class="a-input__postfix"><slot name="postfix"></slot></div>
  </div>
</template>

<script lang="ts">
import { Handler } from 'mitt';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watchEffect,
} from 'vue';
import { formatStyleSize, getCertainParent } from '../../utils';
import { FormItemEventEmitter } from '../formItem/bus';

export default defineComponent({
  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },
    size: {
      type: String,
      default: 'medium',
    },
    round: {
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
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const storedValue = ref(props.modelValue);

    const formItemParent = getCertainParent('AFormItem', getCurrentInstance());
    let formItemEventEmitter: FormItemEventEmitter | undefined;
    if (formItemParent) {
      formItemEventEmitter = formItemParent.exposed?.emitter as FormItemEventEmitter;
    }

    // methods
    const clear = () => {
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
    watchEffect(() => {
      storedValue.value = props.modelValue;
    });

    onMounted(() => {
      formItemEventEmitter?.on('clear', handleClear);
    });

    onUnmounted(() => {
      formItemEventEmitter?.off('clear', handleClear);
    });

    return {
      storedValue,
      hasPrefix: !!useSlots().prefix,
      hasPostfix: !!useSlots().postfix,
      style: {
        width: formatStyleSize(props.width),
      },
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
    height: 100%;
    line-height: 32px;
    padding: 4px 14px;
    border: 1px solid var(--border);
    border-radius: 4px;
    box-sizing: border-box;
    background: var(--bg-alter);
    font-size: 14px;
    letter-spacing: 0.025rem;
    box-shadow: 2px 8px 16px var(--shadow-10);
  }
  &__inner:focus {
    outline: 0;
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
    padding-left: 8px;
    @include input-inserted();
    svg {
      width: 22px;
      height: 22px;
      path {
        stroke: var(--placeholder);
      }
    }
  }
  .a-input__inner {
    padding-left: 32px;
  }
}
.a-input.a-input--has-postfix {
  .a-input__postfix {
    right: 0;
    padding-right: 8px;
    @include input-inserted();
    svg {
      width: 22px;
      height: 22px;
      path {
        stroke: var(--placeholder);
      }
    }
  }
  .a-input__inner {
    padding-right: 32px;
  }
}
.a-input--large {
  height: var(--comp-height--large);
  .a-input__inner {
    line-height: 40px;
    font-size: 16px;
    padding: 4px 18px;
    box-shadow: 0px 8px 20px var(--shadow-10);
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
    background: var(--disabled);
    cursor: not-allowed;
  }
}
.a-input.a-input--readonly {
  .a-input__inner {
    background: var(--readonly);
  }
}
</style>