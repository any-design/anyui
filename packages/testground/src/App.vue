<template>
  <div class="tg">
    <div class="tg__backdrop">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <aside class="tg-sidebar">
      <div class="tg-sidebar__brand">
        <img class="logo" src="/logo.svg" alt="AnyUI" />
        <span class="version">v{{ version }}</span>
      </div>
      <div class="tg-sidebar__search">
        <input v-model="keyword" type="text" placeholder="Search components..." />
      </div>
      <nav class="tg-sidebar__nav">
        <div
          v-for="entry in filteredEntries"
          :key="entry.id"
          :class="{
            'tg-sidebar__item': true,
            'tg-sidebar__item--active': entry.id === selectedId,
          }"
          @click="select(entry.id)"
        >
          <span>{{ entry.title }}</span>
          <span class="badges">
            <span v-if="entry.vue" class="dot dot--vue"></span>
            <span v-if="entry.react" class="dot dot--react"></span>
            <span v-if="entry.svelte" class="dot dot--svelte"></span>
          </span>
        </div>
      </nav>
      <div class="tg-sidebar__footer">
        <span>Any Design</span>
        <a href="https://github.com/any-design/anyui" target="_blank" aria-label="GitHub">
          <Icon icon="mdi:github" />
        </a>
      </div>
    </aside>

    <main class="tg-main">
      <header class="tg-topbar">
        <span class="tg-topbar__title">{{ selected?.title ?? 'Welcome' }}</span>
        <div class="tg-topbar__group">
          <span
            v-for="framework in FRAMEWORKS"
            :key="framework"
            :class="['tg-chip', `tg-chip--${framework}`, { 'tg-chip--on': enabled[framework] }]"
            @click="toggleFramework(framework)"
          >
            <span class="dot"></span>
            {{ FRAMEWORK_LABELS[framework] }}
          </span>
        </div>
        <div class="tg-topbar__group">
          <span :class="['tg-chip', { 'tg-chip--on': dark }]" @click="dark = !dark">
            <Icon :icon="dark ? 'ph:moon-bold' : 'ph:sun-bold'" />
            {{ dark ? 'Dark' : 'Light' }}
          </span>
          <span :class="['tg-chip', { 'tg-chip--on': glass }]" @click="glass = !glass">
            <Icon icon="ph:drop-bold" />
            Glass
          </span>
        </div>
      </header>

      <div class="tg-content">
        <div v-if="selected" :key="selected.id" class="tg-content__grid">
          <section
            v-for="framework in activeFrameworks"
            :key="`${selected.id}-${framework}`"
            class="tg-panel"
          >
            <div class="tg-panel__header">
              <span :class="['dot', `dot--${framework}`]"></span>
              <span>{{ FRAMEWORK_LABELS[framework] }}</span>
            </div>
            <div class="tg-panel__body">
              <template v-if="selected[framework]">
                <component
                  :is="vueDemoFor(selected)"
                  v-if="framework === 'vue'"
                />
                <ReactIsland v-else-if="framework === 'react'" :loader="selected.react!" />
                <SvelteIsland v-else :loader="selected.svelte!" />
              </template>
              <div v-else class="tg-panel__missing">
                No {{ FRAMEWORK_LABELS[framework] }} demo for this component yet — add
                <code>src/demos/{{ framework }}/{{ selected.id }}</code> to register one.
              </div>
            </div>
          </section>
        </div>
        <div v-else class="tg-content__empty">
          <span>Pick a component from the sidebar to preview it in all frameworks.</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from 'vue';

import { version } from '../../../package.json';

import ReactIsland from './islands/ReactIsland.vue';import SvelteIsland from './islands/SvelteIsland.vue';
import { FRAMEWORKS, registry, type DemoEntry, type Framework } from './registry';

const FRAMEWORK_LABELS: Record<Framework, string> = {
  vue: 'Vue',
  react: 'React',
  svelte: 'Svelte',
};

const PREFS_KEY = 'anyui-testground-prefs';

const keyword = ref('');
const selectedId = ref('');
const dark = ref(false);
const glass = ref(false);
const enabled = reactive<Record<Framework, boolean>>({
  vue: true,
  react: true,
  svelte: true,
});

const filteredEntries = computed(() => {
  const search = keyword.value.trim().toLowerCase();
  if (!search) return registry;
  return registry.filter((entry) => entry.id.toLowerCase().includes(search));
});

const selected = computed<DemoEntry | undefined>(() =>
  registry.find((entry) => entry.id === selectedId.value),
);

const activeFrameworks = computed(() => FRAMEWORKS.filter((framework) => enabled[framework]));

const vueDemoCache = new Map<string, ReturnType<typeof defineAsyncComponent>>();

const vueDemoFor = (entry: DemoEntry) => {
  if (!vueDemoCache.has(entry.id)) {
    vueDemoCache.set(entry.id, defineAsyncComponent(entry.vue!));
  }
  return vueDemoCache.get(entry.id);
};

const select = (id: string) => {
  selectedId.value = id;
  window.location.hash = `#${id}`;
};

const toggleFramework = (framework: Framework) => {
  // keep at least one framework visible
  const active = activeFrameworks.value;
  if (enabled[framework] && active.length === 1) return;
  enabled[framework] = !enabled[framework];
};

const persistPrefs = () => {
  localStorage.setItem(
    PREFS_KEY,
    JSON.stringify({ dark: dark.value, glass: glass.value, enabled: { ...enabled } }),
  );
};

const restorePrefs = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}');
    if (typeof saved.dark === 'boolean') dark.value = saved.dark;
    if (typeof saved.glass === 'boolean') glass.value = saved.glass;
    FRAMEWORKS.forEach((framework) => {
      if (typeof saved.enabled?.[framework] === 'boolean') {
        enabled[framework] = saved.enabled[framework];
      }
    });
    if (!FRAMEWORKS.some((framework) => enabled[framework])) {
      enabled.vue = true;
    }
  } catch {
    // corrupted prefs — fall back to defaults
  }
};

watch(dark, (value) => {
  document.documentElement.setAttribute('theme', value ? 'dark' : 'light');
  persistPrefs();
});

watch(glass, (value) => {
  if (value) {
    document.documentElement.setAttribute('data-anyui-style', 'glass');
  } else {
    document.documentElement.removeAttribute('data-anyui-style');
  }
  persistPrefs();
});

watch(enabled, persistPrefs);

onMounted(() => {
  restorePrefs();
  document.documentElement.setAttribute('theme', dark.value ? 'dark' : 'light');
  if (glass.value) {
    document.documentElement.setAttribute('data-anyui-style', 'glass');
  }

  const applyHash = () => {
    const id = window.location.hash.replace(/^#/, '');
    if (id && registry.some((entry) => entry.id === id)) {
      selectedId.value = id;
    } else if (registry.length) {
      selectedId.value = registry[0].id;
    }
  };
  applyHash();
  window.addEventListener('hashchange', applyHash);
});
</script>
