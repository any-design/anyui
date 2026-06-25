<template>
  <div
    :class="{
      'a-qr-code': true,
      'a-qr-code--bordered': bordered,
      'a-qr-code--empty': !value,
      'a-qr-code--error': !!errorMessage,
    }"
    :style="wrapperStyle"
    role="img"
    :aria-label="resolvedAriaLabel"
  >
    <div v-if="svg && value && !errorMessage" class="a-qr-code__svg" v-html="svg"></div>
    <span v-else class="a-qr-code__placeholder">{{ errorMessage || placeholder }}</span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import type { QRCodeToStringOptions } from 'qrcode';

import { formatStyleSize } from '../../utils';

import type { AQrCodeErrorCorrectionLevel } from './types';

type QRCodeModule = typeof import('qrcode');
type QRCodeModuleLike = QRCodeModule & { default?: QRCodeModule };

const normalizeColor = (value: string) => {
  if (!value.startsWith('#')) {
    return value;
  }
  if (value.length === 4) {
    const [, r, g, b] = value;
    return `#${r}${r}${g}${g}${b}${b}ff`;
  }
  if (value.length === 7) {
    return `${value}ff`;
  }
  return value;
};

const resolveQrCodeModule = (qrcodeModule: QRCodeModuleLike): QRCodeModule =>
  qrcodeModule.default ?? qrcodeModule;

export default defineComponent({
  name: 'AQrCode',
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: 160,
    },
    margin: {
      type: Number,
      default: 2,
    },
    errorCorrectionLevel: {
      type: String as PropType<AQrCodeErrorCorrectionLevel>,
      default: 'M',
    },
    dark: {
      type: String,
      default: '#202426',
    },
    light: {
      type: String,
      default: '#ffffff',
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'No QR code',
    },
    ariaLabel: {
      type: String,
      default: '',
    },
  },
  emits: ['error'],
  setup(props, { emit }) {
    const svg = ref('');
    const errorMessage = ref('');
    const mounted = ref(false);
    let requestId = 0;

    const numericSize = computed(() => {
      if (typeof props.size === 'number') {
        return props.size;
      }
      return /^\d+$/.test(props.size) ? Number(props.size) : undefined;
    });

    const wrapperStyle = computed(() => ({
      width: formatStyleSize(props.size),
      height: formatStyleSize(props.size),
    }));

    const resolvedAriaLabel = computed(
      () => props.ariaLabel || (props.value ? `QR code for ${props.value}` : props.placeholder),
    );

    const render = async () => {
      const current = ++requestId;
      svg.value = '';
      errorMessage.value = '';

      if (!mounted.value || !props.value) {
        return;
      }

      try {
        const qrcode = resolveQrCodeModule((await import('qrcode')) as QRCodeModuleLike);
        const options: QRCodeToStringOptions = {
          type: 'svg',
          width: numericSize.value,
          margin: props.margin,
          errorCorrectionLevel: props.errorCorrectionLevel,
          color: {
            dark: normalizeColor(props.dark),
            light: normalizeColor(props.light),
          },
        };
        const nextSvg = await qrcode.toString(props.value, options);
        if (current === requestId) {
          svg.value = nextSvg;
        }
      } catch (error) {
        if (current !== requestId) {
          return;
        }
        const message = error instanceof Error ? error.message : 'Failed to render QR code';
        errorMessage.value = message;
        emit('error', error);
      }
    };

    watch(
      () => [
        props.value,
        props.size,
        props.margin,
        props.errorCorrectionLevel,
        props.dark,
        props.light,
      ],
      render,
    );

    onMounted(() => {
      mounted.value = true;
      render();
    });

    return {
      svg,
      errorMessage,
      wrapperStyle,
      resolvedAriaLabel,
    };
  },
});
</script>

<style lang="scss">
.a-qr-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--a-radius, 14px);
  background: var(--bg-bright);
  color: var(--text-secondary);
  user-select: none;

  &--bordered {
    border: 1px solid var(--border-light, var(--border));
    box-shadow: var(--a-shadow-xs, 0 1px 3px var(--shadow-4));
  }

  &__svg {
    width: 100%;
    height: 100%;
    line-height: 0;
  }

  &__svg svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__placeholder {
    max-width: 100%;
    padding: 12px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    color: var(--text-secondary);
  }

  &--error {
    color: var(--danger);
  }
}
</style>
