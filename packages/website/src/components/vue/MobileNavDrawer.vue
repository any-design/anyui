<template>
  <dialog
    ref="dialog"
    class="site-menu-dialog"
    :aria-label="title"
    @click="dismissBackdrop"
    @close="restoreFocus"
  >
    <div class="site-menu-dialog__header">
      <strong>{{ title }}</strong>
      <button
        type="button"
        class="site-menu-dialog__close"
        :aria-label="currentLang === 'zh' ? '关闭菜单' : 'Close menu'"
        @click="close"
      >
        ×
      </button>
    </div>
    <nav class="site-menu-dialog__links" :aria-label="title">
      <NavLinks
        :groups="groups"
        :initial-path="
          menuKind === 'components'
            ? `/components/${menuActive === 'overview' ? '' : menuActive}`
            : `/docs/${menuActive}`
        "
        @navigate="close"
      />
    </nav>
  </dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import NavLinks from './NavLinks.vue';
import { useSiteLang } from './useSiteLang';
const props = defineProps<{
  menuGroups?: {
    label: string | { en: string; zh?: string };
    items: { label: string | { en: string; zh?: string }; value: string; href?: string }[];
  }[];
  menuActive?: string;
  menuTitle?: string;
  menuKind?: 'docs' | 'components';
}>();
const dialog = ref<HTMLDialogElement>();
const { currentLang } = useSiteLang();
const title = computed(
  () =>
    props.menuTitle ||
    (props.menuKind === 'components'
      ? currentLang.value === 'zh'
        ? '组件'
        : 'Components'
      : currentLang.value === 'zh'
        ? '文档'
        : 'Docs'),
);
const groups = computed(() =>
  (props.menuGroups || []).map((group) => ({
    label: group.label,
    items: group.items
      .filter((item) => item.href)
      .map((item) => ({ label: item.label, href: item.href! })),
  })),
);
let trigger: HTMLElement | null = null;
const restoreFocus = () => {
  document.documentElement.classList.remove('site-menu-open');
  if (trigger?.isConnected) trigger.focus({ preventScroll: true });
};
const open = () => {
  trigger = document.activeElement as HTMLElement;
  dialog.value?.showModal();
  document.documentElement.classList.add('site-menu-open');
};
const close = () => {
  dialog.value?.close();
  document.documentElement.classList.remove('site-menu-open');
};
const dismissBackdrop = (event: MouseEvent) => {
  if (event.target === dialog.value) close();
};
const resize = () => {
  if (window.innerWidth > 840) close();
};
onMounted(() => {
  window.addEventListener('anyui:open-mobile-nav', open);
  window.addEventListener('resize', resize);
  document.addEventListener('astro:before-preparation', close);
});
onBeforeUnmount(() => {
  close();
  window.removeEventListener('anyui:open-mobile-nav', open);
  window.removeEventListener('resize', resize);
  document.removeEventListener('astro:before-preparation', close);
});
</script>
