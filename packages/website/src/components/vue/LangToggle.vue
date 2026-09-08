<template>
  <div class="language-toggle" role="group" aria-label="Language / 语言">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :lang="item.value === 'zh' ? 'zh-CN' : 'en'"
      :aria-pressed="currentLang === item.value"
      @click="setLang(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSiteLang } from './useSiteLang';
import type { Lang } from '../../i18n/lang';
defineProps<{ modelValue?: Lang }>();
const emit = defineEmits<{ 'update:modelValue': [value: Lang] }>();
const { currentLang } = useSiteLang();
const items = [
  { label: 'EN', value: 'en' as const },
  { label: '中文', value: 'zh' as const },
];
const setLang = (lang: Lang) => {
  currentLang.value = lang;
  try {
    const prefs = JSON.parse(localStorage.getItem('anyui-site-prefs') || '{}') || {};
    localStorage.setItem('anyui-site-prefs', JSON.stringify({ ...prefs, lang }));
  } catch {}
  window.dispatchEvent(new CustomEvent('anyui:lang-change', { detail: lang }));
  emit('update:modelValue', lang);
};
</script>
