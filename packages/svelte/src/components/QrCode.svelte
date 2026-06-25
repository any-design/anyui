<script lang="ts">
  import type { QrCodeErrorCorrectionLevel } from '../types';

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

  let svg = $state('');
  let errorMessage = $state('');
  let requestId = 0;

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

  $effect(() => {
    const current = ++requestId;
    svg = '';
    errorMessage = '';

    if (!value) {
      return;
    }

    let cancelled = false;

    import('qrcode')
      .then((qrcodeModule) =>
        resolveModule(qrcodeModule).toString(value, {
          type: 'svg',
          width: numericSize,
          margin,
          errorCorrectionLevel,
          color: {
            dark: normalizeColor(dark),
            light: normalizeColor(light),
          },
        }),
      )
      .then((nextSvg) => {
        if (!cancelled && current === requestId) {
          svg = nextSvg;
        }
      })
      .catch((error) => {
        if (cancelled || current !== requestId) {
          return;
        }
        errorMessage = error instanceof Error ? error.message : 'Failed to render QR code';
        onError?.(error);
      });

    return () => {
      cancelled = true;
    };
  });
</script>

<div
  class="a-qr-code {bordered ? 'a-qr-code--bordered' : ''} {!value ? 'a-qr-code--empty' : ''} {errorMessage ? 'a-qr-code--error' : ''} {className}"
  style:width={formattedSize}
  style:height={formattedSize}
  role="img"
  aria-label={resolvedAriaLabel}
>
  {#if svg && value && !errorMessage}
    <div class="a-qr-code__svg">{@html svg}</div>
  {:else}
    <span class="a-qr-code__placeholder">{errorMessage || placeholder}</span>
  {/if}
</div>
