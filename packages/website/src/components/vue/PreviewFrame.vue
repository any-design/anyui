<template>
  <div class="preview-frame">
    <div class="preview-frame__render">
      <component :is="comp" v-if="comp" />
      <div v-else class="preview-frame__fallback">
        <span>{{ t(currentLang, 'preview.unavailable') }}</span>
      </div>
    </div>
    <div class="preview-frame__toolbar">
      <a-button
        class="preview-frame__toggle"
        size="small"
        round
        :icon="showCode ? 'ph:caret-up-bold' : 'ph:code-bold'"
        @click="showCode = !showCode"
      >
        {{ t(currentLang, showCode ? 'preview.hideCode' : 'preview.showCode') }}
      </a-button>
    </div>
    <a-collapse class="preview-frame__code-collapse" :visible="showCode" always-render :render-wait-time="0">
      <div class="preview-frame__code-shell">
        <div v-if="codeHtml" class="preview-frame__code" v-html="codeHtml"></div>
        <pre v-else class="preview-frame__code preview-frame__code--plain"><code>{{ code }}</code></pre>
      </div>
    </a-collapse>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, h, ref, shallowRef } from 'vue';

import registry from '../../.anyui-previews/registry';
import { t } from '../../i18n/lang';
import { useSiteLang } from './useSiteLang';

const props = defineProps({
  previewKey: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: '',
  },
  codeHtml: {
    type: String,
    default: '',
  },
});

const comp = shallowRef<any>(null);
const showCode = ref(false);
const { currentLang } = useSiteLang();

const PreviewError = {
  name: 'PreviewError',
  setup() {
    const { currentLang: errorLang } = useSiteLang();
    return () =>
      h('div', { class: 'preview-frame__fallback' }, [
        h('span', t(errorLang.value, 'preview.unavailable')),
      ]);
  },
};

const importer = (registry as Record<string, () => Promise<any>>)[props.previewKey];

if (importer) {
  // defineAsyncComponent gives us an error boundary + lazy load; the actual
  // chunk only loads when this island hydrates (client:visible) AND the async
  // component resolves.
  comp.value = defineAsyncComponent({
    loader: importer,
    errorComponent: PreviewError,
  });
}
</script>
