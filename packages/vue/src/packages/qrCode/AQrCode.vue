<template>
  <div
    :class="{
      'a-qr-code': true,
      'a-qr-code--bordered': bordered,
      'a-qr-code--empty': !value,
      'a-qr-code--error': !!errorMessage,
      'a-qr-code--loading': isLoading,
    }"
    :style="wrapperStyle"
    role="img"
    :aria-label="resolvedAriaLabel"
    :aria-busy="isLoading ? 'true' : undefined"
  >
    <div v-if="svg && value && !errorMessage" class="a-qr-code__svg" v-html="svg"></div>
    <div v-else-if="isLoading" class="a-qr-code__loading" aria-hidden="true">
      <span class="a-qr-code__spinner"></span>
    </div>
    <span v-else class="a-qr-code__placeholder">{{ errorMessage || placeholder }}</span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import type { QRCodeToStringOptions } from 'qrcode';
import * as QRCodeServer from 'qrcode';

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
    const isLoading = ref(false);
    let requestId = 0;
    let renderedKey = '';

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

    const buildOptions = (): QRCodeToStringOptions => ({
      type: 'svg',
      width: numericSize.value,
      margin: props.margin,
      errorCorrectionLevel: props.errorCorrectionLevel,
      color: {
        dark: normalizeColor(props.dark),
        light: normalizeColor(props.light),
      },
    });

    const buildRenderKey = () =>
      JSON.stringify([
        props.value,
        numericSize.value,
        props.margin,
        props.errorCorrectionLevel,
        props.dark,
        props.light,
      ]);

    const renderSync = () => {
      if (!props.value) {
        return { svg: '', error: '', key: '' };
      }
      const key = buildRenderKey();
      let nextSvg = '';
      let nextError = '';
      try {
        const qrcode = resolveQrCodeModule(QRCodeServer as QRCodeModuleLike);
        qrcode.toString(props.value, buildOptions(), (err: Error | null | undefined, out: string) => {
          if (err) {
            nextError = err instanceof Error ? err.message : 'Failed to render QR code';
          } else {
            nextSvg = out;
          }
        });
      } catch (error) {
        nextError = error instanceof Error ? error.message : 'Failed to render QR code';
      }
      return { svg: nextSvg, error: nextError, key: nextSvg || nextError ? key : '' };
    };

    const initial = renderSync();
    svg.value = initial.svg;
    errorMessage.value = initial.error;
    isLoading.value = Boolean(props.value) && !initial.svg && !initial.error;
    renderedKey = initial.key;

    const render = async () => {
      const key = buildRenderKey();
      const current = ++requestId;
      if (!props.value) {
        svg.value = '';
        errorMessage.value = '';
        isLoading.value = false;
        renderedKey = '';
        return;
      }
      if (renderedKey === key) {
        isLoading.value = false;
        return;
      }
      // mark loading until the svg lands; cleared on success or error
      isLoading.value = true;
      errorMessage.value = '';

      try {
        const qrcode = resolveQrCodeModule(QRCodeServer as QRCodeModuleLike);
        const nextSvg = await qrcode.toString(props.value, buildOptions());
        if (current === requestId) {
          svg.value = nextSvg;
          isLoading.value = false;
          renderedKey = key;
        }
      } catch (error) {
        if (current !== requestId) {
          return;
        }
        const message = error instanceof Error ? error.message : 'Failed to render QR code';
        errorMessage.value = message;
        isLoading.value = false;
        renderedKey = key;
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
      render();
    });

    return {
      svg,
      errorMessage,
      isLoading,
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

  &--loading {
    // keep the bordered surface stable while the QR is being generated so the
    // layout doesn't shift when the svg lands
    background: var(--bg-semi-light, var(--bg-bright));
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__spinner {
    display: inline-block;
    width: 28%;
    height: 28%;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, currentColor 22%, transparent);
    border-top-color: currentColor;
    animation: a-qr-code-spin 0.7s linear infinite;
  }
}

@keyframes a-qr-code-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
