<script lang="ts">
  import type { QrCodeErrorCorrectionLevel } from '../types';
  import * as QRCodeServer from 'qrcode';

  let {
    value = '',
    size = 160,
    margin = 2,
    errorCorrectionLevel = 'M' as QrCodeErrorCorrectionLevel,
    dark = '#202426',
    light = '#ffffff',
    bordered = true,
    placeholder = 'No QR code',
    ariaLabel = '',
    class: className = '',
    onError,
  } = $props();

  const formattedSize = $derived(
    typeof size === 'number' ? size + 'px' : /^\d+$/.test(String(size)) ? String(size) + 'px' : size,
  );
  const numericSize = $derived(
    typeof size === 'number' ? size : typeof size === 'string' && /^\d+$/.test(size) ? Number(size) : undefined,
  );
  const resolvedAriaLabel = $derived(ariaLabel || (value ? 'QR code for ' + value : placeholder));

  const normalizeColor = (color: string) => {
    if (!color.startsWith('#')) {
      return color;
    }
    if (color.length === 4) {
      const [, r, g, b] = color;
      return '#' + r + r + g + g + b + b + 'ff';
    }
    if (color.length === 7) {
      return color + 'ff';
    }
    return color;
  };

  const resolveModule = (qrcodeModule: any) =>
    'toString' in qrcodeModule ? qrcodeModule : qrcodeModule.default;

  const buildOptions = () => ({
    type: 'svg' as const,
    width: numericSize,
    margin,
    errorCorrectionLevel,
    color: {
      dark: normalizeColor(dark),
      light: normalizeColor(light),
    },
  });

  const buildRenderKey = () =>
    JSON.stringify([value, numericSize, margin, errorCorrectionLevel, dark, light]);

  const renderSync = () => {
    if (!value) return { svg: '', error: '', key: '', loading: false };
    const key = buildRenderKey();
    let nextSvg = '';
    let nextError = '';
    try {
      resolveModule(QRCodeServer).toString(value, buildOptions(), (err: Error | null | undefined, out: string) => {
        if (err) {
          nextError = err instanceof Error ? err.message : 'Failed to render QR code';
        } else {
          nextSvg = out;
        }
      });
    } catch (error) {
      nextError = error instanceof Error ? error.message : 'Failed to render QR code';
    }
    return { svg: nextSvg, error: nextError, key: nextSvg || nextError ? key : '', loading: !nextSvg && !nextError };
  };

  const initial = renderSync();
  let svg = $state(initial.svg);
  let errorMessage = $state(initial.error);
  let isLoading = $state(initial.loading);
  let requestId = 0;
  let renderedKey = initial.key;

  $effect(() => {
    const key = buildRenderKey();
    const current = ++requestId;
    if (!value) {
      svg = '';
      errorMessage = '';
      isLoading = false;
      renderedKey = '';
      return;
    }
    if (renderedKey === key) {
      isLoading = false;
      return;
    }
    isLoading = true;
    errorMessage = '';

    let cancelled = false;

    Promise.resolve(resolveModule(QRCodeServer).toString(value, buildOptions()))
      .then((nextSvg) => {
        if (!cancelled && current === requestId) {
          svg = nextSvg;
          isLoading = false;
          renderedKey = key;
        }
      })
      .catch((error) => {
        if (cancelled || current !== requestId) {
          return;
        }
        errorMessage = error instanceof Error ? error.message : 'Failed to render QR code';
        isLoading = false;
        renderedKey = key;
        onError?.(error);
      });

    return () => {
      cancelled = true;
    };
  });
</script>

<div
  class="a-qr-code {bordered ? 'a-qr-code--bordered' : ''} {!value ? 'a-qr-code--empty' : ''} {errorMessage ? 'a-qr-code--error' : ''} {isLoading ? 'a-qr-code--loading' : ''} {className}"
  style:width={formattedSize}
  style:height={formattedSize}
  role="img"
  aria-label={resolvedAriaLabel}
  aria-busy={isLoading || undefined}
>
  {#if svg && value && !errorMessage}
    <div class="a-qr-code__svg">{@html svg}</div>
  {:else if isLoading}
    <div class="a-qr-code__loading" aria-hidden="true">
      <span class="a-qr-code__spinner"></span>
    </div>
  {:else}
    <span class="a-qr-code__placeholder">{errorMessage || placeholder}</span>
  {/if}
</div>
