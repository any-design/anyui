<template>
  <a-radio-button-group
    round
    size="small"
    :items="items"
    :model-value="current"
    @update:model-value="handleChange"
  />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { onMounted, ref } from 'vue';

type Lang = 'en' | 'zh';

const props = defineProps({
  modelValue: {
    type: String as PropType<Lang>,
    default: 'en',
  },
});

const emit = defineEmits(['update:modelValue']);

const items = [
  { label: 'EN', value: 'en' },
  { label: '中文', value: 'zh' },
];

// The SSR render always starts from the default ('en'); sync the persisted
// language from localStorage on mount so the pill reflects the user's choice
// without a flash once hydrated.
const current = ref<Lang>(props.modelValue);

onMounted(() => {
  try {
    const prefs = JSON.parse(localStorage.getItem('anyui-site-prefs') || '{}');
    if (prefs.lang === 'zh' || prefs.lang === 'en') {
      current.value = prefs.lang;
      emit('update:modelValue', prefs.lang);
    }
  } catch {
    // ignore
  }
});

const handleChange = (value: string | number | undefined) => {
  const lang = (value === 'zh' ? 'zh' : 'en') as Lang;
  current.value = lang;
  try {
    const prefs = JSON.parse(localStorage.getItem('anyui-site-prefs') || '{}');
    prefs.lang = lang;
    localStorage.setItem('anyui-site-prefs', JSON.stringify(prefs));
  } catch {
    // ignore
  }
  // LocalizedDoc listens for this event to swap the visible markdown pane.
  window.dispatchEvent(new CustomEvent('anyui:lang-change', { detail: lang }));
  emit('update:modelValue', lang);
};
</script>
