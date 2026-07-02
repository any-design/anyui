<template>
  <div class="preview-frame">
    <div class="preview-frame__render" :class="{ 'preview-frame__render--stack': previewItems.length > 1 }">
      <template v-if="previewItems.length">
        <div v-for="item in previewItems" :key="item.key" class="preview-frame__demo">
          <component :is="item.component" v-if="item.component" />
          <div v-else class="preview-frame__fallback">
            <span>{{ t(currentLang, 'preview.unavailable') }}</span>
          </div>
        </div>
      </template>
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
import { defineAsyncComponent, h, ref, shallowRef, type PropType } from 'vue';

import registry from '../../.anyui-previews/registry';
import { t } from '../../i18n/lang';
import { useSiteLang } from './useSiteLang';

const props = defineProps({
  previewKey: {
    type: String,
    default: '',
  },
  previewKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
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

const previewItems = shallowRef<{ key: string; component: any }[]>([]);
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

const keys = props.previewKeys.length > 0 ? props.previewKeys : props.previewKey ? [props.previewKey] : [];

previewItems.value = keys.map((key) => {
  const importer = (registry as Record<string, () => Promise<any>>)[key];
  return {
    key,
    component: importer
      ? defineAsyncComponent({
          loader: importer,
          errorComponent: PreviewError,
        })
      : null,
  };
});
</script>
