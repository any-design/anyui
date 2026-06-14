<template>
  <div
    :class="{
      'a-otp-input': true,
      'a-otp-input--disabled': disabled,
    }"
    @pointerdown.prevent="handlePointerDown"
  >
    <input
      ref="inputRef"
      class="a-otp-input__hidden-input"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      :disabled="disabled"
      @keydown="handleKeyDown"
      @paste="handlePaste"
      @focus="focused = true"
      @blur="focused = false"
    />
    <div
      v-for="(char, index) in cells"
      :key="index"
      :class="{
        'a-otp-input__cell': true,
        'a-otp-input__cell--filled': !!char,
        'a-otp-input__cell--active': focused && index === activeIndex,
      }"
      @pointerdown.prevent="handleCellPointerDown(index)"
    >
      <transition name="a-trans-otp-char">
        <span v-if="char" class="a-otp-input__char">{{ masked ? '•' : char }}</span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'AOtpInput',
  props: {
    // the code which will be bound to this component.
    modelValue: {
      type: String,
      default: '',
    },
    // the number of code cells.
    length: {
      type: Number,
      default: 6,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // show dots instead of the typed characters.
    masked: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'complete'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | undefined>();
    const storedValue = ref('');
    const activeIndex = ref(0);
    const focused = ref(false);

    const normalize = (value: string) => value.replace(/\s/g, '').slice(0, props.length);

    const cells = computed(() => {
      const chars: string[] = [];
      for (let i = 0; i < props.length; i += 1) {
        chars.push(storedValue.value[i] || '');
      }
      return chars;
    });

    const clampActiveIndex = (index: number) =>
      Math.min(Math.max(index, 0), Math.min(storedValue.value.length, props.length - 1));

    const setValue = (next: string) => {
      const normalized = normalize(next);
      if (normalized === storedValue.value) {
        return;
      }
      storedValue.value = normalized;
      emit('update:modelValue', normalized);
      if (normalized.length === props.length) {
        emit('complete', normalized);
      }
    };

    const handlePointerDown = () => {
      if (props.disabled) {
        return;
      }
      activeIndex.value = clampActiveIndex(storedValue.value.length);
      inputRef.value?.focus();
    };

    const handleCellPointerDown = (index: number) => {
      if (props.disabled) {
        return;
      }
      activeIndex.value = clampActiveIndex(index);
      inputRef.value?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (props.disabled) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activeIndex.value = clampActiveIndex(activeIndex.value - 1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        activeIndex.value = clampActiveIndex(activeIndex.value + 1);
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        const value = storedValue.value;
        if (!value.length) {
          return;
        }
        if (activeIndex.value < value.length) {
          // clear the current cell, the rest shifts left
          setValue(value.slice(0, activeIndex.value) + value.slice(activeIndex.value + 1));
          activeIndex.value = clampActiveIndex(activeIndex.value - 1);
        } else {
          // current cell is empty, clear the previous one and retreat
          setValue(value.slice(0, -1));
          activeIndex.value = clampActiveIndex(activeIndex.value - 1);
        }
        return;
      }
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const value = storedValue.value;
        if (activeIndex.value < value.length) {
          setValue(value.slice(0, activeIndex.value) + e.key + value.slice(activeIndex.value + 1));
        } else if (value.length < props.length) {
          setValue(value + e.key);
        }
        activeIndex.value = clampActiveIndex(activeIndex.value + 1);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      if (props.disabled) {
        return;
      }
      const pasted = normalize(e.clipboardData?.getData('text') || '');
      if (!pasted) {
        return;
      }
      setValue(pasted);
      activeIndex.value = clampActiveIndex(pasted.length);
    };

    watch(
      () => props.modelValue,
      () => {
        storedValue.value = normalize(props.modelValue);
        activeIndex.value = clampActiveIndex(activeIndex.value);
      },
    );

    onBeforeMount(() => {
      storedValue.value = normalize(props.modelValue);
      activeIndex.value = clampActiveIndex(storedValue.value.length);
    });

    onMounted(() => {
      if (props.autoFocus && !props.disabled) {
        inputRef.value?.focus();
      }
    });

    return {
      inputRef,
      cells,
      activeIndex,
      focused,
      handlePointerDown,
      handleCellPointerDown,
      handleKeyDown,
      handlePaste,
    };
  },
});
</script>

<style lang="scss">
.a-otp-input {
  position: relative;
  display: inline-flex;
  gap: 8px;
  cursor: text;

  &__hidden-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    border: none;
    opacity: 0;
    pointer-events: none;
  }

  &__cell {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--a-radius-sm, 10px);
    background: var(--a-surface-input, var(--bg-semi-light));
    box-sizing: border-box;
    color: var(--text);
    font-size: 18px;
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-shadow-xs, 1px 3px 10px var(--shadow-4));
    transition:
      border-color var(--anim-duration-quick, 120ms) var(--a-ease-soft, ease-out),
      box-shadow var(--anim-duration-quick, 120ms) var(--a-ease-soft, ease-out);
  }

  &__cell--active {
    border-color: var(--primary);
    box-shadow:
      var(--a-surface-highlight, 0 0 #0000),
      var(--a-focus-ring, 0 0 0 3px var(--primary-18));
  }

  &__cell--filled {
    .a-otp-input__char {
      font-weight: 600;
    }
  }

  &__char {
    display: block;
  }
}

.a-otp-input--disabled {
  cursor: not-allowed;

  .a-otp-input__cell {
    color: var(--text-disabled);
    background: var(--bg-disabled);
  }
}

.a-trans-otp-char-enter-active {
  transition: transform var(--anim-duration, 200ms) var(--a-ease-spring, ease-out);
}
.a-trans-otp-char-enter-from {
  transform: scale(0.4);
}
.a-trans-otp-char-enter-to {
  transform: scale(1);
}
.a-trans-otp-char-leave-active {
  display: none;
}
</style>
