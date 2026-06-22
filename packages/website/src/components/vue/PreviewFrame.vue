<template>
  <div class="preview-frame">
    <div class="preview-frame__render">
      <component :is="comp" v-if="comp" />
      <div v-else class="preview-frame__fallback">
        <span>Preview unavailable for this example.</span>
      </div>
    </div>
    <div class="preview-frame__toolbar">
      <button type="button" class="preview-frame__toggle" @click="showCode = !showCode">
        {{ showCode ? 'Hide code' : 'Show code' }}
      </button>
    </div>
    <pre v-if="showCode" class="preview-frame__code"><code>{{ code }}</code></pre>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef } from 'vue';

import registry from '../../.anyui-previews/registry';

const props = defineProps({
  previewKey: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: '',
  },
});

const comp = shallowRef<any>(null);

const importer = (registry as Record<string, () => Promise<any>>)[props.previewKey];

if (importer) {
  // defineAsyncComponent gives us an error boundary + lazy load; the actual
  // chunk only loads when this island hydrates (client:visible) AND the async
  // component resolves.
  comp.value = defineAsyncComponent({
    loader: importer,
    errorComponent: {
      template: '<div class="preview-frame__fallback"><span>Preview unavailable for this example.</span></div>',
    },
  });
}
</script>